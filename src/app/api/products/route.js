import { NextResponse } from "next/server";
import prisma from "@/config/db.server";
import { STATUS } from "@/constants/apiStatus";
import { MESSAGES } from "@/constants/apiMessages";
import { generateUniqueHandle, getAllProducts } from "@/lib/products";
import { createCombinations } from "@/lib/products";
import { errorHandler } from "@/errors/errorHandler";
import CustomError from "@/errors/customError";
import { productValidationSchema } from "@/utilities/yupValidations/product";

export const GET = errorHandler(getProductHandler);
export const POST = errorHandler(createProductHandler);

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

  const dd = await productValidationSchema.validate(body, { abortEarly: false });
  console.log(dd)

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
    brandId,
    options,
    images,
    categories,
  } = body;

  const handle = await generateUniqueHandle(title);

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
        isActive,
        sku,
        tags,
        brandId,
      },
    });

    if (!product) {
      throw new CustomError("Product creation failed", STATUS.BAD_REQUEST);
    }

    await Promise.all([
      createVariantsUsingOptions(tx, product.id, options),
      createImages(tx, product.id, images),
      createCategories(tx, product.id, categories),
    ]);
  });

  return NextResponse.json({ messages: MESSAGES.PRODUCT.CREATED });
}

const createVariantsUsingOptions = async (tx, productId, options) => {
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

const createCategories = async (tx, productId, categories) => {
  try {
    if (categories && Array.isArray(categories)) {
      const categoryData = categories.map((categoryValue) => ({
        productId: productId,
        value: categoryValue,
      }));

      await tx.productCategory.createMany({
        data: categoryData,
      });
    }
  } catch (error) {
    throw new CustomError(
      "Failed to create product categories",
      STATUS.INTERNAL_SERVER_ERROR
    );
  }
};
