import prisma from "@/config/db.server";
import { STATUS } from "@/constants/apiStatus";
import CustomError from "@/errors/customError";
import { createHandle } from "@/helpers/stringHelpers";

// Define types
type Variant = {
  name: string;
  values: string[];
};

type ProductOption = {
  id: string;
  name: string;
  values?: { value: string }[];
};

type OptionValueData = {
  option_id: string;
  value: string;
};

// Generate a unique handle
export const generateUniqueHandle = async (title: string): Promise<string> => {
  if (!title) {
    throw new CustomError("Title is required", STATUS.BAD_REQUEST);
  }
  if (typeof title !== "string") {
    throw new CustomError("Title should be a string", STATUS.BAD_REQUEST);
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

// Prepare options and values for variants
export const prepareOptionsAndValues = async (
  productId: string,
  existingOptions: ProductOption[],
  variants: Variant[]
): Promise<{ optionValueData: OptionValueData[] }> => {
  const optionValueData: OptionValueData[] = [];
  const optionMap = new Map(
    existingOptions.map((option) => [option.name, option])
  );
  const newOptions: { name: string; product_id: string }[] = []; // Ensure product_id is included

  // Collect new options and prepare values
  variants.forEach((variant) => {
    const existingOption = optionMap.get(variant.name);

    if (!existingOption) {
      // If there's no existing option, create a new one
      newOptions.push({
        name: variant.name,
        product_id: productId, // Set the product_id to link it to the correct product
      });
    } else {
      // Only proceed if existingOption is defined
      const existingValues = existingOption?.values || [];
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
  });

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

  // Loop to create the option value mappings for variants
  for (const variant of variants) {
    const existingOption = optionMap.get(variant.name);

    // Ensure that existingOption is not undefined before accessing its properties
    if (existingOption) {
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
  }

  return { optionValueData };
};

// Function to create combinations of product variants
export const createCombinations = (
  variants: Variant[],
  productDetails: Record<string, any>
): {
  title: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
}[] => {
  const result: {
    title: string;
    option1: string | null;
    option2: string | null;
    option3: string | null;
  }[] = [];

  const generateCombination = (
    current: Record<string, string>,
    index: number
  ): void => {
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

// Get product by ID
export const getProductById = async (
  productId: string,
  options?: any
): Promise<any> => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      ...options,
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // const images = await getImages("product", product.id);
    return { ...product };
  } catch (error) {
    console.error("Error fetching product by id:", error);
    return null;
    // throw new CustomError(
    //   "Failed to retrieve product data",
    //   STATUS.BAD_REQUEST
    // );
  }
};

export const getAllProducts = async ({
  page = 1,
  limit = 10,
  ...options
}: {
  page?: number;
  limit?: number;
  [key: string]: any;
} = {}): Promise<any> => {
  "use server";
  try {
    const skip = (page - 1) * limit;
    const take = limit;

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        skip,
        take,
        ...options,
        include: {
          variants: true,
          images: {
            select: {
              id: true,
              url: true,
              alt: true,
              name: true,
              size: true,
              mimeType: true,
              isPrimary: true,
            },
          },
          options: {
            include: { values: true },
          },
          categories: true,
        },
      }),
      prisma.product.count(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    const processedProducts = products.map((product: any) => {
      if (product?.variants && product.variants.length > 0) {
        const totalQuantity = product.variants.reduce(
          (sum: number, variant: any) => sum + (variant.quantityInStock || 0),
          0
        );

        const prices = product.variants.map(
          (variant: any) => variant.price || 0
        );
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const totalPriceRange =
          minPrice === maxPrice ? `${minPrice}` : `${minPrice} - ${maxPrice}`;

        return {
          ...product,
          price: totalPriceRange,
          discount: product.discount ? product.discount.toNumber() : undefined,
          tax: product.tax ? product.tax.toNumber() : undefined,
          quantity: totalQuantity,
          category: product.category || "N/A",
        };
      }
      return product;
    });

    return {
      products: processedProducts,
      totalCount,
      totalPages,
      page,
    };
  } catch (error) {
    console.error("Error fetching all products:", error);
    return null;
    // throw new CustomError(
    //   "Failed to retrieve products data",
    //   STATUS.BAD_REQUEST
    // );
  }
};
