/*
  Warnings:

  - You are about to drop the column `parentId` on the `dictionary` table. All the data in the column will be lost.
  - Changed the type of `employeeType` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EmployeeType" AS ENUM ('Regular', 'PartTime');

-- DropForeignKey
ALTER TABLE "dictionary" DROP CONSTRAINT "dictionary_parentId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "employeeType",
ADD COLUMN     "employeeType" "EmployeeType" NOT NULL;

-- AlterTable
ALTER TABLE "dictionary" DROP COLUMN "parentId",
ADD COLUMN     "catId" TEXT;

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dictionary" ADD CONSTRAINT "dictionary_catId_fkey" FOREIGN KEY ("catId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
