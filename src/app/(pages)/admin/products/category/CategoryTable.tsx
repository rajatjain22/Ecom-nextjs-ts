"use client";

import React, { useCallback, useMemo, useState } from "react";
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
import { useFormik } from "formik";
import { productCategoryValidationSchema } from "@/utilities/yupValidations/product";
import toast from "react-hot-toast";

interface Category {
  id: string;
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
  createProductCategory: (params: { name: string }) => Promise<Brand>;
  updateProductCategory: (params: { id: string; name: string }) => Promise<Brand>;
  deleteProductCategory: (params: { id: string }) => Promise<void>;
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  category,
  getAllProductCategories,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  totalCount,
  totalPages,
  currentPage,
}) => {
  const [currentCategory, setCurrentCategory] = useState<Category[]>(category);
  const [currentPageState, setCurrentPageState] = useState<number>(currentPage);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: { id: "", name: "" },
    validationSchema: productCategoryValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (openDeleteModal) {
          await handleDelete(values.id);
        } else {
          await handleSave(values);
        }
      } catch (error: any) {
        console.error("Error in form submission:", error);
        toast.error(
          error.message || "An unexpected error occurred. Please try again."
        );
      }
      setSubmitting(false);
    },
  });

  const handleSave = useCallback(
    async (values: Category) => {
      const { id, name } = values;
      try {
        if (id) {
          await updateProductCategory({
            id,
            name
          });
          setCurrentCategory((prev) =>
            prev.map((category) =>
              category.id === id
                ? { ...category, name }
                : category
            )
          );
          toast.success("Successfully updated the category!");
        } else {
          const newCategory = await createProductCategory({
            name
          });
          setCurrentCategory((prev) => [...prev, newCategory]);
          toast.success("Successfully created the category!");
        }
        formik.resetForm();
        setOpenModal(false);
      } catch (error: any) {
        console.error("Error saving the category:", error);
        toast.error(
          error.message || "Failed to save the category. Please try again."
        );
      }
    },
    [updateProductCategory, createProductCategory, formik]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteProductCategory({ id });
        setCurrentCategory((prevCategory) =>
          prevCategory.filter((category) => category.id !== id)
        );
        handleCancelDelete();
        toast.success("category deleted successfully.");
      } catch (error) {
        console.error("Error deleting the category:", error);
        toast.error("Failed to delete category. Please try again.");
      }
    },
    [deleteProductCategory]
  );

  const openDeleteConfirmation = (category: Category) => {
    formik.setValues({
      id: category.id,
      name: category.name
    });
    setOpenDeleteModal(true);
  };

  const handleCancelDelete = () => setOpenDeleteModal(false);

  const handleEdit = (category: Category) => {
    formik.setValues({
      id: category.id,
      name: category.name
    });
    setOpenModal(true);
  };

  const rows = useMemo(
    () => currentCategory.map((category) => ({
      id: category.id,
      name: <div className="flex items-center">{category.name}</div>,
      action: (
        <div className="flex space-x-2">
          <EditIcon
            className="w-4 h-4 text-blue-500 cursor-pointer"
            onClick={() => handleEdit(category)} // Handle edit click
          />
          <DeleteIcon className="w-4 h-4 text-red-500 cursor-pointer" onClick={() => openDeleteConfirmation(category)} />
        </div>
      ),
    })), [currentCategory]
  );

  const columns: Column[] = useMemo(
    () => [
      { header: "", accessor: "" },
      { header: "Name", accessor: "name" },
      { header: "Action", accessor: "action" },
    ],
    []
  );

  const handleNext = useCallback(async (page: number) => {
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
  }, [loading, getAllProductCategories]
  );

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
            onClick={() => {
              formik.resetForm();
              setOpenModal(true);
            }}
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
        notFoundText="No category found"
      />

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader onClose={() => setOpenModal(false)}>
          {formik.values.id ? "Edit Category" : "Create Category"}
        </ModalHeader>
        <ModalContent>
          <div className="flex flex-col space-y-4">
            <Input
              label="Category name"
              id="categoryName"
              name="name"
              placeholder="Category name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name ? formik.errors.name : undefined}
            />
          </div>
        </ModalContent>
        <ModalFooter>
          <Button
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={formik.submitForm}
            loading={formik.isSubmitting}
            disabled={!formik.isValid || !formik.dirty}
          >
            {formik.values.id ? "Update" : "Save"}
          </Button>
        </ModalFooter>
      </Modal>

      <Modal open={openDeleteModal} onClose={handleCancelDelete}>
        <ModalHeader onClose={handleCancelDelete}>Confirm Deletion</ModalHeader>
        <ModalContent>
          <p>Are you sure you want to delete this category?</p>
        </ModalContent>
        <ModalFooter>
          <Button
            className="bg-red-500 text-white p-2 rounded"
            onClick={formik.submitForm}
            loading={formik.isSubmitting}
          >
            Yes, Delete
          </Button>
          <Button
            className="bg-gray-500 text-white p-2 rounded"
            onClick={handleCancelDelete}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CategoryTable;
