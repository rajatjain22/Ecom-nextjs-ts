-- AlterTable
ALTER TABLE `Product` ADD COLUMN `collectionId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `ProductCollection` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_collectionId_fkey` FOREIGN KEY (`collectionId`) REFERENCES `ProductCollection`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
