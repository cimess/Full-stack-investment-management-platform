/*
  Warnings:

  - You are about to drop the `Manager_approval_code` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Manager_approval_code" DROP CONSTRAINT "Manager_approval_code_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "Manager_approval_code" DROP CONSTRAINT "Manager_approval_code_manager_id_fkey";

-- DropTable
DROP TABLE "Manager_approval_code";

-- CreateTable
CREATE TABLE "Approved_Manager" (
    "id" TEXT NOT NULL,
    "approval_code" TEXT NOT NULL,
    "manager_id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "manager_slot" INTEGER NOT NULL DEFAULT 0,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Approved_Manager_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Approved_Manager_approval_code_key" ON "Approved_Manager"("approval_code");

-- CreateIndex
CREATE UNIQUE INDEX "Approved_Manager_manager_id_key" ON "Approved_Manager"("manager_id");

-- AddForeignKey
ALTER TABLE "Approved_Manager" ADD CONSTRAINT "Approved_Manager_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approved_Manager" ADD CONSTRAINT "Approved_Manager_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
