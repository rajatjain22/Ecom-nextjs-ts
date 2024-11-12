"use client";

import React from "react";
import Table from "@/components/common/Table";
import Link from "next/link";

interface Rows {
  id: number;
  name: string;
  role: string;
  email: string;
  active: boolean;
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
      name: "Gladys Jones",
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
      id: 2,
      name: "John Smith",
      role: "User",
      email: "john@example.com",
      active: false,
      action: (
        <div>
          <button>edit</button>
        </div>
      ),
    },
    {
      id: 3,
      name: "Alice Johnson",
      role: "User",
      email: "alice@example.com",
      active: true,
      action: (
        <div>
          <button>edit</button>
        </div>
      ),
    },
    {
      id: 4,
      name: "Bob Brown",
      role: "Admin",
      email: "bob@example.com",
      active: false,
      action: (
        <div>
          <button>edit</button>
        </div>
      ),
    },
    {
      id: 5,
      name: "Charlie White",
      role: "User",
      email: "charlie@example.com",
      active: true,
      action: (
        <div>
          <button>edit</button>
        </div>
      ),
    },
    {
      id: 1,
      name: "Gladys Jones",
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
      id: 2,
      name: "John Smith",
      role: "User",
      email: "john@example.com",
      active: false,
      action: (
        <div>
          <button>edit</button>
        </div>
      ),
    },
    {
      id: 3,
      name: "Alice Johnson",
      role: "User",
      email: "alice@example.com",
      active: true,
      action: (
        <div>
          <button>edit</button>
        </div>
      ),
    },
    {
      id: 4,
      name: "Bob Brown",
      role: "Admin",
      email: "bob@example.com",
      active: false,
      action: (
        <div>
          <button>edit</button>
        </div>
      ),
    },
    {
      id: 1,
      name: "Gladys Jones",
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
      id: 2,
      name: "John Smith",
      role: "User",
      email: "john@example.com",
      active: false,
      action: (
        <div>
          <button>edit</button>
        </div>
      ),
    },
    {
      id: 3,
      name: "Alice Johnson",
      role: "User",
      email: "alice@example.com",
      active: true,
      action: (
        <div>
          <button>edit</button>
        </div>
      ),
    },
    {
      id: 4,
      name: "Bob Brown",
      role: "Admin",
      email: "bob@example.com",
      active: false,
      action: (
        <div>
          <button>edit</button>
        </div>
      ),
    },
    {
      id: 1,
      name: "Gladys Jones",
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
      id: 2,
      name: "John Smith",
      role: "User",
      email: "john@example.com",
      active: false,
      action: (
        <div>
          <button>edit</button>
        </div>
      ),
    },
    {
      id: 3,
      name: "Alice Johnson",
      role: "User",
      email: "alice@example.com",
      active: true,
      action: (
        <div>
          <button>edit</button>
        </div>
      ),
    },
    {
      id: 4,
      name: "Bob Brown",
      role: "Admin",
      email: "bob@example.com",
      active: false,
      action: (
        <div>
          <button>edit</button>
        </div>
      ),
    },
  ];

  const columns: Column[] = [
    { header: "Name", accessor: "name" },
    { header: "Role", accessor: "role" },
    { header: "Email", accessor: "email" },
    { header: "Active", accessor: "active" },
  ];

  return (
    <div className="font-sans">
      <div className="flex flex-row justify-between items-center mb-6 p-4">
        <h1 className="text-2xl font-semibold mb-4 md:mb-0">Products</h1>
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
    </div>
  );
};

export default Page;
