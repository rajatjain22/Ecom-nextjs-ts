import { ProductFormValuesType } from "@/components/layout/Product/types";
import prisma from "@/config/db.server";
import {
  convertDecimalToNumber,
  createCombinations,
  generateUniqueHandle,
} from "@/lib/products";
import { productValidationSchema } from "@/utilities/yupValidations/product";

// Products
export const createProduct = async (values: ProductFormValuesType) => {
  "use server";
  await productValidationSchema.validate(values, {
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
    media,
    category,
    collections,
    barcode,
    weight,
    weightType,
  } = values;

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
        isActive: isActive === "true" || isActive === true,
        sku,
        tags,
        brandId: brand?.id,
        categoryId: category?.id,
        collectionId: collections?.id,
        barcode,
        weight,
        weightType,
      },
    });

    if (!product) {
      throw new Error("Product creation failed");
    }

    await Promise.all([
      createVariantsUsingOptions(tx, product.id, options),
      createImages(tx, product.id, media),
    ]);
  });

  return true;
};

const createVariantsUsingOptions = async (tx, productId, options) => {
  "use server";
  if (options.length === 0) {
    return true;
  }
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
};

const createImages = async (tx, productId, images) => {
  "use server";
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
};

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

    return { ...product };
  } catch (error) {
    console.error("Error fetching product by id:", error);
    return null;
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
        select: {
          id: true,
          title: true,
          isActive: true,
          price: true,
          quantity: true,
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
          category: true,
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
      return { ...product, price: convertDecimalToNumber(product.price) };
    });

    return {
      products: processedProducts,
      totalCount,
      totalPages,
      page,
    };
  } catch (error) {
    console.error("Error fetching all products:", error);
    return {
      products: [],
      totalCount: 0,
      totalPages: 0,
      page: 0,
    };
  }
};

// Product Category
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
      prisma.productCategory.count(),
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
    return {
      category: [],
      totalCount: 0,
      totalPages: 0,
      page: 0,
    };
  }
};

export const createProductCategory = async ({
  name,
}: {
  name: string;
}): Promise<any> => {
  "use server";
  const existingCategory = await prisma.productCategory.findFirst({
    where: { name },
  });

  if (existingCategory) {
    throw new Error("Category already exist");
  }

  return await prisma.productCategory.create({
    data: {
      name,
    },
    select: {
      id: true,
      name: true,
    },
  });
};

export const updateProductCategory = async ({
  id,
  name,
}: {
  id: string;
  name: string;
}): Promise<any> => {
  "use server";
  const existingCategory = await prisma.productCategory.findFirst({
    where: { id },
  });

  if (!existingCategory) {
    throw new Error("Category not found");
  }

  if (existingCategory.name !== name) {
    const categoryWithName = await prisma.productCategory.findFirst({
      where: { name },
    });
    if (categoryWithName) {
      throw new Error("Category already exist");
    }
  }

  return await prisma.productCategory.update({
    where: { id },
    data: {
      name,
    },
    select: {
      id: true,
      name: true,
    },
  });
};

export const deleteProductCategory = async ({
  id,
}: {
  id: string;
}): Promise<any> => {
  "use server";
  try {
    return await prisma.productCategory.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting product category:", error);
    return null;
  }
};

// Product Brand
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
      prisma.productBrand.count(),
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
    return {
      brands: [],
      totalCount: 0,
      totalPages: 0,
      page: 0,
    };
  }
};

export const createProductBrand = async ({
  name,
}: {
  name: string;
}): Promise<any> => {
  "use server";
  const existingBrand = await prisma.productBrand.findFirst({
    where: { name },
  });

  if (existingBrand) {
    throw new Error("Brand already exist");
  }

  return await prisma.productBrand.create({
    data: {
      name,
    },
    select: {
      id: true,
      name: true,
    },
  });
};

export const updateProductBrand = async ({
  id,
  name,
}: {
  id: string;
  name: string;
}): Promise<any> => {
  "use server";
  const existingBrand = await prisma.productBrand.findFirst({
    where: { id },
  });

  if (!existingBrand) {
    throw new Error("Brand not found");
  }

  if (existingBrand.name !== name) {
    const brandWithName = await prisma.productBrand.findFirst({
      where: { name },
    });
    if (brandWithName) {
      throw new Error("Brand already exist");
    }
  }

  return await prisma.productBrand.update({
    where: { id },
    data: {
      name,
    },
    select: {
      id: true,
      name: true,
    },
  });
};

export const deleteProductBrand = async ({
  id,
}: {
  id: string;
}): Promise<any> => {
  "use server";
  try {
    return await prisma.productBrand.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting product brand:", error);
    return null;
  }
};

// Product Collection
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
      prisma.productCollection.count(),
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
    return { collections: [], totalCount: 0, totalPages: 0, page: 0 };
  }
};

export const createProductCollection = async ({
  name,
  description,
}: {
  name: string;
  description: string;
}): Promise<any> => {
  "use server";
  const existCollection = await prisma.productCollection.findFirst({
    where: { name },
  });

  if (existCollection) {
    throw new Error("Collection already exist");
  }

  return await prisma.productCollection.create({
    data: {
      name,
      description,
    },
    select: {
      id: true,
      name: true,
      description: true,
    },
  });
};

export const updateProductCollection = async ({
  id,
  name,
  description,
}: {
  id: string;
  name: string;
  description: string;
}): Promise<any> => {
  "use server";

  const existingCollection = await prisma.productCollection.findFirst({
    where: { id },
  });

  if (!existingCollection) {
    throw new Error("Collection not found");
  }

  if (existingCollection.name !== name) {
    const collectionWithName = await prisma.productCollection.findFirst({
      where: { name },
    });
    if (collectionWithName) {
      throw new Error("Collection already exist");
    }
  }

  return await prisma.productCollection.update({
    where: { id },
    data: {
      name,
      description,
    },
    select: {
      id: true,
      name: true,
      description: true,
    },
  });
};

export const deleteProductCollection = async ({
  id,
}: {
  id: string;
}): Promise<any> => {
  "use server";
  try {
    return await prisma.productCollection.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting product collection:", error);
    return null;
  }
};
