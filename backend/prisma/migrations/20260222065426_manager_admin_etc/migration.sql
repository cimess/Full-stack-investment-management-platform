-- DropForeignKey
ALTER TABLE "Manager_approval_code" DROP CONSTRAINT "Manager_approval_code_manager_id_fkey";

-- AddForeignKey
ALTER TABLE "Manager_approval_code" ADD CONSTRAINT "Manager_approval_code_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
