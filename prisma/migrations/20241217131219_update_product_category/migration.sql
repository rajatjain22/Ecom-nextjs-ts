/*
  Warnings:

  - You are about to drop the column `productId` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `ProductCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `ProductCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ProductCategory` DROP FOREIGN KEY `ProductCategory_productId_fkey`;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `categoryID` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ProductCategory` DROP COLUMN `productId`,
    DROP COLUMN `value`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ProductCategory_name_key` ON `ProductCategory`(`name`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryID_fkey` FOREIGN KEY (`categoryID`) REFERENCES `ProductCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
