import YahooFinance from 'yahoo-finance2';
import logger from '../winstonlog/logger.js';
import { simplifyQuote } from '../lib/formatter.js';

// Alpha Vantage API base URL
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

const isRateLimitMessage = (message: string): boolean => {
  return /rate limit|call frequency|too many requests/i.test(message);
};

const alphaVantageProviderMessage = (data: any): string | null => {
  if (typeof data?.Note === 'string') return data.Note;
  if (typeof data?.Information === 'string') return data.Information;
  if (typeof data?.['Error Message'] === 'string') return data['Error Message'];
  return null;
};

// Fetch from Alpha Vantage for a single stock
const getAlphaVantageQuote = async (symbol: string) => {
  if (!process.env.ALPHA_VANTAGE_API_KEY) {
    const missingKeyError: any = new Error('Alpha Vantage API key is not configured');
    missingKeyError.status = 500;
    throw missingKeyError;
  }

  const params = new URLSearchParams({
    function: 'GLOBAL_QUOTE',
    symbol: symbol,
    apikey: process.env.ALPHA_VANTAGE_API_KEY
  });

  try {
    const response = await fetch(`${ALPHA_VANTAGE_BASE_URL}?${params.toString()}`);
    if (!response.ok) {
      const httpError: any = new Error(`Alpha Vantage HTTP ${response.status} for ${symbol}`);
      httpError.status = response.status;
      throw httpError;
    }

    const data = await response.json() as any;
    const providerMessage = alphaVantageProviderMessage(data);

    if (providerMessage) {
      const providerError: any = new Error(providerMessage);
      providerError.status = isRateLimitMessage(providerMessage) ? 429 : 502;
      throw providerError;
    }

    const quote = data?.['Global Quote'];
    const price = Number.parseFloat(quote?.['05. price'] ?? '');

    if (!quote || !Number.isFinite(price)) {
      const noDataError: any = new Error(`No quote data returned for ${symbol}`);
      noDataError.status = 404;
      throw noDataError;
    }

    return {
      symbol: symbol,
      company: symbol,
      price,
      changePercent: Number.parseFloat(quote['10. change percent']?.replace('%', '') || '0'),
      currency: 'USD'
    };
  } catch (error: any) {
    logger.error(`Alpha Vantage fetch failed for ${symbol}: ${error.message}`);
    throw error;
  }
};



export const getQuotes = async (symbols: string | string[]) => {
  const symbolList = Array.isArray(symbols) ? symbols : [symbols];

  try {
    if (process.env.NODE_ENV === "test") {
      return {
        success: true,
        message: "Mock data (Dev/Test)",
        data: symbolList.map(s => ({
          symbol: s,
          company: `${s} Corp`,
          price: 150.00,
          changePercent: 1.5,
          currency: 'USD'
        }))
      };
    }

    // Try Yahoo Finance batch fetch first
    try {
      logger.info(`Fetching ${symbolList.length} stocks from Yahoo Finance (batch)...`);
      const yahooFinance = new YahooFinance();
      const batchQuotes = await yahooFinance.quote(symbolList);
      
      const results = Array.isArray(batchQuotes) ? batchQuotes : [batchQuotes];
      const formattedData = results.map(quote => simplifyQuote(quote));
      
      return {
        success: true,
        message: "Data fetched successfully (Yahoo batch)",
        data: formattedData
      };
    } catch (yahooError: any) {
      logger.warn(`Yahoo Finance batch fetch failed: ${yahooError.message}, falling back to Alpha Vantage...`);
      
      // Fallback to Alpha Vantage with individual requests while preserving partial success.
      logger.info(`Fetching ${symbolList.length} stocks from Alpha Vantage (individual)...`);
      const alphaResults = await Promise.allSettled(
        symbolList.map(symbol => getAlphaVantageQuote(symbol))
      );

      const alphaVantageQuotes = alphaResults
        .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
        .map(result => result.value);

      const failedErrors = alphaResults
        .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
        .map(result => result.reason);

      if (alphaVantageQuotes.length === 0) {
        const hasRateLimit = failedErrors.some((error: any) => error?.status === 429 || isRateLimitMessage(error?.message || ''));
        if (hasRateLimit) {
          return { success: false, message: "Rate limit reached. Please slow down requests." };
        }

        const fallbackMessage = failedErrors[0]?.message || "Failed to fetch market data";
        return { success: false, message: fallbackMessage };
      }
      
      return {
        success: true,
        message: failedErrors.length > 0
          ? "Data fetched partially (Alpha Vantage fallback)"
          : "Data fetched successfully (Alpha Vantage fallback)",
        data: alphaVantageQuotes
      };
    }

  } catch (error: any) {
    logger.error(`Failed to fetch market data: ${error.message}`);

    if (error.status === 429) {
      return { success: false, message: "Rate limit reached. Please slow down requests." };
    }

    return { success: false, message: error.message || "Failed to fetch market data" };
  }
};

export const searchStock = async (symbols: string) => {

  try {
    if (process.env.NODE_ENV === "test") {
      return {
        success: true,
        message: "Mock data (Dev/Test)",
        data: [{ 
          symbol: symbols.toUpperCase(), 
          company: `${symbols.toUpperCase()} Inc.`, 
          price: 150.00,
          changePercent: 1.5,
          currency: 'USD'
        }]
      };
    }

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
