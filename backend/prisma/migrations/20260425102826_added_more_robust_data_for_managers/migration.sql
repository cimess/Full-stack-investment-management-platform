-- AlterTable
ALTER TABLE "StockTable" ADD COLUMN     "currentRatio" DECIMAL(10,4),
ADD COLUMN     "debtToEquity" DECIMAL(10,4),
ADD COLUMN     "enterpriseValue" BIGINT,
ADD COLUMN     "forwardPE" DECIMAL(10,4),
ADD COLUMN     "grossMargin" DECIMAL(10,4),
ADD COLUMN     "operatingMargin" DECIMAL(10,4),
ADD COLUMN     "priceToBook" DECIMAL(10,4),
ADD COLUMN     "priceToSales" DECIMAL(10,4),
ADD COLUMN     "profitMargin" DECIMAL(10,4),
ADD COLUMN     "returnOnEquity" DECIMAL(10,4);
