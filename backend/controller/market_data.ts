import type { Request, Response, NextFunction, RequestHandler } from "express";
import createError from "http-errors";
import logger from "../winstonlog/logger.js";
import { getQuotes, searchStock, getStockDetails, getHistoricalData } from "../services/marketservice.js";
import { prisma } from "../lib/prisma.js";
import { getSECFundamentals } from '../services/secservices.js';
import { formatCurrency, formatCompactNumber, formatPercent } from "../lib/formatter.js";
import { trace, context } from "@opentelemetry/api";
import { getCache, setCache } from "../lib/redis.js";
import { Prisma } from "@prisma/client";

export const getFeaturedStocks = async (req: Request, res: Response, next: NextFunction) => {
  const DEFAULT_SYMBOLS = ['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'AMZN', 'META', 'NVDA', 'JPM', 'V', 'PG'];
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(createError(401, "Unauthorized"));
    }
    const stocks = await prisma.stockTable.findMany({
      where: { symbol: { in: DEFAULT_SYMBOLS } },

    });
    if (!stocks) {
      return next(createError(404, "Stocks not found"));
    }
    return res.status(200).json({ success: true, data: stocks });
  } catch (error) {
    logger.error("Error in getFeaturedStocks controller:", error);
    return next(error);
  }
}

export const getWatchlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(createError(401, "Unauthorized"));
    }

    // Adjust Prisma / DB query to match your schema
    const watchlist = await prisma.watchlist.findMany({
      where: { userId: userId },
      select:
    {
      symbol:true,    
    }
    });
  const symbols = watchlist.map(s => s.symbol);
    // 2. Fetch the rich data for those symbols from the StockTable
    const stocks = await prisma.stockTable.findMany({
      where: { symbol: { in: symbols } }
    });
    // 3. Return in consistent format { success: true, data: [...] }
    res.status(200).json({ success: true, data: stocks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching watchlist" });
  }
};

// POST: Add a new stock to the watchlist
export const addToWatchlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;


    if (!userId) {
      return next(createError(401, "Unauthorized"));
    }
    const { symbol, name } = req.body;

    if (!symbol) {
      return next(createError(400, "Symbol is required"));
    }
    await getStockDetails(symbol);

    const newStock = await prisma.watchlist.create({
      data: {
        userId,
        symbol,
        name
      }
    });

    res.status(201).json({ message: "Added to watchlist", stock: newStock });
  } catch (error) {
    // Check if it already exists to prevent duplicates
    logger.error("Error in addToWatchlist controller:", error);

       if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return next(
        createError(409, "Stock already exists in watchlist")
      );
    }
    res.status(400).json({ message: "Failed to add or already exists" });
  }
};

// DELETE: Remove from watchlist
export const removeFromWatchlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { symbol } = req.body;
    if (!userId) {
      return next(createError(401, "Unauthorized"));
    }


   const deletedStock = await prisma.watchlist.deleteMany({
      where: {
        userId: userId,
        symbol: symbol
      }
    });
    if (deletedStock.count===0) {
      return next(createError(404, "Stock not found"));
    }

    res.status(200).json({ success: true, message: "Removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing stock" });
  }
};



/**
 * Get historical data for a stock or crypto.
 * Range can be '1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max'
 */
export const getStockHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { symbol, range } = req.body;

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
    const { symbol } = req.body;
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
  const DEFAULT_SYMBOLS = ['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'AMZN', 'META', 'NVDA', 'JPM', 'V', 'PG'];
  const CACHE_KEY = "global:market:quotes:all";
  const span = trace.getSpan(context.active());

  try {
    const { page, limit } = req.body;
    const skip = (parseInt(page as string) || 1 - 1) * parseInt(limit as string) || 20;

    // 1. Try to fetch from GLOBAL REDIS CACHE (populated by background worker)
    try {
      const cachedData = await getCache(CACHE_KEY);
      if (cachedData) {
        const allStocks = JSON.parse(cachedData);
        if (Array.isArray(allStocks) && allStocks.length > 0) {
          logger.info(`[Market] Serving ${limit} stocks from Global Cache (Page: ${page})`);

          // Slice the pre-computed array for pagination
          const paginatedStocks = allStocks.slice(skip, skip + limit);
          span?.setAttribute('cache.hit', true);
          span?.setAttribute('cache.key', CACHE_KEY);

          return res.status(200).json({
            success: true,
            message: "Data fetched from cache",
            data: paginatedStocks
          });
        }
      }
    } catch (cacheErr) {
      console.log("cache error", span);
      span?.setAttribute('cache.hit', false);
      span?.setAttribute('cache.key', CACHE_KEY);
      logger.warn(`[Market] Cache lookup failed: ${cacheErr}`);
    }

    // 2. FALLBACK: Hit Database if Cache is missing or failed
    logger.info("[Market] Cache miss/empty. Falling back to Database...");
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
      }
    }

    // BigInt cannot be serialized to JSON directly
    const formattedData = stocks.map(stock => {
      const currency = stock.currency || "USD";
      return {
        ...stock,
        marketCap: stock.marketCap ? stock.marketCap.toString() : null,
        price: Number(stock.price),
        // Use our robust formatters!
        displayPrice: formatCurrency(Number(stock.price), currency),
        displayMarketCap: formatCompactNumber(Number(stock.marketCap), currency),
        displayChange: `${formatCurrency(Number(stock.change), currency)} (${formatPercent(Number(stock.changePercent))})`,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully (Database Fallback)",
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
      if (result.message === "Query is required") {
        return res.status(400).json({
          success: false,
          message: result.message,
          data: []
        });
      } else {
        return res.status(429).json({
          success: false,
          message: result.message,
          data: []
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
    const page = parseInt(req.body.page as string) || 1;
    const pageSize = 20;
    const skip = (page - 1) * pageSize;
    const cacheKey = `marketCategories:page:${page}`;
    const span = trace.getSpan(context.active());

    // 1. Try to get cached response
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      logger.info("[Market] Serving categories from Redis cache");
      span?.setAttribute('cache.hit', true);
      span?.setAttribute('cache.key', cacheKey);
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      span?.setAttribute('cache.hit', false);
      span?.setAttribute('cache.key', cacheKey);
      logger.error("[Market] Cache miss/empty. Falling back to Database...");
    }

    logger.error("[Market] Cache miss/empty. Falling back to Database... using real db");
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
    const formatStock = (stock: any) => {
      const currency = stock.currency || "USD";
      return {
        ...stock,
        marketCap: stock.marketCap ? stock.marketCap.toString() : null,
        price: Number(stock.price),
        displayPrice: formatCurrency(Number(stock.price), currency),
        displayMarketCap: formatCompactNumber(Number(stock.marketCap), currency),
        displayChange: `${formatCurrency(Number(stock.change), currency)} (${formatPercent(Number(stock.changePercent))})`,
      };
    };

    const responsePayload = {
      success: true,
      data: {
        gainers: gainers.map(formatStock),
        losers: losers.map(formatStock),
        digital: crypto.map(formatStock),
        equity: equity.map(formatStock),
        mostActive: mostActive.map(formatStock),
        mostActiveCrypto: mostActiveCrypto.map(formatStock),
        cryptoGainers: cryptoGainers.map(formatStock),
        cryptoLosers: cryptoLosers.map(formatStock),
      },
      message: "Data fetched successfully"
    };

    // 2. Cache response payload for 5 minutes (300 seconds)
    await setCache(cacheKey, JSON.stringify(responsePayload), 300);

    return res.status(200).json(responsePayload);

  } catch (err: any) {
    logger.error("Error in getMarketCategories controller:", err);
    return next(err);
  }
};

const getSingleStock = async (symbol: string) => {
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

// getSECFundamentals




export const getFundamentals = async (req: Request, res: Response) => {
  const { symbol } = req.body;


  const REDIS_KEY = `stock:fundamentals:${symbol}`;
  const span = trace.getSpan(context.active());
  if (!symbol) {
    span?.setAttribute('cache.hit', false);
    span?.setAttribute('cache.key', REDIS_KEY);
    return res.status(400).json({ success: false, message: "Symbol is required" });
  }
  try {
    // 1. Check Redis Cache for speed
    const cached = await getCache(REDIS_KEY);
    if (cached) {
      span?.setAttribute('cache.hit', true);
      span?.setAttribute('cache.key', REDIS_KEY);
      return res.status(200).json({ success: true, data: JSON.parse(cached) });
    }
    // 2. Check the Database if not in Redis
    const dbStock = await prisma.stockTable.findFirst({
      where: { OR: [{ symbol: symbol.toUpperCase() }, { company: { equals: symbol, mode: 'insensitive' } }] }
    });
    // If we have it in DB and it's not null, use it!
    if (dbStock && dbStock.revenue && dbStock.sharesOutstanding) {
      logger.info("Using Database directly for fundamentals");
      const dbData = {
        ticker: dbStock.symbol,
        currentRevenue: Number(dbStock.revenue),
        totalCash: Number(dbStock.totalCash),
        totalDebt: Number(dbStock.totalDebt),
        sharesOutstanding: Number(dbStock.sharesOutstanding),
        dataSource: 'Database Cache',
        currentPrice: Number(dbStock.price),
      };
      await setCache(REDIS_KEY, JSON.stringify(dbData), 86400); // Re-cache for 24h
      return res.status(200).json({ success: true, data: dbData });
    }
    let secData;
    if (dbStock?.company || dbStock?.symbol) {
      logger.info("Using Database but the second option for fundamentals");
      secData = await getSECFundamentals(dbStock?.symbol)
    }
    // 3. Not in DB? Fetch from SEC API permanently!
    if (!secData) {
      logger.info("Using SEC API for fundamentals");
      secData = await getSECFundamentals(symbol);
    }


    let stock: any = await prisma.stockTable.findUnique({
      where: { symbol: symbol.toUpperCase() }
    })
    if (!stock || stock.price === 0 || !stock.price) {
      // 2. Get LIVE PRICE from your existing service
      const quote = await getQuotes([symbol]);
      stock = quote.data?.[0];
    }
    const combinedData = {
      ...secData,
      currentPrice: Number(stock?.price) || null, // Add the live price here!
    };
    // 4. SAVE TO DATABASE!
    if (secData) {
      await prisma.stockTable.upsert({
        where: { symbol: symbol.toUpperCase() },
        update: {
          revenue: BigInt(Math.floor(secData.currentRevenue)),
          totalCash: BigInt(Math.floor(secData.totalCash)),
          totalDebt: BigInt(Math.floor(secData.totalDebt)),
          sharesOutstanding: BigInt(Math.floor(secData.sharesOutstanding)),
          ...(Number(stock?.price) && { price: Number(stock?.price) })
        },
        create: {
          symbol: symbol.toUpperCase(),
          company: stock?.company || symbol.toUpperCase(),
          revenue: BigInt(Math.floor(secData.currentRevenue)),
          totalCash: BigInt(Math.floor(secData.totalCash)),
          totalDebt: BigInt(Math.floor(secData.totalDebt)),
          sharesOutstanding: BigInt(Math.floor(secData.sharesOutstanding)),
          price: Number(stock?.price) || 0
        }
      });
    }
    // 5. Cache the new data
    await setCache(REDIS_KEY, JSON.stringify(combinedData), 86400);
    return res.status(200).json({ success: true, data: combinedData });
  } catch (error: any) {
    // If the stock isn't known to the SEC (like Crypto), handle it safely
    console.error("DCF Error:", error.message);
    // 1. Handle SEC-specific "Not Found" errors
    if (error.message.includes("Ticker not found") || error.message.includes("404")) {
      return res.status(404).json({
        success: false,
        message: "Symbol not found in SEC database"
      });
    }
    // 2. Handle Rate Limiting (SEC is strict)
    if (error.message.includes("429")) {
      return res.status(429).json({
        success: false,
        message: "SEC Rate limit reached. Please wait a few seconds and try again."
      });
    }
    // 3. Fallback for other errors
    return res.status(400).json({
      success: false,
      message: error.message || "An unexpected error occurred while fetching fundamentals."
    });


  }
};

export const getPeers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { symbol } = req.body;
    if (!symbol) return res.status(400).json({ success: false, message: "Symbol is required" });

    const dbStock = await prisma.stockTable.findFirst({
      where: { OR: [{ symbol: symbol.toUpperCase() }, { company: { equals: symbol, mode: 'insensitive' } }] }
    });

    const targetSymbol = dbStock ? dbStock.symbol.toUpperCase() : symbol.toUpperCase();
    const targetStock = await prisma.stockTable.findUnique({ where: { symbol: targetSymbol } });

    if (!targetStock) {
      return res.status(404).json({ success: false, message: "Stock not found in our database." });
    }

    // UPDATED: Let the backend handle the heavy lifting for formatting!
    const formatStock = (stock: any) => {
      const currency = stock.currency || "USD";
      return {
        ...stock,
        marketCap: stock.marketCap ? stock.marketCap.toString() : null,
        price: Number(stock.price),
        peRatio: stock.peRatio ? Number(stock.peRatio) : null,
        dividendYield: stock.dividendYield ? Number(stock.dividendYield) : null,
        changePercent: Number(stock.changePercent),

        // Formatted strings ready for the UI
        displayMarketCap: stock.marketCap ? formatCompactNumber(Number(stock.marketCap), currency) : 'N/A',
        displayPrice: formatCurrency(Number(stock.price), currency),
      };
    };

    // 1. Crypto Logic
    if (targetSymbol.endsWith('-USD') || targetStock.assetType === 'CRYPTOCURRENCY') {
      const peers = await prisma.stockTable.findMany({
        where: {
          symbol: { endsWith: '-USD' },
          NOT: { symbol: targetSymbol },
          marketCap: { not: null }
        },
        orderBy: { marketCap: 'desc' },
        take: 5
      });
      return res.status(200).json({ success: true, data: peers.map(formatStock) });
    }

    // 2. Equity Logic
    if (!targetStock.industry || !targetStock.sector) {
      return res.status(200).json({ success: true, data: [], message: "Sector/Industry data missing for this asset." });
    }

    // PHASE 1: Try strict Industry match (The gold standard)
    let peers = await prisma.stockTable.findMany({
      where: {
        industry: targetStock.industry,
        NOT: { symbol: targetSymbol },
        marketCap: { not: null }
      },
      orderBy: { marketCap: 'desc' },
      take: 10
    });

    // PHASE 2: If Industry is too narrow (< 3 results), try Sector match
    // but ONLY as a secondary list and strictly matching the sector title.
    if (peers.length < 3) {
      const sectorPeers = await prisma.stockTable.findMany({
        where: {
          sector: targetStock.sector,
          industry: { not: targetStock.industry }, // Don't duplicate
          NOT: { symbol: targetSymbol },
          marketCap: { not: null }
        },
        orderBy: { marketCap: 'desc' },
        take: 10 - peers.length
      });
      peers = [...peers, ...sectorPeers];
    }

    // PHASE 3: Strict Validation
    // Prioritize Industry (exact match). We only include Sector matches if 
    // Industry peers are scarce, but Industry is always the gold standard.
    const industryPeers = peers.filter(p => p.industry === targetStock.industry);
    const sectorPeers = peers.filter(p => p.industry !== targetStock.industry && p.sector === targetStock.sector);

    const finalPeers = [...industryPeers, ...sectorPeers].slice(0, 5);

    return res.status(200).json({ success: true, data: finalPeers.map(formatStock) });
  } catch (err: any) {
    logger.error("Error in getPeers:", err);
    return next(err);
  }
};

export const getHistoricalFundamentalsController = async (req: any, res: any, next: any) => {
  try {
    const symbol = req.params.symbol;
    if (!symbol) return res.status(400).json({ success: false, message: "Symbol is required" });

    // Grab the service method
    const marketService = await import('../services/marketservice.js');
    const data = await marketService.getHistoricalFundamentals(symbol);
    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    logger.error("Error in getHistoricalFundamentalsController:", err);
    return next(err);
  }
};


