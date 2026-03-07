import type { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import logger from "../winstonlog/logger.js";
import { getQuotes,searchStock } from "../services/marketservice.js";
import { prisma } from "../lib/prisma.js";
import type { AuthRequest } from "../middlewear/auth.js"; // Assuming auth is required

/**
 * Controller to fetch global quotes for one or multiple stock symbols.
 * Expects `symbols` in the query string (e.g., ?symbols=AAPL,TSLA)
 */
export const getMarketQuotes = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { symbols } = req.body;

    // Handle symbols as an array (if sent as JSON) or a string
    let symbolArray: string[] = [];
    if (Array.isArray(symbols)) {
       symbolArray = symbols.map(s => s.toString().trim().toUpperCase());
    } else if (typeof symbols === 'string') {
       symbolArray = symbols.split(',').map(s => s.trim().toUpperCase());
    }

    const result = await getQuotes(symbolArray);

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
