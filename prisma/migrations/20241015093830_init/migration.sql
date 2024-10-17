/*
  Warnings:

  - You are about to drop the column `country` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `grade` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `gradeId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VochureType" AS ENUM ('MultiUse', 'SingleUse', 'ExpiryDate');

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "country",
DROP COLUMN "grade",
ADD COLUMN     "CountryCode" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gradeId" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "UserRole" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "currency_symbol" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "currencyCode" TEXT NOT NULL,
    "phone_code" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vochure" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "BrandId" TEXT NOT NULL,
    "image" TEXT,
    "typeId" "VochureType" NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vochure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dictionary" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "CountryCode" TEXT,
    "grade" TEXT,
    "parentId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dictionary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_name_key" ON "UserRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_countryCode_key" ON "Country"("countryCode");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_CountryCode_fkey" FOREIGN KEY ("CountryCode") REFERENCES "Country"("countryCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "dictionary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_fkey" FOREIGN KEY ("role") REFERENCES "UserRole"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vochure" ADD CONSTRAINT "Vochure_BrandId_fkey" FOREIGN KEY ("BrandId") REFERENCES "dictionary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dictionary" ADD CONSTRAINT "dictionary_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "dictionary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dictionary" ADD CONSTRAINT "dictionary_CountryCode_fkey" FOREIGN KEY ("CountryCode") REFERENCES "Country"("countryCode") ON DELETE SET NULL ON UPDATE CASCADE;
