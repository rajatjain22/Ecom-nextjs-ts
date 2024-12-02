"use client";

import React, { useState } from "react";
import Table from "@/components/common/Table";
import Link from "next/link";
import Breadcrumb from "@/components/common/Breadcrumb";
import Image from "next/image";
import Badge from "@/components/common/Badge";

interface Customer {
  id: number;
  image?: string;
  firstName: string;
  lastName?: string;
  isActive: boolean;
  email: string;
  role: string;
  mobile?: string;
  country?: string;
  district?: string;
  state?: string;
}

interface Column {
  header: string;
  accessor: string;
}

interface CustomerTableProps {
  customers: Customer[];
  getAllCustomers: (params: { page?: number; limit?: number }) => Promise<{
    customers: Customer[];
    totalCount: number;
    totalPages: number;
    page: number;
  }>;
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  getAllCustomers,
  totalCount,
  totalPages,
  currentPage,
}) => {
  const [currentCustomers, setCurrentCustomers] = useState<Customer[]>(customers);
  const [currentPageState, setCurrentPageState] = useState<number>(currentPage);
  const [loading, setLoading] = useState<boolean>(false);

  const rows = currentCustomers.map((customer) => ({
    id: customer.id,
    name: (
      <Link
        href={`/admin/customers/${customer.id}`}
        className="flex items-center hover:underline"
      >
        <Image
          src={
            customer.image ||
            "https://cdn.shopify.com/s/files/1/0599/0580/2372/files/screenshot-dribbble_com-2024_10_27-15_56_54_40x40@3x.png?v=1730027152"
          }
          alt={`${customer.firstName || "Customer"} Image`}
          className="w-10 h-10 object-cover rounded mr-2"
          width={40}
          height={40}
        />
        {`${customer.firstName} ${customer?.lastName || ""}`}
      </Link>
    ),
    status: (
      <Badge
        className={
          customer.isActive
            ? "bg-green-50 text-green-700"
            : "bg-gray-100 text-gray-700"
        }
      >
        {customer.isActive ? "Active" : "Draft"}
      </Badge>
    ),
    email: customer.email,
    role: customer.role,
    mobile: customer.mobile || "N/A",
    country: customer.country || "N/A",
    district: customer.district || "N/A",
    state: customer.state || "N/A",
  }));

  const columns: Column[] = [
    { header: "Name", accessor: "name" },
    { header: "Status", accessor: "status" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    { header: "Mobile", accessor: "mobile" },
    { header: "Country", accessor: "country" },
    { header: "District", accessor: "district" },
    { header: "State", accessor: "state" },
  ];

  const handleNext = async (page: number) => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await getAllCustomers({ page });
      const { customers: newCustomers } = response;

      if (newCustomers) {
        setCurrentCustomers(newCustomers);
        setCurrentPageState(page);
      }
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Customers</h1>
          <Breadcrumb />
        </div>
        <div className="flex space-x-2">
          <Link
            href="/admin/customers/new"
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Create Customer
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
      />
    </>
  );
};

export default CustomerTable;
