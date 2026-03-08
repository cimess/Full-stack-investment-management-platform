import YahooFinance from 'yahoo-finance2';
import logger from '../winstonlog/logger.js';
import { simplifyQuote } from '../lib/formatter.js';


export const getQuotes = async (symbols: string | string[]) => {
  const symbolList = Array.isArray(symbols) ? symbols : [symbols];

  try {
    // if (process.env.NODE_ENV !== "production") {
    //   return {
    //     success: true,
    //     message: "Mock data (Dev/Test)",
    //     data: symbolList.map(s => ({
    //       symbol: s,
    //       company: `${s} Corp`,
    //       price: 150.00,
    //       changePercent: 1.5,
    //       currency: 'USD'
    //     }))
    //   };
    // }

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
    logger.error("Failed to fetch market data from Yahoo Finance:", error.message);

    if (error.status === 429) {
      return { success: false, message: "Rate limit reached. Please slow down requests." };
    }

    return { success: false, message: error.message || "Failed to fetch market data" };
  }
};
export const searchStock = async (symbols: string) => {

  try {
    // if (process.env.NODE_ENV !== "production") {
    //   return {
    //     success: true,
    //     message: "Mock data (Dev/Test)",
    //     data: [{ 
    //       symbol: symbols.toUpperCase(), 
    //       company: `${symbols.toUpperCase()} Inc.`, 
    //       price: 150.00,
    //       changePercent: 1.5,
    //       currency: 'USD'
    //     }]
    //   };
    // }

    const yahooFinance = new YahooFinance();
    const searchResults = await yahooFinance.search(symbols);

    // Filter to only include equities and extract their symbols
    const equities = searchResults.quotes
      .filter((q: any) => q.quoteType === 'EQUITY' || q.typeDisp === 'Equity')
      .slice(0, 10); // Limit to top 10 results to avoid rate limits

    if (equities.length === 0) {
      return { success: true, message: "No equities found", data: [] };
    }

    const symbolsToFetch = equities.map((q: any) => q.symbol);
    
    // Fetch full quotes for these symbols to get price, marketCap, etc.
    const fullQuotes = await yahooFinance.quote(symbolsToFetch);
    const results = Array.isArray(fullQuotes) ? fullQuotes : [fullQuotes];

    const formattedData = results.map(quote => simplifyQuote(quote));

    return {
      success: true,
      message: "Data fetched successfully",
      data: formattedData
    };

  } catch (error: any) {
    logger.error("Failed to fetch market data from Yahoo Finance:", error);
      const statusCode = error.message?.includes("Rate limit") ? 429 : 500;

    if (statusCode === 429) {
      return { success: false, message: "Rate limit reached. Please slow down requests." };
    }

    return { success: false, message: error.message || "Failed to fetch market data" };
  }
};

export const getStockDetails = async (symbol: string) => {
  try {
    const yahooFinance = new YahooFinance();
    const [quote, summary] = await Promise.all([
      yahooFinance.quote(symbol),
      yahooFinance.quoteSummary(symbol, { modules: ['assetProfile', 'financialData', 'defaultKeyStatistics'] }).catch(() => null)
    ]);

    if (!quote) {
      return { success: false, message: `No data found for symbol: ${symbol}` };
    }

    const simpleQuote = simplifyQuote(quote);
    const profile = (summary?.assetProfile as any) || {};
    const financial = (summary?.financialData as any) || {};
    
    // Construct the detailed returning object mapping to what DetailsModal expects
    const detailData = {
      symbol: simpleQuote.symbol,
      company: simpleQuote.company,
      price: simpleQuote.price,
      changePercent: simpleQuote.changePercent,
      industry: profile.industry || 'N/A',
      sector: profile.sector || 'N/A',
      hq: profile.city && profile.country ? `${profile.city}, ${profile.country}` : 'N/A',
      ceo: profile.companyOfficers?.find((o: any) => o.title?.toLowerCase().includes('ceo'))?.name || 'N/A',
      about: profile.longBusinessSummary || 'No description available.',
      website: profile.website || 'N/A',
      employees: profile.fullTimeEmployees || 'N/A',
      // Generate a financial summary string simulating the original mock text
      financialSummary: `Current price is $${simpleQuote.price.toFixed(2)}${simpleQuote.changePercent !== undefined ? ` with a 24h change of ${simpleQuote.changePercent.toFixed(2)}%` : ''}. ${financial.totalRevenue ? `Total revenue stands at $${(financial.totalRevenue / 1e9).toFixed(2)}B.` : ''} ${financial.operatingMargins ? `Operating margins are ${(financial.operatingMargins * 100).toFixed(2)}%.` : ''}`
    };

    return {
      success: true,
      message: "Stock details fetched successfully",
      data: detailData
    };

  } catch (error: any) {
    logger.error("Failed to fetch stock details from Yahoo Finance:", error);
    const statusCode = error.message?.includes("Rate limit") ? 429 : 500;

    if (statusCode === 429) {
      return { success: false, message: "Rate limit reached. Please slow down requests." };
    }

    return { success: false, message: error.message || "Failed to fetch stock details" };
  }
};

export default { getQuotes, searchStock, getStockDetails };
