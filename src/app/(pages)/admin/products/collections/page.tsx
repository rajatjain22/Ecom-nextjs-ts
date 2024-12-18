import React from "react";
import { getAllProductCollections } from "@/lib/products";
import CollectionTable from "./CollectionTable";

const Page = async () => {
  const { collections, totalCount, totalPages, page } = await getAllProductCollections();

  return (
    <CollectionTable
      collections={collections}
      getAllProductCollections={getAllProductCollections}
      totalCount={totalCount}
      totalPages={totalPages}
      currentPage={page}
    />
  );
};

export default Page;
