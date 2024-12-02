import React from "react";
import OrderTable from "./OrderTable";
import { getAllOrders } from "@/lib/order";

const Page = async () => {
  const { orders, totalCount, totalPages, page } = await getAllOrders({
    include: {
      user: { select: { firstName: true, lastName: true } },
    },
  });
  
  return (
    <OrderTable
      orders={orders}
      getAllOrders={getAllOrders}
      totalCount={totalCount}
      totalPages={totalPages}
      currentPage={page}
    />
  );
};

export default Page;
