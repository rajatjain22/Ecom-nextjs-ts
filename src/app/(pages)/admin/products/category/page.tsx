import React from "react";
import { getAllProductCategories } from "@/lib/products";
import CategoryTable from "./CategoryTable";

const Page = async () => {
  const { category, totalCount, totalPages, page } = await getAllProductCategories();

  return (
    <CategoryTable
      category={category}
      getAllProductCategories={getAllProductCategories}
      totalCount={totalCount}
      totalPages={totalPages}
      currentPage={page}
    />
  );
};

export default Page;
