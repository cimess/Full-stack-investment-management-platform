-- AlterTable
ALTER TABLE "StockTable" ADD COLUMN     "changePercent" DECIMAL(8,2),
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "dividendYield" DECIMAL(8,2),
ADD COLUMN     "exchange" TEXT,
ADD COLUMN     "fiftyTwoWeekHigh" DECIMAL(10,2),
ADD COLUMN     "fiftyTwoWeekLow" DECIMAL(10,2),
ADD COLUMN     "lastUpdated" TIMESTAMP(3),
ADD COLUMN     "marketCap" BIGINT,
ADD COLUMN     "peRatio" DECIMAL(10,2),
ADD COLUMN     "volume" BIGINT;
