import { NextResponse } from "next/server";
import prisma from "@/config/db.server";
import { STATUS } from "@/constants/apiStatus";
import { generateUniqueHandle } from "@/lib/products";
import { productSchema } from "@/utilities/apiValidations/products";
import { prepareOptionsAndValues, createCombinations } from "@/lib/products";
import { errorHandler } from "@/errors/errorHandler";

export const GET = errorHandler(getProductHandler);
export const POST = errorHandler(createProductHandler);

async function getProductHandler(request) {
  const searchParams = request.nextUrl.searchParams;
  const page = Math.max(1, parseInt(searchParams.get("page")) || 1);
  const limit = Math.max(
    1,
    Math.min(parseInt(searchParams.get("limit")) || 10, 100)
  );
  const skip = (page - 1) * limit;

  const [products, totalProducts] = await Promise.all([
    prisma.product.findMany({
      skip: skip,
      take: limit,
      include: {
        variants: true,
        options: {
          include: {
            values: true,
          },
        },
      },
    }),
    prisma.product.count(),
  ]);

  const totalPages = Math.ceil(totalProducts / limit);

  return NextResponse.json(products, {
    headers: {
      "x-total-item": totalProducts.toString(),
      "x-current-page": page.toString(),
      "x-total-pages": totalPages.toString(),
    },
  });
}

async function createProductHandler(request) {
  const body = await request.json();

  await productSchema.validate(body, { abortEarly: false });

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

  // Create the product
  const transaction = await prisma.$transaction(async (tx) => {
    // Create the product
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

    // Prepare and create product options
    const optionsData = options.map((option) => ({
      productId: product.id,
      name: option.name,
    }));

    await tx.productOption.createMany({
      data: optionsData,
    });

    // Fetch the created options after insertion
    const createdOptions = await tx.productOption.findMany({
      where: { productId: product.id },
    });

    // Create option values for each option
    const valuesData = createdOptions.flatMap((option, idx) =>
      options[idx].values.map((value) => ({
        optionId: option.id,
        value: value.toLowerCase(),
      }))
    );

    await tx.productOptionValue.createMany({
      data: valuesData,
    });

    // Generate and create product variants (combinations of options)
    const variantData = createCombinations(options, { productId: product.id });
    await tx.productVariant.createMany({
      data: variantData,
    });

    // Handle images for the product
    // await tx.image.createMany({
    //   data: images.map((image) => ({
    //     url: image.url,
    //     altText: image.altText,
    //     isPrimary: image.isPrimary || false,
    //     modelType: "Product", // Correct model type
    //     modelId: product.id, // Product ID
    //   })),
    // });

    if (categories && Array.isArray(categories)) {
      const categoryData = categories.map((categoryValue) => ({
        productId: product.id,
        value: categoryValue, // Set the category value
      }));

      await tx.productCategory.createMany({
        data: categoryData,
      });
    }

    const productWithDetails = await tx.product.findUnique({
      where: { id: product.id },
      include: {
        variants: true,
        options: {
          include: { values: true },
        },
        images: true,
        categories: true,
      },
    });

    return productWithDetails;
  });

  return NextResponse.json(transaction);
}
