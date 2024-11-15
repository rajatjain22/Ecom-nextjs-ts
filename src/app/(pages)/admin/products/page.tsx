"use client";

import React from "react";
import Table from "@/components/common/Table";
import Link from "next/link";
import Breadcrumb from "@/components/common/Breadcrumb";
import { DeleteIcon, EditIcon } from "@/components/Icons";

interface Rows {
  id: number;
  image?: string;
  name?: string;
  status?: boolean;
  price?: string;
  quantity?: string;
  stock?: string;
  category?: string;
  action?: JSX.Element;
}

interface Column {
  header: string;
  accessor: string;
}

const Page: React.FC = () => {
  const rows: Rows[] = [
    {
      id: 1,
      image:
        "https://cdn.shopify.com/s/files/1/0599/0580/2372/files/screenshot-dribbble_com-2024_10_27-15_56_54_40x40@3x.png?v=1730027152",
      name: "Product 1",
      status: true,
      price: "10.00",
      quantity: "5",
      category: "testing",
      action: (
        <div className="flex space-x-2">
          <EditIcon className="w-4 h-4 text-red-500 cursor-pointer" />
          <DeleteIcon className="w-4 h-4 text-red-500 cursor-pointer" />
        </div>
      ),
    },
    {
      id: 2,
      image:
        "https://cdn.shopify.com/s/files/1/0599/0580/2372/files/screenshot-dribbble_com-2024_10_27-15_56_54_40x40@3x.png?v=1730027152",
      name: "Product 2",
      status: false,
      price: "1.00",
      quantity: "50",
      category: "testing",
      action: (
        <div className="flex space-x-2">
          <EditIcon className="w-4 h-4 text-red-500 cursor-pointer" />
          <DeleteIcon className="w-4 h-4 text-red-500 cursor-pointer" />
        </div>
      ),
    },
  ];

  const columns: Column[] = [
    { header: "", accessor: "" },
    { header: "Name", accessor: "name" },
    { header: "Status", accessor: "status" },
    { header: "Price", accessor: "price" },
    { header: "Quantity", accessor: "quantity" },
    { header: "Category", accessor: "category" },
    { header: "Action", accessor: "action" },
  ];

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-6">
        <div className="">
          <h1 className="text-2xl font-semibold">Products</h1>
          <Breadcrumb />
        </div>
        <div className="flex space-x-2">
          <Link
            href="/admin/products/new"
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Create product
          </Link>
        </div>
      </div>
      <Table rows={rows} columns={columns} />
    </>
  );
};

export default Page;
