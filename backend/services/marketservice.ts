import YahooFinance from 'yahoo-finance2';
import logger from '../winstonlog/logger.js';
import { simplifyQuote, formatCompactNumber, formatCurrency } from '../lib/formatter.js';
import { prisma } from '../lib/prisma.js';
import { getCache, setCache } from '../lib/redis.js';
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



const toDecimal = (val: any): number | null => {
  if (val == null) return null;
  const num = parseFloat(val.toString());
  return isNaN(num) ? null : Number(num.toFixed(4));
};

export const mapToPrismaStock = (simplified: any) => {
  // These fields are UPDATED every 10 minutes by the worker
  const data: any = {
    symbol: simplified.symbol,
    company: simplified.company,
    price: toDecimal(simplified.price),
    changePercent: toDecimal(simplified.changePercent),
    marketCap: simplified.marketCap ? BigInt(Math.floor(simplified.marketCap)) : null,
    volume: simplified.volume ? BigInt(Math.floor(simplified.volume)) : null,
    peRatio: toDecimal(simplified.peRatio),
    dividendYield: toDecimal(simplified.dividendYield),
    fiftyTwoWeekLow: toDecimal(simplified.fiftyTwoWeekLow),
    fiftyTwoWeekHigh: toDecimal(simplified.fiftyTwoWeekHigh),
    dayHigh: toDecimal(simplified.dayHigh),
    dayLow: toDecimal(simplified.dayLow),
    open: toDecimal(simplified.open),
    previousClose: toDecimal(simplified.previousClose),
    beta: toDecimal(simplified.beta),
    eps: toDecimal(simplified.eps),
    currency: simplified.currency || 'USD',
    lastUpdated: new Date(),
  };
  // ONLY add profile fields if they exist (Protects DB from being wiped by Worker)
  if (simplified.about) data.about = simplified.about;
  if (simplified.ceo) data.ceo = simplified.ceo;
  if (simplified.industry) data.industry = simplified.industry;
  if (simplified.sector) data.sector = simplified.sector;
  if (simplified.hq) data.hq = simplified.hq;
  if (simplified.website) data.website = simplified.website;
  if (simplified.marketCapRank) data.marketCapRank = simplified.marketCapRank;
  if (simplified.circulatingSupply) data.circulatingSupply = BigInt(Math.floor(simplified.circulatingSupply));
  if (simplified.maxSupply) data.maxSupply = BigInt(Math.floor(simplified.maxSupply));
  return data;
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

      return {
        success: false,
        message: "Failed to fetch market data",
        data: []
      }
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
  'BTC-USD', 'ETH-USD', 'USDT-USD', 'BNB-USD', 'SOL-USD', 'XRP-USD', 'USDC-USD', 'ADA-USD', 'AVAX-USD', 'DOGE-USD',
  'TRX-USD', 'DOT-USD', 'LINK-USD', 'MATIC-USD', 'TON-USD', 'SHIB-USD', 'LTC-USD', 'BCH-USD', 'DAI-USD', 'UNI7083-USD',
  'ATOM-USD', 'XLM-USD', 'OKB-USD', 'LEO-USD', 'ETC-USD', 'XMR-USD', 'FIL-USD', 'ICP-USD', 'LDO-USD', 'APT21259-USD',
  'HBAR-USD', 'CRO-USD', 'VET-USD', 'NEAR-USD', 'QNT-USD', 'MKR-USD', 'OP-USD', 'ARB11841-USD', 'GRT6719-USD', 'AAVE-USD',
  'ALGO-USD', 'STX4847-USD', 'THETA-USD', 'EGLD-USD', 'SAND-USD', 'EOS-USD', 'XTZ-USD', 'MANA-USD', 'FTM-USD', 'IMX10603-USD',
  'RUNE-USD', 'AXS-USD', 'NEO-USD', 'KAVA-USD', 'SNX-USD', 'FLOW-USD', 'GALA-USD', 'CHZ-USD', 'MINA-USD', 'KLAY-USD',
  'ZEC-USD', 'HT-USD', 'CAKE-USD', 'IOTA-USD', 'XDC-USD', 'XEC-USD', 'PAXG-USD', 'TUSD-USD', 'FRAX-USD', 'BTT-USD',
  'CRV-USD', 'COMP5692-USD', '1INCH-USD', 'BAT-USD', 'ENJ-USD', 'TWT-USD', 'LUNC-USD', 'GNO-USD', 'AR-USD', 'DASH-USD',
  'CVX-USD', 'NEXO-USD', 'GMX11857-USD', 'QTUM-USD', 'ZIL-USD', 'HOT2269-USD', 'ROSE-USD', 'CELO-USD', 'ENS-USD', 'YFI-USD',
  'RVN-USD', 'GLM-USD', 'KSM-USD', 'LRC-USD', 'AUDIO-USD', 'SXP-USD', 'KNC-USD', 'JST-USD', 'BAL-USD', 'BAND-USD',
  'WAVES-USD', 'ANT-USD', 'SNT-USD', 'CVC-USD', 'STORJ-USD', 'RLC-USD', 'OCEAN-USD', 'NMR-USD', 'CTXC-USD', 'FET-USD',
  'OXT-USD', 'CGLD-USD', 'REP-USD', 'LOOM-USD', 'POWR-USD', 'MITH-USD', 'DENT-USD', 'DATA-USD', 'FUN-USD', 'MCO-USD',
  'PPT-USD', 'SAN-USD', 'QASH-USD', 'EDO-USD', 'PAY-USD', 'MTL-USD', 'RDN-USD', 'NGC-USD', 'TAAS-USD', 'AST-USD',
  'BCPT-USD', 'MLN-USD', 'TKN-USD', 'SNGLS-USD', 'PLR-USD', 'HMQ-USD', 'BNT-USD', 'TIME-USD', 'DIC-USD', 'MYST-USD',
  'ADT-USD', 'DNT-USD', 'CFI-USD', '1ST-USD', 'TRST-USD', 'RLC-USD', 'GTO-USD', 'WTC-USD', 'SYS-USD', 'NAV-USD'
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

    // Fetch full quotes to get rich data before seeding
    logger.info(`Fetching rich data for ${uniqueSymbols.length} unique symbols before seeding...`);
    const richQuotes = [];
    const chunk = <T>(arr: T[], size: number): T[][] =>
      Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
      );

    for (const batch of chunk(uniqueSymbols, 250)) {
      try {
        const batchResults = await withRetry(() => yahooFinance.quote(batch.map((b: any) => b.symbol)));
        const resultsArray = Array.isArray(batchResults) ? batchResults : [batchResults];
        richQuotes.push(...resultsArray);
      } catch (e) {
        logger.warn(`Failed to fetch rich quote batch, skipping...`);
      }
    }

    const simplifiedQuotes = richQuotes.map(simplifyQuote).map(mapToPrismaStock);

    logger.info(`Upserting ${simplifiedQuotes.length} fully hydrated symbols to DB...`);

    // Batch upsert to DB
    for (const item of simplifiedQuotes) {
      await prisma.stockTable.upsert({
        where: { symbol: String(item.symbol) },
        update: { ...item },
        create: { ...item as any }
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
    if (!query || query.length < 1) {
      return { success: false, message: "Query is required" };
    }

    const searchResults = await withRetry(() => yahooFinance.search(query));


    // Auto-save the top search results to DB so they get tracked by the worker
    if (searchResults.quotes && searchResults.quotes.length > 0) {
      const topResults = searchResults.quotes.slice(0, 3);
      const topSymbols = topResults.map((q: any) => q.symbol).filter(Boolean);
      try {
        const richQuotes = await withRetry(() => yahooFinance.quote(topSymbols));
        logger.info("this is the one we are interested if it fails", richQuotes)
        const resultsArray = Array.isArray(richQuotes) ? richQuotes : [richQuotes];
        const simplifiedQuotes = resultsArray.map(simplifyQuote).map(mapToPrismaStock);

        for (const item of simplifiedQuotes) {
          prisma.stockTable.upsert({
            where: { symbol: String(item.symbol) },
            update: { ...item },
            create: { ...item as any }
          }).catch(err => logger.error("Auto-save search failed:", err));
        }
      } catch (err) {
        logger.warn("Could not fetch rich quotes for search auto-save");
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
  const REDIS_KEY = `stock:details:${symbol}`;
  try {
    const cached = await getCache(REDIS_KEY);
    if (cached) return { success: true, message: "Fetched from Redis", data: JSON.parse(cached) };

    const targetSymbol = symbol.toUpperCase();
    let stock = await prisma.stockTable.findUnique({ where: { symbol: targetSymbol } });

    const isCryptoSym = targetSymbol.endsWith('-USD') || stock?.assetType === 'CRYPTOCURRENCY';
    const haveDetails = isCryptoSym
      ? (stock?.about && stock?.marketCapRank)
      : (stock?.about && stock?.ceo);
    const isStale = stock && stock.updatedAt &&
      (new Date().getTime() - new Date(stock.updatedAt).getTime() > 24 * 60 * 60 * 1000);

    let intelligence: any = null;

    if (!stock || !haveDetails || isStale) {
      logger.info("am getting from yahoo finance", stock)
      const [quote, summary, intel] = await Promise.all([
        withRetry(() => yahooFinance.quote(targetSymbol)),
        withRetry(() => yahooFinance.quoteSummary(targetSymbol, {
          modules: ['assetProfile', 'financialData', 'defaultKeyStatistics']
        })).catch(() => null),
        getStockIntelligence(targetSymbol) // <-- Grabs live News & Ratings!
      ]);

      intelligence = intel;

      if (quote) {
        const simpleQuote = simplifyQuote(quote);
        const profile = (summary?.assetProfile as any) || {};
        const financialData = (summary?.financialData as any) || {};
        const keyStats = (summary?.defaultKeyStatistics as any) || {};

        const updateData = {
          ...mapToPrismaStock(simpleQuote),
          industry: profile.industry || null,
          sector: profile.sector || null,
          hq: profile.city ? `${profile.city}, ${profile.country}` : null,
          ceo: profile.companyOfficers?.[0]?.name || null,
          about: profile.longBusinessSummary || quote.description || null,
          website: profile.website || null,
          marketCapRank: quote.marketCapRank || null,
          circulatingSupply: quote.circulatingSupply ? BigInt(Math.floor(quote.circulatingSupply)) : null,
          maxSupply: quote.maxSupply ? BigInt(Math.floor(quote.maxSupply)) : null,
          startDate: quote.startDate ? new Date(quote.startDate) : null,

          forwardPE: keyStats?.forwardPE ?? null,
          priceToBook: keyStats?.priceToBook ?? null,
          priceToSales: financialData?.revenuePerShare && financialData?.currentPrice
            ? (financialData.currentPrice / financialData.revenuePerShare) : null,
          enterpriseValue: keyStats?.enterpriseValue ?? null,
          ebitda: financialData?.ebitda ?? null,
          grossMargin: financialData?.grossMargins ?? null,
          operatingMargin: financialData?.operatingMargins ?? null,
          profitMargin: financialData?.profitMargins ?? null,
          returnOnEquity: financialData?.returnOnEquity ?? null,
          returnOnAssets: financialData?.returnOnAssets ?? null,
          currentRatio: financialData?.currentRatio ?? null,
          debtToEquity: financialData?.debtToEquity ?? null,
          freeCashflow: financialData?.freeCashflow ?? null,
        };

        stock = await prisma.stockTable.upsert({
          where: { symbol: targetSymbol },
          update: updateData,
          create: { ...updateData as any, symbol: targetSymbol }
        }) as any;
      }
    } else {
      // Data is fresh in DB, but always fetch fresh news/ratings
      intelligence = await getStockIntelligence(targetSymbol);
    }

    if (!stock) throw new Error("Stock not found");

    // Use the formatter to get consistent base fields (type, ceo/rank, industry, etc.)
    const simpleQuote = simplifyQuote(stock);

    const detailData = {
      ...simpleQuote,
      // Metadata & Bio
      about: stock.about || `Information for ${stock.company} is currently being updated.`,
      website: stock.website || 'N/A',
      hq: stock.hq || (simpleQuote.isCrypto ? 'Global' : 'N/A'),

      // Formatted Stats for Frontend
      marketCap: formatCompactNumber(Number(stock.marketCap || 0), stock.currency),
      volume: formatCompactNumber(Number(stock.volume || 0)),
      peRatio: stock.peRatio ? Number(stock.peRatio).toFixed(2) : 'N/A',
      dividendYield: stock.dividendYield ? (Number(stock.dividendYield) * 100).toFixed(2) + '%' : 'N/A',
      fiftyTwoWeekHigh: formatCurrency(Number(stock.fiftyTwoWeekHigh || 0), stock.currency),
      fiftyTwoWeekLow: formatCurrency(Number(stock.fiftyTwoWeekLow || 0), stock.currency),

      // Institutional metrics
      eps: stock.eps ? Number(stock.eps).toFixed(2) : 'N/A',
      beta: stock.beta ? Number(stock.beta).toFixed(2) : 'N/A',
      enterpriseValue: stock.enterpriseValue ? formatCompactNumber(Number(stock.enterpriseValue), stock.currency) : 'N/A',
      ebitda: stock.ebitda ? formatCompactNumber(Number(stock.ebitda), stock.currency) : 'N/A',
      freeCashflow: stock.freeCashflow ? formatCompactNumber(Number(stock.freeCashflow), stock.currency) : 'N/A',
      profitMargin: stock.profitMargin ? (Number(stock.profitMargin) * 100).toFixed(2) + '%' : 'N/A',
      operatingMargin: stock.operatingMargin ? (Number(stock.operatingMargin) * 100).toFixed(2) + '%' : 'N/A',

      circulatingSupply: simpleQuote.isCrypto && stock.circulatingSupply
        ? formatCompactNumber(Number(stock.circulatingSupply))
        : 'N/A',
      maxSupply: simpleQuote.isCrypto && stock.maxSupply
        ? formatCompactNumber(Number(stock.maxSupply))
        : 'N/A',
      startDate: stock.startDate ? new Date(stock.startDate).toLocaleDateString() : 'N/A',

      financialSummary: simpleQuote.isCrypto
        ? `${stock.symbol} is a decentralized asset currently ranked #${stock.marketCapRank || 'N/A'} by market cap.`
        : `Currently trading at ${formatCurrency(Number(stock.price), stock.currency)}, ${stock.company} has a 52-week range of 
        ${formatCurrency(Number(stock.fiftyTwoWeekLow || 0),
          stock.currency)} - ${formatCurrency(Number(stock.fiftyTwoWeekHigh || 0), stock.currency)}.`,
      intelligence
    };

    await setCache(REDIS_KEY, JSON.stringify(detailData), 600);
    return { success: true, data: detailData };
  } catch (error: any) {
    logger.error(`Detail fetch failed for ${symbol}:`, error);
    return { success: false, message: error.message };
  }
}



const getRangeConfig = (range: string) => {
  const now = new Date();
  switch (range) {
    case '1d':
      return { period1: new Date(now.getTime() - 24 * 60 * 60 * 1000), interval: '15m' as any };
    case '1w':
      return { period1: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), interval: '1h' as any };
    case '1mo':
      return { period1: new Date(now.setMonth(now.getMonth() - 1)), interval: '1d' as any };
    case '1y':
      return { period1: new Date(now.setFullYear(now.getFullYear() - 1)), interval: '1d' as any };
    case 'max':
      return { period1: new Date(0), interval: '1mo' as any };
    default:
      return { period1: new Date(now.setMonth(now.getMonth() - 1)), interval: '1d' as any };
  }
};

export const getHistoricalData = async (symbol: string, range: string = '1mo') => {
  try {
    const config = getRangeConfig(range);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const result: any = await withRetry(() => yahooFinance.chart(symbol, config as any, { fetchOptions: { signal: controller.signal } as any }));

      if (!result || !result.quotes) {
        return { success: false, message: `No historical data found for ${symbol}` };
      }

      const formattedData = (result.quotes as any[])
        .filter((q: any) => q.date && q.close)
        .map((q: any) => ({
          time: Math.floor(new Date(q.date).getTime() / 1000),
          value: q.close,
          open: q.open,
          high: q.high,
          low: q.low,
          close: q.close,
        }));

      return {
        success: true,
        data: formattedData
      };
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error: any) {
    logger.error(`Failed to fetch historical data for ${symbol}:`, error);
    // Graceful fallback: return empty data instead of erroring out the whole request
    return {
      success: true,
      data: [],
      message: error.code === 'ETIMEDOUT' ? "Request timed out. Please try again." : error.message
    };
  }
};

// Fetches LIVE News and Analyst Ratings (Caches them in Redis for 2 hours)
export const getStockIntelligence = async (symbol: string) => {
  const cacheKey = `stock:intelligence:${symbol}`;

  try {
    const cached = await getCache(cacheKey);
    if (cached) return JSON.parse(cached);

    // Fetch Live Analyst Ratings & News simultaneously
    const [summary, searchResults] = await Promise.all([
      yahooFinance.quoteSummary(symbol, { modules: ['recommendationTrend'] }).catch(() => null),
      yahooFinance.search(symbol, { newsCount: 5 }).catch(() => null)
    ]);

    const intelligence = {
      analystRatings: summary?.recommendationTrend?.trend?.[0] || null,
      news: searchResults?.news?.map((n: any) => ({
        title: n.title,
        publisher: n.publisher,
        link: n.link,
        publishTime: n.providerPublishTime,
        thumbnail: n.thumbnail?.resolutions?.[0]?.url || null
      })) || []
    };

    // Cache for 2 hours (7200 seconds) to prevent API spam on hot stocks
    await setCache(cacheKey, JSON.stringify(intelligence), 7200);
    return intelligence;

  } catch (err) {
    logger.error(`Intelligence fetch failed for ${symbol}`, err);
    return { analystRatings: null, news: [] };
  }
};


// Fetches 4 years of Annual Revenue & Net Income and persists to DB
export const getHistoricalFundamentals = async (symbol: string) => {
  const cacheKey = `stock:historical_fundamentals:${symbol}`;
  const targetSymbol = symbol.toUpperCase();

  try {
    const cached = await getCache(cacheKey);
    if (cached) return JSON.parse(cached);

    // 1. Check if we already have it in the Database
    const stock = await prisma.stockTable.findUnique({
      where: { symbol: targetSymbol },
      select: { historicalAnalytics: true }
    });

    if (stock?.historicalAnalytics) {
      const data = stock.historicalAnalytics as any;
      await setCache(cacheKey, JSON.stringify(data), 86400); // 24hr Cache
      return data;
    }

    // 2. Not in DB? Fetch from Yahoo Finance
    const summary = await yahooFinance.quoteSummary(targetSymbol, { modules: ['incomeStatementHistory'] });

    if (!summary || !summary.incomeStatementHistory || !summary.incomeStatementHistory.incomeStatementHistory) {
      return [];
    }

    const rawData = summary.incomeStatementHistory.incomeStatementHistory;
    const formattedData = rawData
      .filter((item: any) => item.endDate && item.totalRevenue != null && item.netIncome != null)
      .map((item: any) => ({
        year: new Date(item.endDate).getFullYear().toString(),
        revenue: item.totalRevenue,
        netIncome: item.netIncome
      }))
      .reverse();

    // 3. Save to Database for long-term history tracking
    if (formattedData.length > 0) {
      await prisma.stockTable.update({
        where: { symbol: targetSymbol },
        data: { historicalAnalytics: formattedData }
      }).catch(err => logger.error(`DB Save failed for ${targetSymbol} history:`, err));
    }

    await setCache(cacheKey, JSON.stringify(formattedData), 86400);
    return formattedData;
  } catch (err) {
    logger.error(`Historical Fundamentals fetch failed for ${symbol}`, err);
    return [];
  }
};

export default { getQuotes, searchStock, getStockDetails, seedTopSymbols, getHistoricalData, getHistoricalFundamentals };


