import React from "react";
import ProductTable from "./ProductTable";
import { getAllProducts } from "@/services/product.service";

const Page = async () => {
  const { products, totalCount, totalPages, page } = await getAllProducts();

  return (
    <ProductTable
      products={products}
      getAllProducts={getAllProducts}
      totalCount={totalCount}
      totalPages={totalPages}
      currentPage={page}
    />
  );
};

export default Page;
