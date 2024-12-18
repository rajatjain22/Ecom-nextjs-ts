"use client";

import React, { useState } from "react";
import Table from "@/components/common/Table";
import Breadcrumb from "@/components/common/Breadcrumb";
import { DeleteIcon, EditIcon } from "@/components/Icons";
import Button from "@/components/common/Button";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/common/Modal";
import Input from "@/components/common/Input/Input";

interface Category {
  id: number;
  name: string;
}

interface Column {
  header: string;
  accessor: string;
}

interface CategoryTableProps {
  category: Category[];
  getAllProductCategories: (params: {
    page?: number;
    limit?: number;
  }) => Promise<{
    category: Category[];
    totalCount: number;
    totalPages: number;
    page: number;
  }>;
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  category,
  getAllProductCategories,
  totalCount,
  totalPages,
  currentPage,
}) => {
  const [currentCategory, setCurrentCategory] = useState<Category[]>(category);
  const [currentPageState, setCurrentPageState] = useState<number>(currentPage);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  // State for form data
  const [formData, setFormData] = useState({
    categoryName: "",
  });

  // State to track the category being edited
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );

  const rows = currentCategory.map((category) => ({
    id: category.id,
    name: <div className="flex items-center">{category.name}</div>,
    action: (
      <div className="flex space-x-2">
        <EditIcon
          className="w-4 h-4 text-blue-500 cursor-pointer"
          onClick={() => handleEdit(category)} // Handle edit click
        />
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
      const { category: newCategory } = await getAllProductCategories({ page });

      if (newCategory) {
        setCurrentCategory(newCategory);
        setCurrentPageState(page);
      }
    } catch (error) {
      console.error("Failed to fetch products category:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEdit = (category: Category) => {
    setFormData({ categoryName: category.name });
    setEditingCategoryId(category.id);
    setOpenModal(true);
  };

  const handleSave = () => {
    const { categoryName } = formData;

    if (!categoryName) {
      alert("Category name is required");
      return;
    }

    if (editingCategoryId !== null) {
      const updatedCategories = currentCategory.map((category) =>
        category.id === editingCategoryId
          ? { ...category, name: categoryName }
          : category
      );

      setCurrentCategory(updatedCategories);
      setEditingCategoryId(null);
    }

    // Close modal after saving
    setOpenModal(false);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
          <Breadcrumb />
        </div>
        <div className="flex space-x-2">
          <Button
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={() => setOpenModal(true)}
          >
            Create category
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

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader onClose={() => setOpenModal(false)}>
          {editingCategoryId ? "Edit Category" : "Create Category"}
        </ModalHeader>
        <ModalContent>
          <div className="flex flex-col space-y-4">
            <Input
              label="Category name"
              id="categoryName"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
            />
          </div>
        </ModalContent>
        <ModalFooter>
          <Button
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CategoryTable;
