/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Org` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Org` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `orgId` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Org` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_id` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_orgId_fkey";

-- AlterTable
ALTER TABLE "Org" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "createdAt",
DROP COLUMN "orgId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "org_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
