-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(10) NULL,
    `role` ENUM('superadmin', 'admin', 'user') NOT NULL DEFAULT 'user',
    `district` VARCHAR(255) NULL,
    `state` VARCHAR(255) NULL,
    `profile` VARCHAR(255) NULL,
    `resetToken` VARCHAR(255) NULL,
    `resetTokenExpiry` DATETIME(3) NULL,
    `otp` VARCHAR(255) NULL,
    `otpExpiry` DATETIME(3) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `handle` VARCHAR(255) NOT NULL,
    `product_type` VARCHAR(100) NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `price` DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    `discount` DECIMAL(5, 2) NULL,
    `tax` DECIMAL(5, 2) NULL,
    `product_status` ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    `product_gender` ENUM('male', 'female', 'unisex', 'other') NULL,
    `sku` VARCHAR(50) NULL,
    `product_code` VARCHAR(50) NULL,
    `brandId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Product_handle_key`(`handle`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductOption` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `position` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductOptionValue` (
    `id` VARCHAR(191) NOT NULL,
    `option_id` VARCHAR(191) NOT NULL,
    `value` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductCategory` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `value` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductBrand` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `ProductBrand_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductVariant` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10, 2) NULL,
    `position` INTEGER NOT NULL DEFAULT 1,
    `sku` VARCHAR(100) NULL,
    `option1` VARCHAR(191) NULL,
    `option2` VARCHAR(191) NULL,
    `option3` VARCHAR(191) NULL,
    `quantity_in_stock` INTEGER NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ProductVariant_sku_key`(`sku`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `ProductBrand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOption` ADD CONSTRAINT `ProductOption_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOptionValue` ADD CONSTRAINT `ProductOptionValue_option_id_fkey` FOREIGN KEY (`option_id`) REFERENCES `ProductOption`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductCategory` ADD CONSTRAINT `ProductCategory_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductVariant` ADD CONSTRAINT `ProductVariant_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
