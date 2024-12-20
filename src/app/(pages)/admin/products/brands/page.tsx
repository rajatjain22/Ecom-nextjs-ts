import React from "react";
import BrandsTable from "./BrandsTable";
import {
  createProductBrand,
  deleteProductBrand,
  getAllProductBrands,
  updateProductBrand,
} from "@/services/product.service";

const Page = async () => {
  const { brands, totalCount, totalPages, page } = await getAllProductBrands();

  return (
    <BrandsTable
      brands={brands}
      getAllProductBrands={getAllProductBrands}
      createProductBrand={createProductBrand}
      updateProductBrand={updateProductBrand}
      deleteProductBrand={deleteProductBrand}
      totalCount={totalCount}
      totalPages={totalPages}
      currentPage={page}
    />
  );
};

export default Page;
