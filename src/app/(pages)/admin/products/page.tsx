import React from "react";
import ProductTable from "./ProductTable";
import { getAllProducts } from "@/lib/products";

const Page = async () => {
  const products = await getAllProducts({
    include: {
      variants: true
    },
  });
  console.log("products ===> ", products);
  return <ProductTable products={products} />;
};

export default Page;
