import { NextResponse } from "next/server";
import prisma from "@/config/db.server";
import { STATUS } from "@/constants/apiStatus";
import { MESSAGES } from "@/constants/apiMessages";
import { generateUniqueHandle, createCombinationsm } from "@/lib/products";
import { apiErrorHandler } from "@/errors/apiErrorHandler";
import CustomError from "@/errors/customError";
import { productValidationSchema } from "@/utilities/yupValidations/product";
import { getAllProducts } from "@/services/product.service";

export const GET = apiErrorHandler(getProductHandler);
export const POST = apiErrorHandler(createProductHandler);

async function getProductHandler(request) {
  const { page, limit } = getPaginationParams(request);

  const { products, totalCount, totalPages } = await getAllProducts({
    page,
    limit,
  });

  if (!products || totalCount === 0) {
    throw new CustomError(MESSAGES.PRODUCT.NOT_FOUND, STATUS.NOT_FOUND);
  }

  return NextResponse.json(products, {
    headers: {
      "x-total-item": totalCount.toString(),
      "x-current-page": page.toString(),
      "x-total-pages": totalPages.toString(),
    },
  });
}

function getPaginationParams(request) {
  const searchParams = request.nextUrl.searchParams;
  const page = Math.max(1, parseInt(searchParams.get("page")) || 1);
  const limit = Math.max(
    1,
    Math.min(parseInt(searchParams.get("limit")) || 10, 100)
  );
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

async function createProductHandler(request) {
  const body = await request.json();

  await productValidationSchema.validate(body, {
    abortEarly: false,
  });

  const {
    title,
    description,
    productType,
    quantity,
    price,
    discount,
    tax,
    isActive,
    sku,
    tags,
    brand,
    options,
    images,
    category,
    collections,
  } = body;

  const handle = await generateUniqueHandle(title);
  console.log(brand);
  await prisma.$transaction(async (tx) => {
    const product = await tx.product.create({
      data: {
        title,
        handle,
        description,
        productType,
        quantity,
        price,
        discount,
        tax,
        isActive: isActive === "true" || isActive === true,
        sku,
        tags,
        brandId: brand?.id,
        categoryId: category?.id,
        collectionId: collections?.id,
      },
    });

    if (!product) {
      throw new CustomError("Product creation failed", STATUS.BAD_REQUEST);
    }

    await Promise.all([
      createVariantsUsingOptions(tx, product.id, options),
      createImages(tx, product.id, images),
    ]);
  });

  return NextResponse.json({ messages: MESSAGES.PRODUCT.CREATED });
}

const createVariantsUsingOptions = async (tx, productId, options) => {
  if (options.length === 0) {
    return true;
  }
  try {
    const optionsData = options.map((option) => ({
      productId: productId,
      name: option.name,
    }));

    // Bulk insert options
    await tx.productOption.createMany({
      data: optionsData,
      skipDuplicates: true,
    });

    const createdOptions = await tx.productOption.findMany({
      where: { productId: productId },
    });

    // Map option values directly while preparing for insert
    const valuesData = options.flatMap((option, idx) =>
      option.values.map((value) => ({
        optionId: createdOptions[idx].id, // Use the created option id directly
        value: value.toLowerCase(),
      }))
    );

    // Bulk insert option values
    await tx.productOptionValue.createMany({
      data: valuesData,
    });

    // Generate and bulk insert product variants (combinations of options)
    const variantData = createCombinations(options, { productId: productId });
    await tx.productVariant.createMany({
      data: variantData,
    });
  } catch (error) {
    throw new CustomError(
      "Failed to create product variants",
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};

const createImages = async (tx, productId, images) => {
  try {
    if (images && images.length > 0) {
      await tx.image.createMany({
        data: images.map((e) => ({
          url: e.url,
          alt: e.alt,
          name: e.name,
          size: e.size,
          mimeType: e.mimeType,
          isPrimary: e.isPrimary,
          productId,
        })),
      });
    }
  } catch (error) {
    throw new CustomError(
      "Failed to create product images",
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};
