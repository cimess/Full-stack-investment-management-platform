-- DropForeignKey
ALTER TABLE "Approved_Manager" DROP CONSTRAINT "Approved_Manager_manager_id_fkey";

-- AddForeignKey
ALTER TABLE "Approved_Manager" ADD CONSTRAINT "Approved_Manager_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
