/**
 * Formats large numbers into human-readable strings (e.g., 3.8T, 45.2M)
 */
export const formatCompactNumber = (number: number | undefined): string => {
  if (number === undefined || number === null) return "N/A";

  return new Intl.NumberFormat('en-US', {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 2
  }).format(number);
};

/**
 * Formats numbers into standard currency (e.g., $262.52)
 */
export const formatCurrency = (number: number | undefined, currency = "USD",log?:string): string => {

  if (number === undefined || number === null) return "N/A";


// ✅ Fix — dynamic decimal places
  const digits = number < 0.01 ? 6 : number < 1 ? 4 : 2;
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(number);
};


/**
 * Formats numbers into percentages with a + or - sign (e.g., +0.45%)
 */
export const formatPercent = (number: number | undefined): string => {
  if (number === undefined || number === null) return "N/A";

  const formatted = (number).toFixed(2) + "%";
  return number > 0 ? `+${formatted}` : formatted;
};

/**
 * Master formatter to clean up a raw Yahoo Quote object
 */
export const simplifyQuote = (quote: any) => {
  // Yahoo Finance can return varying property names; we map the most common ones.
  const marketState = quote.marketState||"REGULAR"; // "REGULAR" | "PRE" | "POST" | "CLOSED"
  const price =quote.price??(
    marketState === "PRE" ? (quote.preMarketPrice ?? quote.regularMarketPrice) :
      marketState === "POST" ? (quote.postMarketPrice ?? quote.regularMarketPrice) :
        quote.regularMarketPrice);
  const changePercent = quote.regularMarketChangePercent || quote.postMarketChangePercent || 0;
  const company = quote.displayName || quote.shortName || quote.longName ||null;
   const isCrypto = quote.quoteType === 'CRYPTOCURRENCY' || quote.symbol?.endsWith('-USD');

  

 
  return {
    symbol: quote.symbol,
    company: company, // Added to match Prisma 'company' field
    name: company,    // Kept for backward compatibility
    price: price,
    changePercent: changePercent,
    marketCap: quote.marketCap,
    volume: quote.regularMarketVolume || quote.averageDailyVolume3Month || 0,
    peRatio: quote.trailingPE || quote.forwardPE || quote.peRatio,
    dividendYield: quote.trailingAnnualDividendYield || quote.dividendYield,
    fiftyTwoWeekLow: quote.fiftyTwoWeekLow,
    fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh,
    ytdReturn: quote.ytdReturn,
    currency: quote.currency || "USD",
    exchange: quote.exchange || quote.fullExchangeName,
    lastUpdated: quote.regularMarketTime ? new Date(quote.regularMarketTime) : new Date(),
    // Add to simplifyQuote return:
    assetType: quote.quoteType,
    change: quote.regularMarketChange,           // absolute $ change
    open: quote.regularMarketOpen,
    previousClose: quote.regularMarketPreviousClose,
    dayLow: quote.regularMarketDayLow,
    dayHigh: quote.regularMarketDayHigh,
    bid: quote.bid,
    ask: quote.ask,
    bidSize: quote.bidSize || null,
    askSize: quote.askSize || null,
    beta: quote.beta,
    eps: quote.epsTrailingTwelveMonths,
    fiftyTwoWeekChangePercent: quote.fiftyTwoWeekChangePercent || null,
    // Display
    displayChange: `${formatCurrency(quote.regularMarketChange)} (${formatPercent(changePercent)})`,
    displayDayRange: `${formatCurrency(quote.regularMarketDayLow)} - ${formatCurrency(quote.regularMarketDayHigh)}`,
    display52wRange: `${formatCurrency(quote.fiftyTwoWeekLow)} - ${formatCurrency(quote.fiftyTwoWeekHigh)}`,

    // UI Display Fields
    displayPrice: formatCurrency(price, quote.currency),
    displayMarketCap: formatCompactNumber(quote.marketCap),
    displayVolume: formatCompactNumber(quote.regularMarketVolume || quote.averageDailyVolume3Month),
    isUp: changePercent > 0,

    // for cyptor
     type: isCrypto ? 'CRYPTO' : 'STOCK',
    isCrypto,
    
    // ✅ NEW: Unified mapping (CEO becomes Rank for Crypto)
    industry: isCrypto ? 'Blockchain' : (quote.industry || 'N/A'),
    sector: isCrypto ? 'Digital Asset' : (quote.sector || 'N/A'),
    ceo: isCrypto ? `Rank #${quote.marketCapRank || 'N/A'}` : (quote.officerName || quote.ceo || 'N/A'),
    // Supply fields (mostly for crypto)
    circulatingSupply: quote.circulatingSupply || null,
    maxSupply: quote.maxSupply || null,
    marketCapRank: quote.marketCapRank || null,
  };
};


`{
  language: 'en-US',
  region: 'US',
  quoteType: 'ETF',
  typeDisp: 'ETF',
  quoteSourceName: 'Nasdaq Real Time Price',
  triggerable: true,
  customPriceAlertConfidence: 'HIGH',
  currency: 'USD',
  regularMarketChangePercent: -3.00704,
  regularMarketPrice: 7.58,
  exchange: 'NGM',
  messageBoardId: 'finmb_1847925930',
  exchangeTimezoneName: 'America/New_York',
  exchangeTimezoneShortName: 'EDT',
  gmtOffSetMilliseconds: -14400000,
  market: 'us_market',
  esgPopulated: false,
  fiftyDayAverage: 7.0915,
  fiftyDayAverageChange: 0.48850012,
  fiftyDayAverageChangePercent: 0.068885304,
  twoHundredDayAverage: 9.162775,
  twoHundredDayAverageChange: -1.5827751,
  twoHundredDayAverageChangePercent: -0.17273971,
  netExpenseRatio: 1.35,
  sourceInterval: 15,
  exchangeDataDelayedBy: 0,
  ipoExpectedDate: 2023-08-22T00:00:00.000Z,
  tradeable: false,
  cryptoTradeable: false,
  marketState: 'PRE',
  hasPrePostMarketData: true,
  firstTradeDateMilliseconds: 2023-08-22T13:30:00.000Z,
  priceHint: 2,
  preMarketChange: -0.01999998,
  preMarketChangePercent: -0.263852,
  preMarketPrice: 7.56,
  regularMarketChange: -0.235,
  regularMarketDayHigh: 7.6424,
  regularMarketDayRange: { low: 7.3203, high: 7.6424 },
  regularMarketDayLow: 7.3203,
  regularMarketVolume: 97152829,
  regularMarketPreviousClose: 7.815,
  bid: 7.36,
  ask: 7.39,
  bidSize: 89,
  askSize: 1,
  fullExchangeName: 'NasdaqGM',
  regularMarketOpen: 7.43,
  averageDailyVolume3Month: 67503369,
  averageDailyVolume10Day: 97172230,
  fiftyTwoWeekLowChange: 1.46,
  fiftyTwoWeekLowChangePercent: 0.2385621,
  fiftyTwoWeekRange: { low: 6.12, high: 51.615 },
  fiftyTwoWeekHighChange: -44.035004,
  fiftyTwoWeekHighChangePercent: -0.8531435,
  fiftyTwoWeekLow: 6.12,
  fiftyTwoWeekHigh: 51.615,
  fiftyTwoWeekChangePercent: -73.215546,
  trailingAnnualDividendRate: 0,
  trailingAnnualDividendYield: 0,
  dividendYield: 0,
  ytdReturn: 5.17483,
  trailingThreeMonthReturns: -16.99779,
  trailingThreeMonthNavReturns: -16.99779,
  netAssets: 89366208,
  corporateActions: [],
  preMarketTime: 2026-03-24T10:06:32.000Z,
  regularMarketTime: 2026-03-23T20:00:00.000Z,
  shortName: 'GraniteShares 2x Short NVDA Dai',
  longName: 'Graniteshares 2x Short NVDA Daily ETF',
  symbol: 'NVD'
}`
