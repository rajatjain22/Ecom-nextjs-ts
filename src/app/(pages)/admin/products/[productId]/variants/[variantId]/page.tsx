import VarinatForm from "./Form";

export default function Page({
  params: { productId, variantId },
}: {
  params: { productId: string; variantId: string };
}) {
  return <VarinatForm productId={productId} variantId={variantId} />;
}
