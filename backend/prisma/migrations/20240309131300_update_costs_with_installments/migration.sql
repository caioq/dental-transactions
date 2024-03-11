/*
  Warnings:

  - Added the required column `end_date` to the `costs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "costs" ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_DATE,
ADD COLUMN     "installments" INTEGER NOT NULL DEFAULT 1;
