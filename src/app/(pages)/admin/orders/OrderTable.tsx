"use client";

import React, { useState } from "react";
import Table from "@/components/common/Table";
import Link from "next/link";
import Breadcrumb from "@/components/common/Breadcrumb";
import Image from "next/image";
import Badge from "@/components/common/Badge";

interface User {
  firstName: string;
  lastName?: string;
}

interface Order {
  id: number;
  image?: string;
  orderNumber: string;
  createdAt: Date;
  status: string;
  user: User;
  totalAmount: any;
  paymentStatus: string;
  shippingAddress: string;
  billingAddress: string;
  placedAt: Date;
  updatedAt: Date;
}

interface Column {
  header: string;
  accessor: string;
}

interface ProductTableProps {
  orders: Order[];
  getAllOrders: (params: { page?: number; limit?: number }) => Promise<{
    products: Order[];
    totalCount: number;
    totalPages: number;
    page: number;
  }>;
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

const OrderTable: React.FC<ProductTableProps> = ({
  orders,
  getAllOrders,
  totalCount,
  totalPages,
  currentPage,
}) => {
  const [currentOrders, setCurrentOrders] = useState<Order[]>(orders);
  const [currentPageState, setCurrentPageState] = useState<number>(currentPage);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  // Convert Decimal to number or string and Date to ISO string
  const formatOrderData = (order: Order) => ({
    ...order,
    totalAmount: order.totalAmount,
    createdAt:
      order.createdAt instanceof Date
        ? order.createdAt.toISOString()
        : order.createdAt, // Convert Date to ISO string
    placedAt:
      order.placedAt instanceof Date
        ? order.placedAt.toISOString()
        : order.placedAt,
    updatedAt:
      order.updatedAt instanceof Date
        ? order.updatedAt.toISOString()
        : order.updatedAt,
  });

  const rows = currentOrders.map((order) => {
    const formattedOrder = formatOrderData(order);

    return {
      id: formattedOrder.id,
      order: (
        <Link
          href={`/admin/orders/${formattedOrder.id}`}
          className="flex items-center hover:underline"
        >
          <Image
            src={
              formattedOrder.image ||
              "https://cdn.shopify.com/s/files/1/0599/0580/2372/files/screenshot-dribbble_com-2024_10_27-15_56_54_40x40@3x.png?v=1730027152"
            }
            alt={formattedOrder.orderNumber}
            className="w-10 h-10 object-cover rounded mr-2"
            width={40}
            height={40}
          />
          {formattedOrder.orderNumber}
        </Link>
      ),
      date: formattedOrder.createdAt,
      status: (
        <Badge
          className={
            formattedOrder.status === "pending"
              ? "bg-gray-100 text-gray-700"
              : "bg-green-50 text-green-700"
          }
        >
          {formattedOrder.status}
        </Badge>
      ),
      paymentStatus: (
        <Badge
          className={
            formattedOrder.status === "pending"
              ? "bg-gray-100 text-gray-700"
              : "bg-green-50 text-green-700"
          }
        >
          {formattedOrder.status}
        </Badge>
      ),
      customer: `${formattedOrder.user.firstName} ${
        formattedOrder.user?.lastName || ""
      }`,
      totalAmount: formattedOrder.totalAmount,
    };
  });

  const columns: Column[] = [
    { header: "", accessor: "" },
    { header: "Order", accessor: "order" },
    { header: "Date", accessor: "date" },
    { header: "Order Status", accessor: "status" },
    { header: "Payment Status", accessor: "paymentStatus" },
    { header: "Customer", accessor: "customer" },
    { header: "Total Amount", accessor: "totalAmount" },
  ];

  const handleNext = async (page: number) => {
    if (loading) return; // Prevent multiple calls during a request

    setLoading(true); // Start loading
    try {
      const { products: newOrders } = await getAllOrders({ page });

      if (newOrders) {
        setCurrentOrders(newOrders); // Update orders
        setCurrentPageState(page); // Update current page
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Orders</h1>
          <Breadcrumb />
        </div>
        <div className="flex space-x-2">
          <Link
            href="/admin/orders/new"
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Create order
          </Link>
        </div>
      </div>
      <Table
        rows={rows}
        columns={columns}
        pagination={{
          totalCount,
          totalPages,
          currentPage: currentPageState,
        }}
        onPageChange={handleNext}
        notFoundText="No order found"
      />
    </>
  );
};

export default OrderTable;
