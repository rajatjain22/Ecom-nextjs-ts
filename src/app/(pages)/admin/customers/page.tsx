import React from "react";
import CustomerTable from "./CustomerTable";
import { getAllCustomers } from "@/services/customer.service";

const Page = async () => {
  const { customers, totalCount, totalPages, page } = await getAllCustomers();

  return (
    <CustomerTable
      customers={customers}
      getAllCustomers={getAllCustomers}
      totalCount={totalCount}
      totalPages={totalPages}
      currentPage={page}
    />
  );
};

export default Page;
