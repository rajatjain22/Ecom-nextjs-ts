"use client";

import React, { useState, useEffect } from "react";
import Table from "@/components/common/Table";
import Link from "next/link";
import Breadcrumb from "@/components/common/Breadcrumb";
import { DeleteIcon, EditIcon } from "@/components/Icons";
import Image from "next/image";
import Badge from "@/components/common/Badge";

interface Product {
  id: number;
  image?: string;
  title: JSX.Element | string;
  isActive: boolean;
  price: string;
  quantity: number;
  category: { id: string; name: string };
  totalQuantity: number;
  totalPriceRange: string;
  instock?: JSX.Element | string;
}

interface Column {
  header: string;
  accessor: string;
}

interface ProductTableProps {
  products: Product[];
  getAllProducts: (params: { page?: number; limit?: number }) => Promise<{
    products: Product[];
    totalCount: number;
    totalPages: number;
    page: number;
  }>;
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  getAllProducts,
  totalCount,
  totalPages,
  currentPage,
}) => {
  const [currentProducts, setCurrentProducts] = useState<Product[]>(products);
  const [currentPageState, setCurrentPageState] = useState<number>(currentPage);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const rows = currentProducts.map((product) => ({
    id: product.id,
    name: (
      <Link
        href={`/admin/products/${product.id}`}
        className="flex items-center hover:underline"
      >
        <Image
          src={
            product.image ||
            "https://cdn.shopify.com/s/files/1/0599/0580/2372/files/screenshot-dribbble_com-2024_10_27-15_56_54_40x40@3x.png?v=1730027152"
          }
          alt={String(product.title) || "Product Image"}
          className="w-10 h-10 object-cover rounded mr-2"
          width={40}
          height={40}
        />
        {product.title}
      </Link>
    ),
    status: (
      <Badge
        className={
          product.isActive
            ? "bg-green-50 text-green-700"
            : "bg-gray-100 text-gray-700"
        }
      >
        {product.isActive ? "Active" : "Draft"}
      </Badge>
    ),
    price: product.price,
    quantity: product.quantity,
    instock: (
      <div className={`text-${product.quantity > 0 ? "green" : "red"}-500`}>
        {product.quantity > 0 ? "In Stock" : "Out of Stock"}
      </div>
    ),
    category: product.category?.name,
    action: (
      <div className="flex space-x-2">
        <EditIcon className="w-4 h-4 text-blue-500 cursor-pointer" />
        <DeleteIcon className="w-4 h-4 text-red-500 cursor-pointer" />
      </div>
    ),
  }));

  const columns: Column[] = [
    { header: "", accessor: "" },
    { header: "Name", accessor: "name" },
    { header: "Status", accessor: "status" },
    { header: "Price", accessor: "price" },
    { header: "Quantity", accessor: "quantity" },
    { header: "In-stock", accessor: "instock" },
    { header: "Category", accessor: "category" },
    // { header: "Action", accessor: "action" },
  ];

  const handleNext = async (page: number) => {
    if (loading) return; // Prevent multiple calls during a request

    setLoading(true); // Start loading
    try {
      const { products: newProducts } = await getAllProducts({ page });

      if (newProducts) {
        setCurrentProducts(newProducts); // Update products
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
      <Table
        rows={rows} // Derived from the updated state
        columns={columns}
        pagination={{
          totalCount,
          totalPages,
          currentPage: currentPageState,
        }}
        onPageChange={handleNext}
        notFoundText="No product found"
      />
    </>
  );
};

export default ProductTable;
