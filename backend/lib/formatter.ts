import logger from "../winstonlog/logger.js";

/**
 * Formats large numbers into human-readable strings (e.g., 3.8T, 45.2M)
 */
// backend/lib/formatter.ts
export const formatCompactNumber = (number: number | undefined, currency?: string): string => {
  if (number === undefined || number === null) return "N/A";
  
  const options: Intl.NumberFormatOptions = {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1
  };

  const plainValue = new Intl.NumberFormat('en-US', options).format(number);

  if (currency) {
    try {
      const currencyValue = new Intl.NumberFormat('en-US', {
        ...options,
        style: 'currency',
        currency: currency.toUpperCase(),
      }).format(number);

      // Validation: If Intl failed to add a symbol/code, the result will be the same as plainValue
      // In that case, we manually prefix the code.
      // We check if the result contains any part of the original currency code Or a symbol.
      const hasCurrency = /[^\d\s.,KMBT]/.test(currencyValue); 
      
      if (!hasCurrency) {
          return `${currency.toUpperCase()} ${plainValue}`;
      }
      return currencyValue;
    } catch {
      return `${currency.toUpperCase()} ${plainValue}`;
    }
  }

  return plainValue;
};

/**
 * Formats numbers into standard currency (e.g., $262.52)
 */
export const formatCurrency = (number: number | undefined, currency: string = "USD"): string => {
  if (number === undefined || number === null) return "N/A";

  const code = currency.toUpperCase();
  try {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
      currencyDisplay: "narrowSymbol",
    }).format(number);

    // Some browsers return the number alone if the currency is unknown
    if (!formatted.includes(code) && !/[^\d\s.,]/.test(formatted)) {
       return `${code} ${number.toLocaleString()}`;
    }
    return formatted;
  } catch (e) {
    return `${code} ${number.toLocaleString()}`;
  }
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
 * 
 * 
 * Dynamic Risk Calculation
 * Based on Beta (Volatility) and Asset Class
 */
export const calculateRisk = (beta: number | null, isCrypto: boolean): { label: string; color: string } => {
  if (isCrypto) return { label: 'High', color: 'text-rose-400' };
  
  if (!beta || beta === 0) return { label: 'Moderate', color: 'text-amber-400' };

  if (beta < 1.0) return { label: 'Low', color: 'text-emerald-400' };
  if (beta <= 1.5) return { label: 'Moderate', color: 'text-amber-400' };
  
  return { label: 'High', color: 'text-rose-400' };
};


/**
 * Master formatter to clean up a raw Yahoo Quote object
 */
export const simplifyQuote = (quote: any) => {
  console.log(quote.currency)
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
    displayChange: `${formatCurrency(quote.regularMarketChange,quote.currency)} (${formatPercent(changePercent)})`,
    displayDayRange: `${formatCurrency(quote.regularMarketDayLow,quote.currency)} - ${formatCurrency(quote.regularMarketDayHigh,quote.currency)}`,
    display52wRange: `${formatCurrency(quote.fiftyTwoWeekLow,quote.currency)} - ${formatCurrency(quote.fiftyTwoWeekHigh,quote.currency)}`,
    display52wHigh: formatCurrency(quote.fiftyTwoWeekHigh, quote.currency),
    display52wLow: formatCurrency(quote.fiftyTwoWeekLow, quote.currency),
    displayDayHigh: formatCurrency(quote.regularMarketDayHigh, quote.currency),
    displayDayLow: formatCurrency(quote.regularMarketDayLow, quote.currency),
    risk: calculateRisk(quote.beta || null, isCrypto), 

    // UI Display Fields
    displayPrice: formatCurrency(price, quote.currency),
    displayMarketCap: formatCompactNumber(quote.marketCap,quote.currency),
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



  
   ` {
      "symbol": "AAPL",
      "company": "Apple",
      "name": "Apple",
      "price": 287.44,
      "changePercent": -0.0080046,
      "marketCap": 4221733699584,
      "volume": 40410371,
      "peRatio": 34.841213,
      "dividendYield": 0.0036178567,
      "fiftyTwoWeekLow": 193.46,
      "fiftyTwoWeekHigh": 292.13,
      "currency": "USD",
      "exchange": "NMS",
      "lastUpdated": "2026-05-07T20:00:02.000Z",
      "assetType": "EQUITY",
      "change": -0.0230103,
      "open": 289.27,
      "previousClose": 287.463,
      "dayLow": 285.78,
      "dayHigh": 292.13,
      "bid": 287.3,
      "ask": 287.75,
      "bidSize": 3,
      "askSize": 3,
      "eps": 8.25,
      "fiftyTwoWeekChangePercent": 44.784164,
      "displayChange": "-$0.02 (-0.01%)",
      "displayDayRange": "$285.78 - $292.13",
      "display52wRange": "$193.46 - $292.13",
      "display52wHigh": "$292.13",
      "display52wLow": "$193.46",
      "displayDayHigh": "$292.13",
      "displayDayLow": "$285.78",
      "displayPrice": "$287.44",
      "displayMarketCap": "$4.2T",
      "displayVolume": "40.4M",
      "isUp": false,
      "type": "STOCK",
      "isCrypto": false,
      "industry": "N/A",
      "sector": "N/A",
      "ceo": "N/A",
      "circulatingSupply": null,
      "maxSupply": null,
      "marketCapRank": null
    }
    `
