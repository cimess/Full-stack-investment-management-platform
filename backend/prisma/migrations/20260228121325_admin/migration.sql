-- CreateTable
CREATE TABLE "Approved_Admin" (
    "id" TEXT NOT NULL,
    "approval_code" TEXT NOT NULL,
    "admin_id" TEXT,
    "superAdmin_id" TEXT NOT NULL,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Approved_Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Approved_Admin_approval_code_key" ON "Approved_Admin"("approval_code");

-- CreateIndex
CREATE UNIQUE INDEX "Approved_Admin_admin_id_key" ON "Approved_Admin"("admin_id");

-- AddForeignKey
ALTER TABLE "Approved_Admin" ADD CONSTRAINT "Approved_Admin_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approved_Admin" ADD CONSTRAINT "Approved_Admin_superAdmin_id_fkey" FOREIGN KEY ("superAdmin_id") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
