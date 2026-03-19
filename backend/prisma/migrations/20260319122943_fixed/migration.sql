/*
  Warnings:

  - The values [FAILED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('SUCCESS', 'PENDING', 'REJECTED');
ALTER TABLE "public"."Trade_request" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Trade_request" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "public"."Status_old";
ALTER TABLE "Trade_request" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
