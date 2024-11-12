import ProductForm from "./Form";

export default async function page({
  params,
}: {
  params: { productId?: string };
}) {
  
  const { productId } = params;
  const productIdOrDefault = productId ?? "";

  return <ProductForm productId={productIdOrDefault} />;
}
