/*
  Warnings:

  - Made the column `manager_id` on table `Approved_Manager` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Approved_Manager" DROP CONSTRAINT "Approved_Manager_manager_id_fkey";

-- AlterTable
ALTER TABLE "Approved_Manager" ALTER COLUMN "manager_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Approved_Manager" ADD CONSTRAINT "Approved_Manager_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
