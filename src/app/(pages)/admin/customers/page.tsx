"use client";

import React from "react";
import Table from "@/components/common/Table";
import Link from "next/link";
import Breadcrumb from "@/components/common/Breadcrumb";

interface Rows {
  id: number;
  name?: string;
  image?: string;
  role?: string;
  email?: string;
  active?: boolean;
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
      image: "https://placehold.co/50x50",
      name: "Customer 1",
      role: "Admin",
      email: "gladys@example.com",
      active: true,
      action: (
        <div>
          <button>edit</button>
        </div>
      ),
    },
    {
      id: 1,
      image: `https://placehold.co/50x50`,
      name: "Rajat",
      role: "Admin",
      email: "gladys@example.com",
      active: true,
      action: (
        <div>
          <button>edit</button>
        </div>
      ),
    },
  ];

  const columns: Column[] = [
    { header: "", accessor: "" },
    { header: "Name", accessor: "name" },
    { header: "Role", accessor: "role" },
    { header: "Email", accessor: "email" },
    { header: "Active", accessor: "active" },
  ];

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-6">
        <div className="">
          <h1 className="text-2xl font-semibold">Customers</h1>
          <Breadcrumb />
        </div>
        <div className="flex space-x-2">
          <Link
            href="/admin/customers/new"
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Create customer
          </Link>
        </div>
      </div>
      <Table rows={rows} columns={columns} />
    </>
  );
};

export default Page;
