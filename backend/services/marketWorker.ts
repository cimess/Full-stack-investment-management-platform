import { prisma } from "../lib/prisma.js";
import { getQuotes, seedTopSymbols } from "./marketservice.js";
import logger from "../winstonlog/logger.js";

// Helper to split array into chunks
const chunk = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

export const refreshMarketData = async (run: boolean) => {
  try {
    // 1. Initial Seeding if DB is empty
    await seedTopSymbols();

    // 2. Fetch all symbols we are tracking
    const trackedStocks = await prisma.stockTable.findMany({
      select: { symbol: true }
    });

    if (trackedStocks.length === 0) {
      logger.info("Worker: No stocks found in database to refresh.");
      return;
    }

    const allSymbols = trackedStocks.map(s => s.symbol);
    logger.info(`Worker: Refreshing ${allSymbols.length} symbols in batches of 150...`);

    // 3. Chunk into batches of 150 to be extra safe
    const batches = chunk(allSymbols, 150);

    for (const batch of batches) {
      const result = await getQuotes(batch);
      
      if (result.success && Array.isArray(result.data)) {
        await Promise.all(result.data.map(async (stock: any) => {
          return prisma.stockTable.update({
            where: { symbol: stock.symbol },
            data: {
              price: stock.price,
              changePercent: stock.changePercent,
              marketCap: stock.marketCap ? BigInt(Math.floor(Number(stock.marketCap))) : null,
              lastUpdated: new Date(),
            }
          });
        }));
        logger.info(`Worker: Batch of ${batch.length} symbols updated.`);
      }

      // Small delay between batches to be nice to Yahoo
      if (batches.length > 1) {
        await new Promise(res => setTimeout(res, 500));
      }
    }
    
    logger.info("Worker: All background price refreshes completed.");
  } catch (err) {
    logger.error("Worker Error:", err);
  }
};

export const startMarketWorker = (mins: number, run: boolean) => {
  // We don't run immediately on start here because seedTopSymbols might take a while
  // and we don't want to block the main thread. 
  // But since it's an async call, we'll fire it off.
  refreshMarketData(run); 
  setInterval(() => refreshMarketData(run), mins * 60 * 1000);
};
  