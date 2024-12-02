import { getProductById } from "@/lib/products";
import VarinatForm from "./Form";

export default async function Page({
  params: { productId, variantId },
}: {
  params: { productId: string; variantId: string };
}) {
  const product = await getProductById(productId, {
    select: {
      title: true,
      isActive: true,
      variants: {
        include: {
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
        },
      },
    },
  });

  const variant = product.variants.find(
    (e: { id: string }) => e.id === variantId
  );
  return <VarinatForm product={product} variant={variant} />;
}
