/*
  Warnings:

  - You are about to drop the column `code` on the `Manager_approval_code` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[approval_code]` on the table `Manager_approval_code` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `approval_code` to the `Manager_approval_code` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Manager_approval_code_code_key";

-- AlterTable
ALTER TABLE "Manager_approval_code" DROP COLUMN "code",
ADD COLUMN     "approval_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Manager_approval_code_approval_code_key" ON "Manager_approval_code"("approval_code");
