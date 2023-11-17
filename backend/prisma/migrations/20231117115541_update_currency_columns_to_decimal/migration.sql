/*
  Warnings:

  - You are about to drop the column `paid_value` on the `procedures` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "value" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "procedures" DROP COLUMN "paid_value",
ALTER COLUMN "billing" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "invoice" SET DATA TYPE DECIMAL(65,30);
