/*
  Warnings:

  - You are about to alter the column `changePercent` on the `StockTable` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Decimal(8,4)`.
  - You are about to alter the column `dividendYield` on the `StockTable` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Decimal(8,4)`.
  - The `volume` column on the `StockTable` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "StockTable" ADD COLUMN     "ask" DECIMAL(10,2),
ADD COLUMN     "askSize" INTEGER,
ADD COLUMN     "beta" DECIMAL(8,4),
ADD COLUMN     "bid" DECIMAL(10,2),
ADD COLUMN     "bidSize" INTEGER,
ADD COLUMN     "change" DECIMAL(8,2),
ADD COLUMN     "dayHigh" DECIMAL(10,2),
ADD COLUMN     "dayLow" DECIMAL(10,2),
ADD COLUMN     "eps" DECIMAL(10,4),
ADD COLUMN     "fiftyTwoWeekChangePercent" DECIMAL(8,4),
ADD COLUMN     "open" DECIMAL(10,2),
ADD COLUMN     "previousClose" DECIMAL(10,2),
ADD COLUMN     "ytdReturn" DECIMAL(8,4),
ALTER COLUMN "changePercent" SET DATA TYPE DECIMAL(8,4),
ALTER COLUMN "dividendYield" SET DATA TYPE DECIMAL(8,4),
DROP COLUMN "volume",
ADD COLUMN     "volume" BIGINT;
