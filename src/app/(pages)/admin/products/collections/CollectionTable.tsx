"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
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
import Textarea from "@/components/common/Input/Textarea";
import { productCollectionvalidationSchema } from "@/utilities/yupValidations/product";

interface Collection {
  id: string;
  description?: string;
  name: string;
}

interface Column {
  header: string;
  accessor: string;
}

interface CollectionsTableProps {
  collections: Collection[];
  getAllProductCollections: (params: {
    page?: number;
    limit?: number;
  }) => Promise<{
    collections: Collection[];
    totalCount: number;
    totalPages: number;
    page: number;
  }>;
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

const CollectionTable: React.FC<CollectionsTableProps> = ({
  collections,
  getAllProductCollections,
  totalCount,
  totalPages,
  currentPage,
}) => {
  const [currentCollections, setCurrentCollections] =
    useState<Collection[]>(collections);
  const [currentPageState, setCurrentPageState] = useState<number>(currentPage);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleSave = () => {
    if (formik.isValid && formik.dirty) {
      const { id, name, description } = formik.values;

      if (id) {
        // Update existing category
        const updatedCategories = currentCollections.map((category) =>
          category.id === id ? { ...category, name, description } : category
        );
        setCurrentCollections(updatedCategories);
      } else {
        // Create a new category
        const newCategory = { id: Date.now().toString(), name, description };
        setCurrentCollections((prevCollections) => [
          ...prevCollections,
          newCategory,
        ]);
      }

      setOpenModal(false);
    }
  };

  const handleDelete = (id: string) => {
    setCurrentCollections((prevCollections) =>
      prevCollections.filter((category) => category.id !== id)
    );
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      description: "",
    },
    validationSchema: productCollectionvalidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      handleSave();
      setSubmitting(false);
    },
  });

  const rows = currentCollections.map((category) => ({
    id: category.id,
    name: <div className="flex items-center">{category.name}</div>,
    description: (
      <div className="truncate max-w-[100px] sm:max-w-[400px]">{category.description || "N/A"}</div>
    ),
    action: (
      <div className="flex space-x-2">
        <EditIcon
          className="w-4 h-4 text-blue-500 cursor-pointer"
          onClick={() => handleEdit(category)}
        />
        <DeleteIcon
          className="w-4 h-4 text-red-500 cursor-pointer"
          onClick={() => handleDelete(category.id)}
        />
      </div>
    ),
  }));

  const columns: Column[] = [
    { header: "", accessor: "" },
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    { header: "Action", accessor: "action" },
  ];

  const handleNext = async (page: number) => {
    if (loading) return;

    setLoading(true);
    try {
      const { collections: newCollections } = await getAllProductCollections({
        page,
      });

      if (newCollections) {
        setCurrentCollections(newCollections);
        setCurrentPageState(page);
      }
    } catch (error) {
      console.error("Failed to fetch product categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: Collection) => {
    formik.setValues({
      id: category.id,
      name: category.name,
      description: category.description || "",
    });
    setOpenModal(true);
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
            onClick={() => {
              setOpenModal(true);
              formik.resetForm();
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
        notFoundText="No categories found"
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
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name ? formik.errors.name : undefined}
            />
            <Textarea
              label="Description"
              placeholder="Description"
              name="description"
              id="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description
                  ? formik.errors.description
                  : undefined
              }
            />
          </div>
        </ModalContent>
        <ModalFooter>
          <Button
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={formik.submitForm}
            disabled={!formik.isValid || !formik.dirty}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CollectionTable;
