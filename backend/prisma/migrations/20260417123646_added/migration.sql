-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('BUG', 'FRAUD', 'SERVICE', 'OTHER');

-- CreateTable
CREATE TABLE "SystemReport" (
    "id" TEXT NOT NULL,
    "reporterId" TEXT NOT NULL,
    "targetId" TEXT,
    "type" "ReportType" NOT NULL DEFAULT 'OTHER',
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SystemReport_reporterId_idx" ON "SystemReport"("reporterId");

-- CreateIndex
CREATE INDEX "SystemReport_status_idx" ON "SystemReport"("status");

-- AddForeignKey
ALTER TABLE "SystemReport" ADD CONSTRAINT "SystemReport_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
