import React from "react";
import CollectionTable from "./CollectionTable";
import {
  createProductCollection,
  getAllProductCollections,
  updateProductCollection,
  deleteProductCollection,
} from "@/services/product.service";

const Page = async () => {
  const { collections, totalCount, totalPages, page } =
    await getAllProductCollections();

  return (
    <CollectionTable
      collections={collections}
      getAllProductCollections={getAllProductCollections}
      createProductCollection={createProductCollection}
      updateProductCollection={updateProductCollection}
      deleteProductCollection={deleteProductCollection}
      totalCount={totalCount}
      totalPages={totalPages}
      currentPage={page}
    />
  );
};

export default Page;
