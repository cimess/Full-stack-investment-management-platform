import YahooFinance from 'yahoo-finance2';
import logger from '../winstonlog/logger.js';
import { simplifyQuote } from '../lib/formatter.js';


export const getQuotes = async (symbols: string | string[]) => {
  const symbolList = Array.isArray(symbols) ? symbols : [symbols];

  try {
    const yahooFinance = new YahooFinance();
    const qoutes = await yahooFinance.quote(symbolList);



    // Normalize to always be an array
    const results = Array.isArray(qoutes) ? qoutes : [qoutes];

    const formattedData = results.map(quote => simplifyQuote(quote));

    return {
      success: true,
      message: "Data fetched successfully",
      data: formattedData
    };


  } catch (error: any) {
    logger.error("Failed to fetch market data from Yahoo Finance:", error);

    if (error.status === 429) {
      return { success: false, message: "Rate limit reached. Please slow down requests." };
    }

    return { success: false, message: error.message || "Failed to fetch market data" };
  }
};
export const searchStock = async (symbols: string) => {

  try {
    // Single call to Yahoo Finance for all symbols at once
    const yahooFinance = new YahooFinance();

    const results = await yahooFinance.search(symbols);

    // The 'search' result has 'quotes' and 'news'. We simplify the quotes.
    const simplifiedQuotes = results.quotes.map((quote: any) => simplifyQuote(quote));

    return {
      success: true,
      message: "Data fetched successfully",
      data: {
        ...results
      }
    };

  } catch (error: any) {
    logger.error("Failed to fetch market data from Yahoo Finance:", error);

    if (error.status === 429) {
      return { success: false, message: "Rate limit reached. Please slow down requests." };
    }

    return { success: false, message: error.message || "Failed to fetch market data" };
  }
};

export default { getQuotes, searchStock };
