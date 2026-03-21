import YahooFinance from 'yahoo-finance2';
import logger from '../winstonlog/logger.js';
import { simplifyQuote, formatCompactNumber } from '../lib/formatter.js';
import { prisma } from '../lib/prisma.js';

// Initialize a singleton instance with browser-like headers
// This mimics a real user session and prevents the "Failed to get crumb" (429) errors
// that occur when starting a new session (handshake) for every request.
const yahooFinance = new YahooFinance({
  fetchOptions: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Referer': 'https://finance.yahoo.com/'
    }
  }
});

/**
 * Persistence Layer: Sync cookies to/from Database
 * This ensures the Yahoo session (B cookie and Crumb) survives server restarts and redeploys.
 */
async function syncCookiesFromDb() {
  try {
    const config = await prisma.systemConfig.findUnique({ 
      where: { key: 'yahoo-finance-cookies' } 
    });
    if (config?.value) {
      const cookieData = JSON.parse(config.value);
      // Populate the singleton's internal cookie jar safely without breaking the class
      if (cookieData.cookies && Array.isArray(cookieData.cookies)) {
        for (const c of cookieData.cookies) {
          const cookieString = `${c.key}=${c.value}; Domain=${c.domain}; Path=${c.path}`;
          const url = `https://${c.domain.replace(/^\./, '')}/`;
          (yahooFinance as any)._opts.cookieJar.setCookieSync(cookieString, url);
        }
      }
      logger.info('Yahoo Finance session restored from database.');
    }
  } catch (error) {
    logger.warn('Could not restore Yahoo session from DB (will start fresh):', error);
  }
}

async function syncCookiesToDb() {
  try {
    const cookieData = (yahooFinance as any)._opts.cookieJar.serializeSync();
    await prisma.systemConfig.upsert({
      where: { key: 'yahoo-finance-cookies' },
      update: { value: JSON.stringify(cookieData) },
      create: { key: 'yahoo-finance-cookies', value: JSON.stringify(cookieData) }
    });
  } catch (error) {
    logger.error('Failed to persist Yahoo session to database:', error);
  }
}

// Initial load on startup
syncCookiesFromDb();

// Educational Helper: Retries with exponential backoff for specific 429/Crumb errors
async function withRetry<T>(fn: () => Promise<T>, retries = 2, delay = 1500): Promise<T> {
  try {
    const result = await fn();
    // After every successful request, persist the cookies in case Yahoo updated them (like the B cookie)
    syncCookiesToDb();
    return result;
  } catch (error: any) {
    const isCrumbError = error.message?.includes("crumb") || error.status === 429;
    if (isCrumbError && retries > 0) {
      logger.warn(`Yahoo Finance 429/Crumb error. Retrying in ${delay}ms...`);
      await new Promise(res => setTimeout(res, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

// Alpha Vantage API base URL
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

// Fetch from Alpha Vantage for a single stock
const getAlphaVantageQuote = async (symbol: string) => {
  const params = new URLSearchParams({
    function: 'GLOBAL_QUOTE',
    symbol: symbol,
    apikey: process.env.ALPHA_VANTAGE_API_KEY || ''
  });

  try {
    const response = await fetch(`${ALPHA_VANTAGE_BASE_URL}?${params.toString()}`);
    const data = await response.json() as any;

    if (!data['Global Quote'] || !data['Global Quote']['05. price']) {
      throw new Error(`No data found for ${symbol}`);
    }

    const quote = data['Global Quote'];
    return {
      symbol: symbol,
      company: symbol,
      price: parseFloat(quote['05. price']),
      changePercent: parseFloat(quote['10. change percent']?.replace('%', '') || '0'),
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

    // Try Yahoo Finance batch fetch first with retry logic
    try {
      logger.info(`Fetching ${symbolList.length} stocks from Yahoo Finance (batch)...`);
      const batchQuotes = await withRetry(() => yahooFinance.quote(symbolList));
      
      const results = Array.isArray(batchQuotes) ? batchQuotes : [batchQuotes];
      const formattedData = results.map(quote => simplifyQuote(quote));
      
      return {
        success: true,
        message: "Data fetched successfully (Yahoo batch)",
        data: formattedData
      };
    } catch (yahooError: any) {
      logger.warn(`Yahoo Finance batch fetch failed: ${yahooError.message}, falling back to Alpha Vantage...`);
      
      // Fallback to Alpha Vantage with individual Promise.all fetches
      logger.info(`Fetching ${symbolList.length} stocks from Alpha Vantage (individual)...`);
      const alphaVantageQuotes = await Promise.all(
        symbolList.map(symbol => getAlphaVantageQuote(symbol))
      );
      
      return {
        success: true,
        message: "Data fetched successfully (Alpha Vantage fallback)",
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

// 150 Top Crypto Symbols
const TOP_CRYPTO_SYMBOLS = [
  'BTC-USD','ETH-USD','USDT-USD','BNB-USD','SOL-USD','XRP-USD','USDC-USD','ADA-USD','AVAX-USD','DOGE-USD',
  'TRX-USD','DOT-USD','LINK-USD','MATIC-USD','TON-USD','SHIB-USD','LTC-USD','BCH-USD','DAI-USD','UNI7083-USD',
  'ATOM-USD','XLM-USD','OKB-USD','LEO-USD','ETC-USD','XMR-USD','FIL-USD','ICP-USD','LDO-USD','APT21259-USD',
  'HBAR-USD','CRO-USD','VET-USD','NEAR-USD','QNT-USD','MKR-USD','OP-USD','ARB11841-USD','GRT6719-USD','AAVE-USD',
  'ALGO-USD','STX4847-USD','THETA-USD','EGLD-USD','SAND-USD','EOS-USD','XTZ-USD','MANA-USD','FTM-USD','IMX10603-USD',
  'RUNE-USD','AXS-USD','NEO-USD','KAVA-USD','SNX-USD','FLOW-USD','GALA-USD','CHZ-USD','MINA-USD','KLAY-USD',
  'ZEC-USD','HT-USD','CAKE-USD','IOTA-USD','XDC-USD','XEC-USD','PAXG-USD','TUSD-USD','FRAX-USD','BTT-USD',
  'CRV-USD','COMP5692-USD','1INCH-USD','BAT-USD','ENJ-USD','TWT-USD','LUNC-USD','GNO-USD','AR-USD','DASH-USD',
  'CVX-USD','NEXO-USD','GMX11857-USD','QTUM-USD','ZIL-USD','HOT2269-USD','ROSE-USD','CELO-USD','ENS-USD','YFI-USD',
  'RVN-USD','GLM-USD','KSM-USD','LRC-USD','AUDIO-USD','SXP-USD','KNC-USD','JST-USD','BAL-USD','BAND-USD',
  'WAVES-USD','ANT-USD','SNT-USD','CVC-USD','STORJ-USD','RLC-USD','OCEAN-USD','NMR-USD','CTXC-USD','FET-USD',
  'OXT-USD','CGLD-USD','REP-USD','LOOM-USD','POWR-USD','MITH-USD','DENT-USD','DATA-USD','FUN-USD','MCO-USD',
  'PPT-USD','SAN-USD','QASH-USD','EDO-USD','PAY-USD','MTL-USD','RDN-USD','NGC-USD','TAAS-USD','AST-USD',
  'BCPT-USD','MLN-USD','TKN-USD','SNGLS-USD','PLR-USD','HMQ-USD','BNT-USD','TIME-USD','DIC-USD','MYST-USD',
  'ADT-USD','DNT-USD','CFI-USD','1ST-USD','TRST-USD','RLC-USD','GTO-USD','WTC-USD','SYS-USD','NAV-USD'
];

/**
 * Seeds the database with top 150 crypto and 800+ popular symbols
 */
export async function seedTopSymbols() {
  try {
    const existingCount = await prisma.stockTable.count();
    if (existingCount > 50) {
      logger.info(`Seeding skipped: DB already has ${existingCount} stocks tracked.`);
      return;
    }

    logger.info("Seeding top Cryptos and Popular stocks...");

    // 1. Fetch Top Crypto (using our robust hardcoded list)
    logger.info(`Seeding ${TOP_CRYPTO_SYMBOLS.length} hardcoded Crypto symbols...`);
    const cryptoSymbols = TOP_CRYPTO_SYMBOLS.map(symbol => ({
      symbol,
      company: symbol.replace('-USD', ' Cryptocurrency'),
      exchange: 'CRYPTO',
    }));

    // 2. Fetch Popular Stocks (using multiple Screeners to reach ~800+)
    const [actives, gainers, losers, aggressive] = (await Promise.all([
      withRetry(() => yahooFinance.screener({ scrIds: 'most_actives', count: 250 })),
      withRetry(() => yahooFinance.screener({ scrIds: 'day_gainers', count: 250 })),
      withRetry(() => yahooFinance.screener({ scrIds: 'day_losers', count: 250 })),
      withRetry(() => yahooFinance.screener({ scrIds: 'aggressive_small_caps', count: 250 }))
    ])) as any[];

    const stockSymbols = [
      ...(actives.quotes || []), 
      ...(gainers.quotes || []),
      ...(losers.quotes || []),
      ...(aggressive.quotes || [])
    ].map((q: any) => ({
      symbol: q.symbol,
      company: q.shortName || q.longName || q.symbol,
      exchange: q.exchange,
    }));

    const allToSeed = [...cryptoSymbols, ...stockSymbols];
    
    // De-duplicate by symbol
    const uniqueSymbols = Array.from(new Map(allToSeed.map(item => [item.symbol, item])).values());

    logger.info(`Seeding ${uniqueSymbols.length} unique symbols to DB...`);

    // Batch upsert to DB
    for (const item of uniqueSymbols) {
      const assetType = item.exchange === 'CRYPTO' ? 'CRYPTO' : 'STOCK';
      await prisma.stockTable.upsert({
        where: { symbol: item.symbol },
        update: { company: item.company, exchange: item.exchange, assetType },
        create: {
          symbol: item.symbol,
          company: item.company,
          exchange: item.exchange,
          assetType,
          price: 0,
        }
      }).catch(() => null); 
    }

    logger.info("Seeding complete.");
  } catch (error) {
    logger.error("Seeding failed:", error);
  }
}

export const searchStock = async (query: string) => {
  try {
    if (process.env.NODE_ENV === "test") {
      return {
        success: true,
        message: "Mock data (Dev/Test)",
        data: [{ 
          symbol: query.toUpperCase(), 
          company: `${query.toUpperCase()} Inc.`, 
          price: 150.00,
          changePercent: 1.5,
          currency: 'USD'
        }]
      };
    }

    const searchResults = await withRetry(() => yahooFinance.search(query));

    // Auto-save the top search results to DB so they get tracked by the worker
    if (searchResults.quotes && searchResults.quotes.length > 0) {
      const topResults = searchResults.quotes.slice(0, 3);
      for (const q of topResults) {
        const item = q as any;
        if (item.isYahooFinance && item.symbol) {
          const assetType = item.quoteType === 'CRYPTOCURRENCY' ? 'CRYPTO' : 'STOCK';
          prisma.stockTable.upsert({
            where: { symbol: item.symbol },
            update: { 
              company: item.shortname || item.longname || item.symbol,
              exchange: item.exchange,
              assetType
            },
            create: {
              symbol: item.symbol,
              company: item.shortname || item.longname || item.symbol,
              exchange: item.exchange,
              assetType,
              price: 0,
            }
          }).catch(err => logger.error("Auto-save search failed:", err));
        }
      }
    }

    // Filter to only include equities/crypto and extract their symbols
    const validQuotes = searchResults.quotes
      .filter((q: any) => q.isYahooFinance && (q.quoteType === 'EQUITY' || q.quoteType === 'CRYPTOCURRENCY' || q.typeDisp?.toLowerCase().includes('equity') || q.typeDisp?.toLowerCase().includes('cryptocurrency')))
      .slice(0, 10); 

    if (validQuotes.length === 0) {
      return { success: true, message: "No matching instruments found", data: [] };
    }

    const symbolsToFetch = validQuotes.map((q: any) => q.symbol);
    
    // Fetch full quotes for these symbols to get price, marketCap, etc.
    const fullQuotes = await withRetry(() => yahooFinance.quote(symbolsToFetch));
    const results = Array.isArray(fullQuotes) ? fullQuotes : [fullQuotes];

    const formattedData = results.map(quote => simplifyQuote(quote));

    return {
      success: true,
      message: "Data fetched successfully",
      data: formattedData
    };

  } catch (error: any) {
    logger.error("Failed to fetch market data from Yahoo Finance:", error);
    const isRateLimit = error.message?.includes("Rate limit") || error.status === 429;

    if (isRateLimit) {
      return { success: false, message: "Rate limit reached. Please slow down requests." };
    }

    return { success: false, message: error.message || "Failed to fetch market data" };
  }
};

export const getStockDetails = async (symbol: string) => {
  try {
    const [quote, summary] = await Promise.all([
      withRetry(() => yahooFinance.quote(symbol)),
      withRetry(() => yahooFinance.quoteSummary(symbol, { modules: ['assetProfile', 'financialData', 'defaultKeyStatistics'] })).catch(() => null)
    ]);

    if (!quote) {
      return { success: false, message: `No data found for symbol: ${symbol}` };
    }

    const isCrypto = quote.quoteType === 'CRYPTOCURRENCY' || symbol.endsWith('-USD');
    const assetType = isCrypto ? 'CRYPTO' : 'STOCK';

    const simpleQuote = simplifyQuote(quote);
    const profile = (summary?.assetProfile as any) || {};
    const financial = (summary?.financialData as any) || {};
    
    // Construct the detailed returning object based on asset type
    const detailData = {
      symbol: simpleQuote.symbol,
      company: simpleQuote.company,
      price: simpleQuote.price,
      changePercent: simpleQuote.changePercent,
      type: assetType,
      // Context-aware stats
      industry: isCrypto ? 'Blockchain / Decentralized' : (profile.industry || 'N/A'),
      sector: isCrypto ? 'Digital Asset' : (profile.sector || 'N/A'),
      hq: isCrypto ? (simpleQuote.exchange || 'Decentralized Network') : (profile.city && profile.country ? `${profile.city}, ${profile.country}` : 'N/A'),
      ceo: isCrypto ? `Rank #${quote.marketCapRank || 'N/A'}` : (profile.companyOfficers?.find((o: any) => o.title?.toLowerCase().includes('ceo'))?.name || 'N/A'),
      
      about: profile.longBusinessSummary || quote.description || `No detailed description available for ${simpleQuote.company}.`,
      website: profile.website || 'N/A',
      employees: isCrypto ? 'Open Source / Community' : (profile.fullTimeEmployees || 'N/A'),
      
      // Dynamic financial summary
      financialSummary: isCrypto 
        ? `Current price is $${simpleQuote.price.toLocaleString()}${simpleQuote.changePercent !== undefined ? ` with a 24h change of ${simpleQuote.changePercent.toFixed(2)}%` : ''}. ${quote.circulatingSupply ? `Circulating supply: ${formatCompactNumber(quote.circulatingSupply)} coins.` : ''} ${quote.maxSupply ? `Max supply: ${formatCompactNumber(quote.maxSupply)}.` : ''}`
        : `Current price is $${simpleQuote.price.toFixed(2)}${simpleQuote.changePercent !== undefined ? ` with a 24h change of ${simpleQuote.changePercent.toFixed(2)}%` : ''}. ${financial.totalRevenue ? `Total revenue is $${(financial.totalRevenue / 1e9).toFixed(2)}B.` : ''} ${financial.operatingMargins ? `Operating margins: ${(financial.operatingMargins * 100).toFixed(2)}%.` : ''}`
    };

    // Auto-save with assetType
    prisma.stockTable.upsert({
      where: { symbol: detailData.symbol },
      update: { 
        company: detailData.company,
        assetType: assetType,
        exchange: simpleQuote.exchange
      },
      create: {
        symbol: detailData.symbol,
        company: detailData.company,
        price: detailData.price,
        changePercent: detailData.changePercent,
        assetType: assetType,
        exchange: simpleQuote.exchange
      }
    }).catch(err => logger.error("Auto-save on view failed:", err));

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

export default { getQuotes, searchStock, getStockDetails, seedTopSymbols };
