"use client";

import React, { useState } from "react";
import Table from "@/components/common/Table";
import Link from "next/link";
import Breadcrumb from "@/components/common/Breadcrumb";
import { DeleteIcon, EditIcon } from "@/components/Icons";
import Button from "@/components/common/Button";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/common/Modal";
import Input from "@/components/common/Input/Input";

interface Brand {
  id: number;
  name: string;
}

interface Column {
  header: string;
  accessor: string;
}

interface CategoryTableProps {
  brands: Brand[];
  getAllProductBrands: (params: { page?: number; limit?: number }) => Promise<{
    brands: Brand[];
    totalCount: number;
    totalPages: number;
    page: number;
  }>;
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

const BrandsTable: React.FC<CategoryTableProps> = ({
  brands,
  getAllProductBrands,
  totalCount,
  totalPages,
  currentPage,
}) => {
  const [currentBrands, setCurrentBrands] = useState<Brand[]>(brands);
  const [currentPageState, setCurrentPageState] = useState<number>(currentPage);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const rows = currentBrands.map((category) => ({
    id: category.id,
    name: <div className="flex items-center">{category.name}</div>,
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
    { header: "Action", accessor: "action" },
  ];

  const handleNext = async (page: number) => {
    if (loading) return;

    setLoading(true);
    try {
      const { brands: newBrands } = await getAllProductBrands({ page });

      if (newBrands) {
        setCurrentBrands(newBrands);
        setCurrentPageState(page);
      }
    } catch (error) {
      console.error("Failed to fetch products brands:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Brands</h1>
          <Breadcrumb />
        </div>
        <div className="flex space-x-2">
          <Button className="bg-primary text-white px-4 py-2 rounded" onClick={()=>setOpenModal(true)}>
            Create brand
          </Button>
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
        notFoundText="No product found"
      />

      <Modal open={openModal} onClose={()=>setOpenModal(false)}>
        <ModalHeader onClose={()=>setOpenModal(false)}>Create Brand</ModalHeader>
        <ModalContent>
          <div className="flex flex-col space-y-4">
            <Input
              label="Brand name"
              id="brandName"
              name="brandName"
              value={""}
            />
          </div>
        </ModalContent>
        <ModalFooter>
          <Button className="bg-primary text-white px-4 py-2 rounded">
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default BrandsTable;
