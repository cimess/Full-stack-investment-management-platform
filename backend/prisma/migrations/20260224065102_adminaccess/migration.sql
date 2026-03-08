/*
  Warnings:

  - Added the required column `super_admin_access` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "super_admin_access" TEXT NOT NULL;
