import { getProductById } from "@/lib/products";
import ProductForm from "./Form";

export default async function page({
  params,
}: {
  params: { productId?: string };
}) {
  
  const { productId } = params;
console.log(productId)
  const product = await getProductById(productId, {
    include: {
      // variants: true,
      options: {
        include: {
          values: true,
        },
      },
    },
  });

  console.log(product)
  return <ProductForm product={product} />;
}
