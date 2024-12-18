import React from "react";
import { getAllProductBrands } from "@/lib/products";
import BrandsTable from "./BrandsTable";

const Page = async () => {
  const { brands, totalCount, totalPages, page } = await getAllProductBrands();

  return (
    <BrandsTable
      brands={brands}
      getAllProductBrands={getAllProductBrands}
      totalCount={totalCount}
      totalPages={totalPages}
      currentPage={page}
    />
  );
};

export default Page;
