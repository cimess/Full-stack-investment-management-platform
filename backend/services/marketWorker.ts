import { prisma } from "../lib/prisma.js";
import { getQuotes } from "./marketservice.js";
import logger from "../winstonlog/logger.js";

const SYMBOLS = ['AAPL','TSLA','GOOGL','MSFT','AMZN','META','NVDA','JPM','V','PG'];

export const refreshMarketData = async () => {
  try {
    logger.info("Worker: Starting background price refresh...");
    const result = await getQuotes(SYMBOLS);

    if (result.success && Array.isArray(result.data)) {
      await Promise.all(result.data.map(async (stock: any) => {
        return prisma.stockTable.upsert({
          where: { symbol: stock.symbol },
          update: {
            price: stock.price,
            changePercent: stock.changePercent,
            marketCap: stock.marketCap ? BigInt(Math.floor(Number(stock.marketCap))) : null,
            lastUpdated: new Date(),
          },
          create: {
            symbol: stock.symbol,
            company: stock.company,
            price: stock.price,
            changePercent: stock.changePercent,
            marketCap: stock.marketCap ? BigInt(Math.floor(Number(stock.marketCap))) : null,
            lastUpdated: new Date(),
          }
        });
      }));
      logger.info("Worker: Successfully Updated DB.");
    }
  } catch (err) {
    logger.error("Worker Error:", err);
  }
};

export const startMarketWorker = (mins: number) => {
  refreshMarketData(); // Run once immediately on start
  setInterval(refreshMarketData, mins * 60 * 1000);
};
