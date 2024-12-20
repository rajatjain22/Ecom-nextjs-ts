import prisma from "@/config/db.server";
import { MESSAGES } from "@/constants/apiMessages";
import { STATUS } from "@/constants/apiStatus";
import { apiErrorHandler } from "@/errors/apiErrorHandler";
import { createCombinations } from "@/lib/products";
import { getProductById } from "@/services/product.service";
import { NextResponse } from "next/server";
import { productIdValidationSchema } from "@/utilities/validations/product";

export const GET = apiErrorHandler(getProductByIdHandler);
export const PUT = apiErrorHandler(updateProductHandler);
export const DELETE = apiErrorHandler(deleteProductHandler);

async function getProductByIdHandler(request, { params: { productId } }) {
  await productIdValidationSchema.validate(productId, { abortEarly: false });

  const product = await getProductById(productId, {
    include: {
      variants: true,
      options: {
        include: {
          values: true,
        },
      },
    },
  });

  // Check if the product exists
  if (!product) {
    return NextResponse.json(
      { error: MESSAGES.PRODUCT.NOT_FOUND },
      { status: STATUS.NOT_FOUND }
    );
  }

  return NextResponse.json(product);
}

async function updateProductHandler(request, { params: { productId } }) {
  await productIdValidationSchema.validate(productId, { abortEarly: false });

  const {
    title,
    description,
    product_type,
    quantity,
    price,
    discount,
    tax,
    product_status,
    sku,
    brandId,
    product_code,
    options,
  } = await request.json();

  const existingProduct = await getProductById(productId, {
    include: {
      variants: true,
      options: { include: { values: true } },
    },
  });

  // Check if the product exists
  if (!existingProduct) {
    return NextResponse.json(
      { error: MESSAGES.PRODUCT.NOT_FOUND },
      { status: STATUS.NOT_FOUND }
    );
  }

  // Prepare update data
  const updatedProductData = {
    title: title ?? existingProduct.title,
    description: description ?? existingProduct.description,
    product_type: product_type ?? existingProduct.product_type,
    quantity: quantity ?? existingProduct.quantity,
    price: price ?? existingProduct.price,
    discount: discount ?? existingProduct.discount,
    tax: tax ?? existingProduct.tax,
    product_status: product_status ?? existingProduct.product_status,
    sku: sku ?? existingProduct.sku,
    product_code: product_code ?? existingProduct.product_code,
    brandId: brandId ?? existingProduct.brandId,
    updatedAt: new Date(),
  };

  await prisma.product.update({
    where: { id: productId },
    data: updatedProductData,
  });

  // Manage product options and variants
  await Promise.all([
    manageProductOptions(existingProduct, options),
    manageProductVariants(existingProduct, options),
  ]);

  const response = await getProductById(productId, {
    include: {
      variants: true,
      options: { include: { values: true } },
    },
  });

  return NextResponse.json(response, { status: STATUS.OK });
}

async function deleteProductHandler(request, { params: { productId } }) {
  const data = await prisma.$transaction([
    prisma.productOptionValue.deleteMany({
      where: { option: { product_id: productId } },
    }),
    prisma.productOption.deleteMany({ where: { product_id: productId } }),
    prisma.productVariant.deleteMany({ where: { product_id: productId } }),
    prisma.product.delete({ where: { id: productId } }),
  ]);
  return NextResponse.json(data);
}

async function manageProductOptions(existingProduct, newOptions) {
  const existingOptions = existingProduct.options;

  // Prepare lists for deletion, update, and creation
  const existingOptionMap = new Map(
    existingOptions.map((option) => [option.name.toLowerCase(), option])
  );
  const newOptionsMap = new Map(
    newOptions.map((option) => [option.name.toLowerCase(), option])
  );

  const optionsToDelete = existingOptions.filter(
    (option) => !newOptionsMap.has(option.name.toLowerCase())
  );
  const optionsToUpdate = existingOptions.filter((option) =>
    newOptionsMap.has(option.name.toLowerCase())
  );
  const optionsToCreate = newOptions.filter(
    (option) => !existingOptionMap.has(option.name.toLowerCase())
  );

  // Run all database operations in parallel
  await Promise.all([
    deleteProductOptions(optionsToDelete),
    updateProductOptions(optionsToUpdate, newOptionsMap),
    createProductOptions(existingProduct.id, optionsToCreate),
  ]);

  console.log("Options management complete");
}

async function deleteProductOptions(optionsToDelete) {
  if (optionsToDelete.length === 0) return;

  const optionIds = optionsToDelete.map((option) => option.id);

  // Batch delete values and options
  await prisma.$transaction([
    prisma.productOptionValue.deleteMany({
      where: { option_id: { in: optionIds } },
    }),
    prisma.productOption.deleteMany({
      where: { id: { in: optionIds } },
    }),
  ]);

  console.log("Deleted options and their values");
}

async function updateProductOptions(optionsToUpdate, newOptionsMap) {
  if (optionsToUpdate.length === 0) return;

  const updatePromises = optionsToUpdate.map(async (existingOption) => {
    const updatedOption = newOptionsMap.get(existingOption.name.toLowerCase());

    if (updatedOption) {
      // Update option name and replace values
      return prisma.productOption.update({
        where: { id: existingOption.id },
        data: {
          name: updatedOption.name,
          values: {
            deleteMany: {}, // Clear old values
            createMany: {
              data: updatedOption.values.map((value) => ({
                value: value.toLowerCase(),
              })),
            },
          },
        },
      });
    }
  });

  await Promise.all(updatePromises);
  console.log("Updated options and their values");
}

async function createProductOptions(productId, optionsToCreate) {
  if (optionsToCreate.length === 0) return;

  const createPromises = optionsToCreate.map((option) =>
    prisma.productOption.create({
      data: {
        product_id: productId,
        name: option.name.toLowerCase(),
        values: {
          createMany: {
            data: option.values.map((value) => ({
              value: value.toLowerCase(),
            })),
          },
        },
      },
    })
  );

  await Promise.all(createPromises);
  console.log("Created new options and their values");
}

async function manageProductVariants(existingProduct, newVariants) {
  const existingVariants = existingProduct.variants;

  // Generate combinations from new variants options
  const newVariantCombinations = createCombinations(newVariants, {
    product_id: existingProduct.id,
  });

  const existingVariantMap = new Map(
    existingVariants.map((variant) => [variant.title, variant])
  );

  const variantsToDelete = existingVariants.filter(
    (variant) =>
      !newVariantCombinations.some(
        (newVariant) => newVariant.title === variant.title
      )
  );
  const variantsToUpdate = existingVariants.filter((variant) =>
    newVariantCombinations.some(
      (newVariant) => newVariant.title === variant.title
    )
  );
  const variantsToCreate = newVariantCombinations.filter(
    (newVariant) => !existingVariantMap.has(newVariant.title)
  );

  // Run all database operations in parallel
  await Promise.all([
    deleteProductVariants(variantsToDelete),
    updateProductVariants(variantsToUpdate, newVariantCombinations),
    createProductVariants(variantsToCreate),
  ]);

  console.log("Variants management complete");
}

async function deleteProductVariants(variantsToDelete) {
  if (variantsToDelete.length === 0) return;

  const variantIds = variantsToDelete.map((variant) => variant.id);

  // Batch delete variants
  await prisma.productVariant.deleteMany({
    where: {
      id: {
        in: variantIds, // Delete all variants with these IDs
      },
    },
  });

  console.log("Deleted variants");
}

async function updateProductVariants(variantsToUpdate, newVariants) {
  if (variantsToUpdate.length === 0) return;

  const updatePromises = variantsToUpdate.map(async (existingVariant) => {
    const updatedVariant = newVariants.find(
      (newVariant) => newVariant.title === existingVariant.title
    );

    if (updatedVariant) {
      return prisma.productVariant.update({
        where: { id: existingVariant.id },
        data: {
          price: updatedVariant.price, // update other fields as needed
          option1: updatedVariant.option1,
          option2: updatedVariant.option2,
          option3: updatedVariant.option3,
        },
      });
    }
  });

  await Promise.all(updatePromises);
  console.log("Updated variants");
}

async function createProductVariants(variantsToCreate) {
  if (variantsToCreate.length === 0) return;

  await prisma.productVariant.createMany({
    data: variantsToCreate,
  });

  console.log("Created new variants");
}
