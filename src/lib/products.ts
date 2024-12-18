import prisma from "@/config/db.server";
import { STATUS } from "@/constants/apiStatus";
import CustomError from "@/errors/customError";
import { createHandle } from "@/helpers/stringHelpers";

type Variant = {
  name: string;
  values: string[];
};

// Generate a unique handle
export const generateUniqueHandle = async (title: string): Promise<string> => {
  if (!title) {
    throw new CustomError("Title is required", STATUS.BAD_REQUEST);
  }
  if (typeof title !== "string") {
    throw new CustomError("Title should be a string", STATUS.BAD_REQUEST);
  }

  const baseHandle = createHandle(title);

  try {
    const existingHandles = await prisma.product.findMany({
      where: {
        handle: {
          startsWith: baseHandle,
        },
      },
      select: { handle: true },
    });

    if (!existingHandles.length) {
      return baseHandle;
    }

    const handleSet = new Set(existingHandles.map((product) => product.handle));
    let uniqueHandle = baseHandle;
    let counter = 1;

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

export const getAllProductCategories = async ({
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

    const [category, totalCount] = await Promise.all([
      prisma.productCategory.findMany({
        skip,
        take,
        ...options,
      }),
      prisma.product.count(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      category,
      totalCount,
      totalPages,
      page,
    };
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return null;
    // throw new CustomError(
    //   "Failed to retrieve products data",
    //   STATUS.BAD_REQUEST
    // );
  }
};

export const getAllProductBrands = async ({
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

    const [brands, totalCount] = await Promise.all([
      prisma.productBrand.findMany({
        skip,
        take,
        ...options,
      }),
      prisma.product.count(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      brands,
      totalCount,
      totalPages,
      page,
    };
  } catch (error) {
    console.error("Error fetching all brands:", error);
    return null;
    // throw new CustomError(
    //   "Failed to retrieve products data",
    //   STATUS.BAD_REQUEST
    // );
  }
};

export const getAllProductCollections = async ({
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

    const [collections, totalCount] = await Promise.all([
      prisma.productCollection.findMany({
        skip,
        take,
        ...options,
      }),
      prisma.product.count(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      collections,
      totalCount,
      totalPages,
      page,
    };
  } catch (error) {
    console.error("Error fetching all collections:", error);
    return null;
    // throw new CustomError(
    //   "Failed to retrieve products data",
    //   STATUS.BAD_REQUEST
    // );
  }
};

export const createProductCollection = async ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  "use server";
  try {
    const newCollection = await prisma.productCollection.create({
      data: {
        name,
        description,
      },
    });

    return newCollection;
  } catch (error) {
    console.error("Error creating product collection:", error);
    return null;
  }
};
