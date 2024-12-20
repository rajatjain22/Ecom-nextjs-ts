import React from "react";
import { createProductCategory, deleteProductCategory, getAllProductCategories, updateProductCategory } from "@/services/product.service";
import CategoryTable from "./CategoryTable";

const Page = async () => {
  const { category, totalCount, totalPages, page } = await getAllProductCategories();

  return (
    <CategoryTable
      category={category}
      getAllProductCategories={getAllProductCategories}
      createProductCategory={createProductCategory}
      updateProductCategory={updateProductCategory}
      deleteProductCategory={deleteProductCategory}
      totalCount={totalCount}
      totalPages={totalPages}
      currentPage={page}
    />
  );
};

export default Page;
