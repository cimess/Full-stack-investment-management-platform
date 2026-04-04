import type { Request, Response, NextFunction ,RequestHandler} from "express";
import createError from "http-errors";
import logger from "../winstonlog/logger.js";
import { getQuotes, searchStock, getStockDetails, getHistoricalData } from "../services/marketservice.js";
import { prisma } from "../lib/prisma.js";
import type { AuthRequest } from "../middlewear/auth.js"; // Assuming auth is required




import { getCache, setCache } from "../lib/redis.js";


/**
 * Get historical data for a stock or crypto.
 * Range can be '1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max'
 */
export const getStockHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { symbol } = req.params;
    const { range } = req.query;

    if (!symbol) {
      return next(createError(400, "Symbol is required"));
    }

    const result = await getHistoricalData(symbol as string, (range as string) || '1mo');

    if (!result.success) {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (err: any) {
    logger.error("Error in getStockHistory controller:", err);
    return next(err);
  }
};

export const postStockDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { symbol } = req.body ;
    if (!symbol) {
      return next(createError(400, "Symbol is required"));
    }

    const result = await getStockDetails(symbol);

    const status = !result.message ? 429 : 500;

    if (!result.success) {
      // If hit API limit, we return 429 Too Many Requests
      return res.status(status).json(result);
    }

    return res.status(200).json(result);
  } catch (err: any) {
    logger.error("Error in postStockDetails controller:", err);
    return next(err);
  }
};

/**
 * Controller to fetch global quotes for one or multiple stock symbols.
 * Expects `symbols` in the query string (e.g., ?symbols=AAPL,TSLA)
 */
export const postMarketQuotes = async (req: Request, res: Response, next: NextFunction) => {
  const { symbols } = req.body;

  try {

    // const symbols =['AAPL','TSLA','GOOGL','MSFT','AMZN','META','NVDA','JPM','V','PG','XOM','BAC','WMT','COST','HD','INTC','CSCO','ORCL','IBM','T','PFE','MRK','ABBV','AVGO','AVGO','AVGO','AVGO','AVGO','AVGO','AVGO','AVGO']
    if (!symbols || (Array.isArray(symbols) && symbols.length === 0)) {
      return next(createError(400, "Symbols are required"));
    }

    // Handle symbols as an array (if sent as JSON) or a string
    let symbolArray: string[] = [];
    if (Array.isArray(symbols)) {
      symbolArray = symbols.map(s => s.toString().trim().toUpperCase());
    }

    const result = await getQuotes(symbolArray);

    logger.info("Result: ", result);

    if (!result.success) {
      // If hit API limit, we return 429 Too Many Requests
      return res.status(429).json(result);
    }
    const quoteData = result.data;

    // Save/Update the fetched quotes in the database
    if (Array.isArray(quoteData)) {
      await Promise.all(
        quoteData.map(async (stock: any) => {
          return prisma.stockTable.upsert({
            where: { symbol: stock.symbol },
            update: {
              company: stock.company,
              price: stock.price,
              changePercent: stock.changePercent,
              marketCap: stock.marketCap ? BigInt(Math.floor(Number(stock.marketCap))) : null,
              volume: stock.volume?.toString(),
              peRatio: stock.peRatio,
              dividendYield: stock.dividendYield,
              fiftyTwoWeekLow: stock.fiftyTwoWeekLow,
              fiftyTwoWeekHigh: stock.fiftyTwoWeekHigh,
              currency: stock.currency,
              exchange: stock.exchange,
              lastUpdated: stock.lastUpdated ? new Date(stock.lastUpdated) : new Date(),
            },
            create: {
              symbol: stock.symbol,
              company: stock.company,
              price: stock.price,
              changePercent: stock.changePercent,
              marketCap: stock.marketCap ? BigInt(Math.floor(Number(stock.marketCap))) : null,
              volume: stock.volume?.toString(),
              peRatio: stock.peRatio,
              dividendYield: stock.dividendYield,
              fiftyTwoWeekLow: stock.fiftyTwoWeekLow,
              fiftyTwoWeekHigh: stock.fiftyTwoWeekHigh,
              currency: stock.currency,
              exchange: stock.exchange,
              lastUpdated: stock.lastUpdated ? new Date(stock.lastUpdated) : new Date(),
            },
          });
        })
      );
    }

    return res.status(200).json(result);

  } catch (err: any) {
    logger.error("Error in getMarketQuotes controller:", err);
    return next(err);
  }
};
export const getMarketQuotes = async (req: Request, res: Response, next: NextFunction) => {
  const DEFAULT_SYMBOLS = ['AAPL','TSLA','GOOGL','MSFT','AMZN','META','NVDA','JPM','V','PG'];

  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    let stocks = await prisma.stockTable.findMany({
      orderBy: { symbol: 'asc' },
      skip,
      take: limit
    });

    // If DB is empty, fetch from Yahoo Finance and seed it
    if (stocks.length === 0 && page === 1) {
      logger.info("[Market] DB is empty, seeding from Yahoo Finance...");
      const result = await getQuotes(DEFAULT_SYMBOLS);

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
        logger.info("[Market] DB seeded successfully.");
        stocks = await prisma.stockTable.findMany({ orderBy: { symbol: 'asc' }, skip, take: limit });
      } else {
        logger.error("[Market] Failed to seed DB from Yahoo Finance (rate limited or error).");
      }
    }

    // BigInt cannot be serialized to JSON directly
    const formattedData = stocks.map(stock => ({
      ...stock,
      marketCap: stock.marketCap ? stock.marketCap.toString() : null,
      price: Number(stock.price)
    }));

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: formattedData
    });

  } catch (err: any) {
    logger.error("Error in getMarketQuotes controller:", err);
    return next(err);
  }
};

export const searchStockController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { symbols } = req.body;
    const result = await searchStock(symbols);

    if (!result.success) {
      // If hit API limit, we return 429 Too Many Requests
      if(result.message==="Query is required"){
         return res.status(400).json({
          success:false,
          message:result.message,
          data:[]
        });
      }else{
        return res.status(429).json({
          success:false,
          message:result.message,
          data:[]
        });
      }
    }



    return res.status(200).json(result);

  } catch (err: any) {
    logger.error("Error in searchStock controller:", err);
    return next(err);
  }
};

export const getMarketCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 20;
    const skip = (page - 1) * pageSize;
    const cacheKey = `marketCategories:page:${page}`;

    // 1. Try to get cached response
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      logger.info("[Market] Serving categories from Redis cache");
      return res.status(200).json(JSON.parse(cachedData));
    }

    // equity
    const equity = await prisma.stockTable.findMany({
      where: { symbol: { not: { endsWith: '-USD' } } },
      orderBy: { marketCap: 'desc' },
      skip,
      take: pageSize
    });
    // 3. Crypto
    const crypto = await prisma.stockTable.findMany({
      where: { symbol: { endsWith: '-USD' } },
      orderBy: { marketCap: 'desc' },
      skip,
      take: pageSize
    });
    // 1. Top Gainers
    const gainers = await prisma.stockTable.findMany({
      where: { changePercent: { gt: 0 } },
      orderBy: { changePercent: 'desc' },
      skip,
      take: pageSize
    });
    const cryptoGainers = await prisma.stockTable.findMany({
      where: { changePercent: { gt: 0 }, symbol: { endsWith: '-USD' } },
      orderBy: { changePercent: 'desc' },

      skip,
      take: pageSize
    });

    // 2. Top Losers
    const losers = await prisma.stockTable.findMany({
      where: { changePercent: { lt: 0 } },
      orderBy: { changePercent: 'asc' },
      skip,
      take: pageSize
    });
    const cryptoLosers = await prisma.stockTable.findMany({
      where: { changePercent: { lt: 0 }, symbol: { endsWith: '-USD' } },
      orderBy: { changePercent: 'asc' },
      skip,
      take: pageSize
    }); 

    // 4. Most Active / Largest Cap (excluding crypto)
    const mostActive = await prisma.stockTable.findMany({
      where: { NOT: { symbol: { endsWith: '-USD' } } },
      orderBy: { marketCap: 'desc' },
      skip,
      take: pageSize
    });
        // 4. Most Active / Largest Cap (Crypto)
    const mostActiveCrypto = await prisma.stockTable.findMany({
      where: { symbol: { endsWith: '-USD' } },
      orderBy: { marketCap: 'desc' },
      skip,
      take: pageSize
    });

    // Helper to format BigInt to string for JSON serialization
    const formatStock = (stock: any) => ({
      ...stock,
      marketCap: stock.marketCap ? stock.marketCap.toString() : null,
      price: Number(stock.price)
    });

    const responsePayload = {
      success: true,
      data: {
        gainers: gainers.map(formatStock),
        losers: losers.map(formatStock),
        digital: crypto.map(formatStock),
        equity:equity.map(formatStock),
        mostActive: mostActive.map(formatStock),
        mostActiveCrypto: mostActiveCrypto.map(formatStock),
        cryptoGainers: cryptoGainers.map(formatStock),
        cryptoLosers: cryptoLosers.map(formatStock),
      }
    };

    // 2. Cache response payload for 5 minutes (300 seconds)
    await setCache(cacheKey, JSON.stringify(responsePayload), 300);

    return res.status(200).json(responsePayload);

  } catch (err: any) {
    logger.error("Error in getMarketCategories controller:", err);
    return next(err);
  }
};

const getSingleStock = async (symbol:string ) => {
  try {
    const stock = await prisma.stockTable.findUnique({
      where: { symbol },
    });

    return logger.info(stock);
  } catch (err: any) {
    logger.error("Error in getSingleStock controller:", err);
    
  }
};
// getSingleStock('GOOGL')