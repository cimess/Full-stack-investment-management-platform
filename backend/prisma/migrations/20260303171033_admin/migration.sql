/*
  Warnings:

  - You are about to drop the column `manager_id` on the `Approved_Manager` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Approved_Manager` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Approved_Manager` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Approved_Manager" DROP CONSTRAINT "Approved_Manager_manager_id_fkey";

-- DropIndex
DROP INDEX "Approved_Manager_manager_id_key";

-- AlterTable
ALTER TABLE "Approved_Manager" DROP COLUMN "manager_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Approved_Manager_user_id_key" ON "Approved_Manager"("user_id");

-- AddForeignKey
ALTER TABLE "Approved_Manager" ADD CONSTRAINT "Approved_Manager_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
