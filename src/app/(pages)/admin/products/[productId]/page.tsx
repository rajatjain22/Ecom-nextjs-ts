import { getProductById } from "@/lib/products";
import ProductForm from "./Form";
import { notFound } from "next/navigation";

async function fetchProductData(productId: string | undefined) {
  if (!productId || productId === "new") return;
  const product = await getProductById(productId, {
    include: {
      variants: true,
      options: {
        include: {
          values: true,
        },
      },
      images: {
        select: {
          url: true,
          alt: true,
          name: true,
          size: true,
          mimeType: true,
        },
      },
    },
  });

  if (!product) {
    console.error("Product not found");
    return null;
  }

  return {
    ...product,
    price: product.price ? product.price.toNumber() : undefined,
    discount: product.discount ? product.discount.toNumber() : undefined,
    tax: product.tax ? product.tax.toNumber() : undefined,
    variants: product.variants.length > 0,
    variantFirstId:
      product.variants.length > 0 ? product.variants[0].id : undefined,
    options: (product.options || []).map((option: any) => ({
      ...option,
      done: true,
      values: option.values.map((value: any) => value.value),
    })),
  };
}

export default async function Page({
  params,
}: {
  params: { productId?: string };
}) {
  const { productId } = params;

  const product = await fetchProductData(productId);

  if (productId !== "new" && !product) return notFound();

  return <ProductForm product={product} />;
}
