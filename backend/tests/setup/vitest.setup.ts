import { vi, beforeAll } from 'vitest';

// Mock the yahoo-finance2 library globally for Vitest
vi.mock('yahoo-finance2', () => {
  return {
    default: class {
      quote = vi.fn().mockImplementation(async (symbols: string[]) => {
        if (!symbols || symbols.length === 0) {
          throw new Error('No symbols provided');
        }
        return symbols.map(symbol => ({
          symbol,
          shortName: `${symbol} Company`,
          regularMarketPrice: 150.00,
          regularMarketChange: 2.5,
          regularMarketChangePercent: 1.2,
          marketCap: 2000000000,
          regularMarketVolume: 1000000,
          averageAnalystRating: 'Buy',
          dividendYield: 0.015,
          fiftyTwoWeekLow: 130,
          fiftyTwoWeekHigh: 180,
          currency: 'USD',
          exchange: 'NMS'
        }));
      });

      search = vi.fn().mockImplementation(async (query: string) => {
        return {
          quotes: [
            { symbol: 'AAPL', shortName: 'Apple Inc.', quoteType: 'EQUITY' }
          ],
          news: []
        };
      });
    }
  };
});
