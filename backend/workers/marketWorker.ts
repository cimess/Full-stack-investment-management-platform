import { prisma } from "../lib/prisma.js";
import { getQuotes, seedTopSymbols, mapToPrismaStock } from "../services/marketservice.js";
import logger from "../winstonlog/logger.js";
import pLimit from "p-limit";
import { delCache } from "../lib/redis.js"
// ── Config ───────────────────────────────────────────────────────
const BATCH_SIZE = 150;
const CONCURRENCY = 10;
const PRICE_TOLERANCE = 0.01;

// ── Helpers ─────────────────────────────────────────────────────
const chunk = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

// Normalize floats (kills API jitter)
const toDecimal = (val: any): number | undefined => {
  if (val == null) return undefined;
  const num = parseFloat(val.toString());
  return isNaN(num) ? undefined : Number(num.toFixed(2));
};


// Tolerance comparison
const isClose = (a: number | null, b: number | null, tol = PRICE_TOLERANCE) => {
  if (a == null || b == null) return a !== b;
  return Math.abs(a - b) < tol;
};

// Smart diff (ignores lastUpdated + uses tolerance)
const isDifferent = (existing: any, incoming: any): boolean => {
  if (!existing) return true;

  for (const key of Object.keys(incoming)) {
    if (key === "lastUpdated") continue;

    const oldVal = existing[key];
    const newVal = incoming[key];

    if (typeof newVal === "number") {
      if (!isClose(oldVal, newVal)) return true;
    } else {
      if (oldVal !== newVal) return true;
    }
  }

  return false;
};

// ── Market State ────────────────────────────────────────────────
const getMarketState = (): "REGULAR" | "PRE" | "POST" | "CLOSED" => {
  const now = new Date();
  const day = now.getUTCDay();

  if (day === 0 || day === 6) return "CLOSED";

  // DST: second Sunday of March → first Sunday of November
  const year = now.getUTCFullYear();
  const dstStart = new Date(Date.UTC(year, 2, 8 + ((7 - new Date(Date.UTC(year, 2, 8)).getUTCDay()) % 7)));
  const dstEnd = new Date(Date.UTC(year, 10, 1 + ((7 - new Date(Date.UTC(year, 10, 1)).getUTCDay()) % 7)));
  const isDST = now >= dstStart && now < dstEnd;
  const offset = isDST ? 4 : 5;

  const etHour = now.getUTCHours() - offset;
  const etMin = now.getUTCMinutes();
  const etTime = etHour + etMin / 60;

  if (etTime >= 4 && etTime < 9.5) return "PRE";
  if (etTime >= 9.5 && etTime < 16) return "REGULAR";
  if (etTime >= 16 && etTime < 20) return "POST";
  return "CLOSED";
};
// We use the universal mapToPrismaStock directly.


// ── Core Worker ─────────────────────────────────────────────────
export const refreshMarketData = async () => {
  try {
    const marketState = getMarketState();
    logger.info(`Worker: Market state is [${marketState}]`);

    if (marketState === "CLOSED") {
      logger.info("Worker: Market closed — skipping.");
      return;
    }

    await seedTopSymbols();

    const tracked = await prisma.stockTable.findMany({
      select: { symbol: true }
    });

    if (!tracked.length) {
      logger.info("Worker: No stocks found.");
      return;
    }

    const symbols = tracked.map(s => s.symbol);
    const batches = chunk(symbols, BATCH_SIZE);

    logger.info(`Worker: Processing ${symbols.length} symbols`);

    const limit = pLimit(CONCURRENCY);

    for (const batch of batches) {
      const result = await getQuotes(batch);




      if (!result.success || !Array.isArray(result.data)) {
        logger.warn(`Worker: Skipping batch — invalid API response`);
        continue;
      }


      // 🔥 preload existing (kills N+1 problem)
      const existingStocks = await prisma.stockTable.findMany({
        where: { symbol: { in: batch } }
      });

      const existingMap = new Map(
        existingStocks.map(s => [s.symbol, s])
      );

      for (const stock of result.data) {
        try {
          const fullMapped = mapToPrismaStock(stock);
          const fields: Record<string, any> = { ...fullMapped } as any;

          const existing = existingMap.get(stock.symbol);

          if (!isDifferent(existing, fields)) continue;

          await prisma.stockTable.update({
            where: { symbol: stock.symbol },
            data: fields,
          });
           await delCache(`stock:details:${stock.symbol}`);
          // Prevent Database Hammer by yielding event loop and resting between single row DB locks
          await sleep(20); 
        } catch (err) {
          logger.error(`Update failed for ${stock.symbol}`, err);
        }
      }

      logger.info(`Worker: Batch ${batch.length} done`);

      await sleep(300); // smoother API usage
    }

    logger.info("Worker: Refresh complete.");
  } catch (err) {
    logger.error("Worker Error:", err);
  }
};

// ── Scheduler ───────────────────────────────────────────────────
export const startMarketWorker = () => {
  const INTERVALS = {
    REGULAR: 20,
    PRE: 40,
    POST: 40,
    CLOSED: 60,
  };

  const run = async () => {
    const state = getMarketState();
    const interval = INTERVALS[state];

    await refreshMarketData();

    logger.info(`Next run in ${interval} mins [${state}]`);

    setTimeout(run, interval * 60 * 1000);
  };

  run();
};


`{
    symbol: 'GIS',
    company: 'General Mills',
    name: 'General Mills',
    price: 37.2,
    changePercent: -0.4282651,
    marketCap: 19852941312,
    volume: 435424,
    peRatio: 9.095354,
    dividendYield: 0.06504282,
    fiftyTwoWeekLow: 36.76,
    fiftyTwoWeekHigh: 62.61,
    ytdReturn: undefined,
    currency: 'USD',
    exchange: 'NYQ',
    lastUpdated: 2026-03-24T13:47:51.000Z,
    assetType: 'EQUITY',
    change: -0.15999985,
    open: 37.23,
    previousClose: 37.36,
    dayLow: 36.895,
    dayHigh: 37.36,
    bid: 36.95,
    ask: 36.98,
    beta: undefined,
    eps: 4.09,
    displayChange: '-$0.160000 (-0.43%)',
    displayDayRange: '$36.90 - $37.36',
    display52wRange: '$36.76 - $62.61',
    displayPrice: '$37.20',
    displayMarketCap: '19.85B',
    displayVolume: '435.42K',
    isUp: false
  },
  {
    symbol: 'GMX11857-USD',
    company: 'GMX USD',
    name: 'GMX USD',
    price: 6.3679423,
    changePercent: -0.63467115,
    marketCap: 66045728,
    volume: 4783989,
    peRatio: undefined,
    dividendYield: undefined,
    fiftyTwoWeekLow: 4.878502,
    fiftyTwoWeekHigh: 23.54453,
    ytdReturn: undefined,
    currency: 'USD',
    exchange: 'CCC',
    lastUpdated: 2026-03-24T13:44:00.000Z,
    assetType: 'CRYPTOCURRENCY',
    change: -0.040673733,
    open: 6.375039,
    previousClose: 6.375039,
    dayLow: 6.2775497,
    dayHigh: 6.512124,
    bid: undefined,
    ask: undefined,
    beta: undefined,
    eps: undefined,
    displayChange: '-$0.040674 (-0.63%)',
    displayDayRange: '$6.28 - $6.51',
    display52wRange: '$4.88 - $23.54',
    displayPrice: '$6.37',
    displayMarketCap: '66.05M',
    displayVolume: '4.78M',
    isUp: false
  },
  {
    symbol: 'BKKT',
    company: 'Bakkt',
    name: 'Bakkt',
    price: 8.8699,
    changePercent: 0.11224468,
    marketCap: 271082720,
    volume: 106881,
    peRatio: 9.239479,
    dividendYield: undefined,
    fiftyTwoWeekLow: 6.81,
    fiftyTwoWeekHigh: 49.79,
    ytdReturn: undefined,
    currency: 'USD',
    exchange: 'NYQ',
    lastUpdated: 2026-03-24T13:47:32.000Z,
    assetType: 'EQUITY',
    change: 0.009900093,
    open: 8.6,
    previousClose: 8.86,
    dayLow: 8.594,
    dayHigh: 8.9036,
    bid: 8.63,
    ask: 8.78,
    beta: undefined,
    eps: -6.55,
    displayChange: '$0.009900 (+0.11%)',
    displayDayRange: '$8.59 - $8.90',
    display52wRange: '$6.81 - $49.79',
    displayPrice: '$8.87',
    displayMarketCap: '271.08M',
    displayVolume: '106.88K',
    isUp: true
  },
  {
    symbol: 'MATV',
    company: 'Mativ',
    name: 'Mativ',
    price: 8.53,
    changePercent: -1.387282,
    marketCap: 468031328,
    volume: 10589,
    peRatio: 6.769841,
    dividendYield: 0.046242777,
    fiftyTwoWeekLow: 4.34,
    fiftyTwoWeekHigh: 15.48,
    ytdReturn: undefined,
    currency: 'USD',
    exchange: 'NYQ',
    lastUpdated: 2026-03-24T13:46:06.000Z,
    assetType: 'EQUITY',
    change: -0.119999886,
    open: 8.53,
    previousClose: 8.65,
    dayLow: 8.5,
    dayHigh: 8.57,
    bid: 8.48,
    ask: 8.66,
    beta: undefined,
    eps: -6.19,
    displayChange: '-$0.120000 (-1.39%)',
    displayDayRange: '$8.50 - $8.57',
    display52wRange: '$4.34 - $15.48',
    displayPrice: '$8.53',
    displayMarketCap: '468.03M',
    displayVolume: '10.59K',
    isUp: false
  },
  ... 31 more items
]
2026-03-24 14:47:53 [info]: Worker: Batch 131 done
2026-03-24 14:47:54 [info]: Worker: Refresh complete.
2026-03-24 14:47:54 [info]: Next run in 10 mins [REGULAR]
`