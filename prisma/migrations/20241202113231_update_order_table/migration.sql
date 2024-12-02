/*
  Warnings:

  - You are about to drop the column `paymentMethod` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to alter the column `paymentMethod` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `Order` DROP COLUMN `paymentMethod`,
    ADD COLUMN `billingAddress` VARCHAR(191) NULL,
    ADD COLUMN `placedAt` DATETIME(3) NULL,
    MODIFY `status` ENUM('pending', 'processing', 'shipped', 'delivered', 'canceled', 'refunded', 'returned') NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `OrderItem` DROP COLUMN `unitPrice`,
    ADD COLUMN `price` DECIMAL(10, 2) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE `Payment` MODIFY `paymentMethod` ENUM('credit_card', 'debit_card', 'paypal', 'cash_on_delivery', 'bank_transfer', 'upi') NULL;

-- CreateTable
CREATE TABLE `Refund` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `orderItemId` VARCHAR(191) NULL,
    `reason` TEXT NOT NULL,
    `status` ENUM('pending', 'approved', 'rejected', 'completed') NOT NULL DEFAULT 'pending',
    `amount` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Refund` ADD CONSTRAINT `Refund_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Refund` ADD CONSTRAINT `Refund_orderItemId_fkey` FOREIGN KEY (`orderItemId`) REFERENCES `OrderItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
