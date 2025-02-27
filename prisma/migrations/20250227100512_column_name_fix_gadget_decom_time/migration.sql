/*
  Warnings:

  - You are about to drop the column `decomissionedAt` on the `Gadget` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gadget" DROP COLUMN "decomissionedAt",
ADD COLUMN     "decommissionedAt" TIMESTAMP(3);
