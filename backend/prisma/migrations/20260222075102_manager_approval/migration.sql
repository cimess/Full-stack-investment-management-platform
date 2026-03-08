-- DropForeignKey
ALTER TABLE "Approved_Manager" DROP CONSTRAINT "Approved_Manager_manager_id_fkey";

-- AlterTable
ALTER TABLE "Approved_Manager" ALTER COLUMN "manager_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Approved_Manager" ADD CONSTRAINT "Approved_Manager_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;
