import prisma from "@/config/db.server";
import { STATUS } from "@/constants/apiStatus";
import CustomError from "@/errors/customError";
import { createHandle } from "@/helpers/stringHelpers";

export const generateUniqueHandle = async (title) => {
  if (!title) {
    throw new CustomError("Title is required", STATUS.BAD_REQUEST);
  }
  if (typeof title !== "string") {
    throw new CustomError("Title is string", STATUS.BAD_REQUEST);
  }

  // Generate a base handle from the title
  const baseHandle = createHandle(title);

  // Query for all handles starting with the base handle
  try {
    const existingHandles = await prisma.product.findMany({
      where: {
        handle: {
          startsWith: baseHandle,
        },
      },
      select: { handle: true },
    });

    // If no existing handle matches, return the base handle
    if (!existingHandles.length) {
      return baseHandle;
    }

    // Extract all existing handles and identify the highest counter if any
    const handleSet = new Set(existingHandles.map((product) => product.handle));
    let uniqueHandle = baseHandle;
    let counter = 1;

    // Loop to find the first available unique handle
    while (handleSet.has(uniqueHandle)) {
      uniqueHandle = `${baseHandle}-${counter}`;
      counter++;
    }

    return uniqueHandle;
  } catch (error) {
    console.error("Error generating unique handle:", error);
    throw new CustomError(
      "Failed to generate a unique handle",
      STATUS.BAD_REQUEST
    );
  }
};

// Function to prepare options and their corresponding values
export const prepareOptionsAndValues = async (
  productId,
  existingOptions,
  variants
) => {
  const optionValueData = [];
  const optionMap = new Map(
    existingOptions.map((option) => [option.name, option])
  );
  const newOptions = [];

  // First, collect new options and prepare values
  for (const [index, variant] of variants.entries()) {
    const existingOption = optionMap.get(variant.name);

    if (!existingOption) {
      newOptions.push({
        product_id: productId,
        name: variant.name,
        position: index + 1,
      });
    } else {
      const existingValues = existingOption.values || [];
      const existingValueSet = new Set(existingValues.map((v) => v.value));

      variant.values.forEach((val) => {
        if (!existingValueSet.has(val)) {
          optionValueData.push({
            option_id: existingOption.id,
            value: val,
          });
        }
      });
    }
  }

  // Batch create new options if any
  if (newOptions.length > 0) {
    await prisma.productOption.createMany({ data: newOptions });

    // Retrieve the newly created options and update optionMap
    const createdOptions = await prisma.productOption.findMany({
      where: {
        product_id: productId,
        name: { in: newOptions.map((option) => option.name) },
      },
    });

    createdOptions.forEach((option) => {
      optionMap.set(option.name, option);
    });
  }

  for (const variant of variants) {
    const existingOption = optionMap.get(variant.name);
    const existingValues = await prisma.productOptionValue.findMany({
      where: { option_id: existingOption.id },
      select: { value: true },
    });

    const existingValueSet = new Set(existingValues.map((v) => v.value));
    variant.values.forEach((val) => {
      if (!existingValueSet.has(val)) {
        optionValueData.push({
          option_id: existingOption.id,
          value: val,
        });
      }
    });
  }

  return { optionValueData };
};

// Function to create combinations of product variants
export const createCombinations = (variants, productDetails) => {
  const result = [];

  const generateCombination = (current, index) => {
    if (index === variants.length) {
      const title = Object.values(current).filter(Boolean).join(" / ");
      result.push({
        ...productDetails,
        title,
        option1: current.option1 || null,
        option2: current.option2 || null,
        option3: current.option3 || null,
      });
      return;
    }

    for (const value of variants[index].values) {
      generateCombination(
        {
          ...current,
          [`option${index + 1}`]:
            value.charAt(0).toUpperCase() + value.slice(1),
        },
        index + 1
      );
    }
  };

  generateCombination({}, 0);
  return result;
};

export const getProductById = async (productId, options = {}) => {
  if (!productId) {
    throw new CustomError("productId is required", STATUS.BAD_REQUEST);
  }

  try {
    return await prisma.product.findUnique({
      where: { id: productId },
      ...options,
    });
  } catch (error) {
    console.error("Error fetching product by id:", error);
    throw new CustomError(
      "Failed to retrieve product data",
      STATUS.BAD_REQUEST
    );
  }
};
