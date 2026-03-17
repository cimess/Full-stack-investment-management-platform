/*
  Warnings:

  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Manager" ADD COLUMN     "aum_managed" BIGINT,
ADD COLUMN     "availability" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "contact_email" TEXT,
ADD COLUMN     "linkedin_url" TEXT,
ADD COLUMN     "specialization" TEXT,
ADD COLUMN     "success_rate" INTEGER,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "years_experience" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "googleId" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
