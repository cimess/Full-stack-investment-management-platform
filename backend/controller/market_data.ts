import type { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import logger from "../winstonlog/logger.js";
import { getQuotes, searchStock, getStockDetails } from "../services/marketservice.js";
import { prisma } from "../lib/prisma.js";
import type { AuthRequest } from "../middlewear/auth.js"; // Assuming auth is required

export const postStockDetails = async (req: AuthRequest, res: Response, next: NextFunction) => {
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
export const postMarketQuotes = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { symbols } = req.body;
  const userId = req.user?.roles;
  if (userId !== "ADMIN" && userId !== "MANAGER") {
    return next(createError(401, "Unauthorized"));
  }
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
export const getMarketQuotes = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const DEFAULT_SYMBOLS = ['AAPL','TSLA','GOOGL','MSFT','AMZN','META','NVDA','JPM','V','PG'];

  try {
    let stocks = await prisma.stockTable.findMany({
      orderBy: { symbol: 'asc' }
    });

    // If DB is empty, fetch from Yahoo Finance and seed it
    if (stocks.length === 0) {
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
        stocks = await prisma.stockTable.findMany({ orderBy: { symbol: 'asc' } });
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

export const searchStockController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { symbols } = req.body;



    const result = await searchStock(symbols);

    if (!result.success) {
      // If hit API limit, we return 429 Too Many Requests
      return res.status(429).json(result);
    }



    return res.status(200).json(result);

  } catch (err: any) {
    logger.error("Error in searchStock controller:", err);
    return next(err);
  }
};
