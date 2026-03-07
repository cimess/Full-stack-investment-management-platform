/*
  Warnings:

  - Added the required column `response` to the `Trade_request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trade_request" ADD COLUMN     "response" TEXT NOT NULL;
