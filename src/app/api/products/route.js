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
  } = body;

  const handle = await generateUniqueHandle(title);

  // Create the product
  const product = await prisma.product.create({
    data: {
      title,
      price,
      handle,
    },
  });

  // Prepare data for batch creation
  const optionsData = options.map((option) => ({
    product_id: product.id,
    name: option.name,
  }));

  // Create product options in batch
  await prisma.productOption.createMany({
    data: optionsData,
  });
  // Fetch the created options after insertion
  const createdOptions = await prisma.productOption.findMany({
    where: { product_id: product.id },
  });

  // Create product option values in batch
  const valuesData = [];
  createdOptions.forEach((option, idx) => {
    options[idx].values.forEach((value) => {
      valuesData.push({
        option_id: option.id,
        value: value.toLowerCase(),
      });
    });
  });

  await prisma.productOptionValue.createMany({
    data: valuesData,
  });

  // Generate variants after options are created
  const variantData = createCombinations(options, { product_id: product.id });

  // Batch create product variants
  await prisma.productVariant.createMany({
    data: variantData,
  });

  // Construct the response with product, variants, and options/values
  const [variants, productOptions] = await Promise.all([
    prisma.productVariant.findMany({
      where: { product_id: product.id },
    }),
    prisma.productOption.findMany({
      where: { product_id: product.id },
      include: { values: true },
    }),
  ]);

  const response = {
    ...product,
    variants,
    options: productOptions,
  };

  return NextResponse.json(response);
}
