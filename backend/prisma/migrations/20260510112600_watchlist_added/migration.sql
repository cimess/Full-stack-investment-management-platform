-- AlterTable
ALTER TABLE "StockTable" ADD COLUMN     "intrinsicValue" DECIMAL(10,2),
ADD COLUMN     "targetUpside" DECIMAL(8,4),
ADD COLUMN     "wallStTarget" DECIMAL(10,2);
