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
export const formatCurrency = (number: number | undefined, currency = "USD"): string => {
  if (number === undefined || number === null) return "N/A";

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(number);
};

/**
 * Formats numbers into percentages with a + or - sign (e.g., +0.45%)
 */
export const formatPercent = (number: number | undefined): string => {
  if (number === undefined || number === null) return "0.00%";

  const formatted = (number).toFixed(2) + "%";
  return number > 0 ? `+${formatted}` : formatted;
};

/**
 * Master formatter to clean up a raw Yahoo Quote object
 */
export const simplifyQuote = (quote: any) => {
  // Yahoo Finance can return varying property names; we map the most common ones.
  const price = quote.regularMarketPrice || quote.postMarketPrice || quote.preMarketPrice;
  const changePercent = quote.regularMarketChangePercent || quote.postMarketChangePercent || 0;
  const company = quote.displayName || quote.shortName || quote.longName || "Unknown Company";

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
    currency: quote.currency || "USD",
    exchange: quote.exchange || quote.fullExchangeName,
    lastUpdated: quote.regularMarketTime ? new Date(quote.regularMarketTime) : new Date(),

    // UI Display Fields
    displayPrice: formatCurrency(price, quote.currency),
    displayChange: formatPercent(changePercent),
    displayMarketCap: formatCompactNumber(quote.marketCap),
    displayVolume: formatCompactNumber(quote.regularMarketVolume || quote.averageDailyVolume3Month),
    isUp: changePercent > 0,
  };
};
