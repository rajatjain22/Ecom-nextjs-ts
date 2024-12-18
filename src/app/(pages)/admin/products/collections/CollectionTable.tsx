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
import toast from "react-hot-toast";

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
  createProductCollection: (params: {
    name: string;
    description: string;
  }) => Promise<{
    id: string;
    name: string;
    description: string;
  }>;
  updateProductCollection: (params: {
    id: string;
    name: string;
    description: string;
  }) => Promise<{
    id: string;
    name: string;
    description: string;
  }>;
  deleteProductCollection: (params: { id: string }) => Promise<void>;
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

const CollectionTable: React.FC<CollectionsTableProps> = ({
  collections,
  getAllProductCollections,
  createProductCollection,
  updateProductCollection,
  deleteProductCollection,
  totalCount,
  totalPages,
  currentPage,
}) => {
  const [currentCollections, setCurrentCollections] =
    useState<Collection[]>(collections);
  const [currentPageState, setCurrentPageState] = useState<number>(currentPage);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [collectionToDelete, setCollectionToDelete] = useState<Collection | null>(null);

  const handleSave = async () => {
    const { isValid, dirty, values } = formik;

    if (!isValid || !dirty) {
      toast.error(
        "Please fill in all required fields correctly before saving."
      );
      return;
    }

    const { id, name, description } = values;

    try {
      if (id) {
        await updateProductCollection({ id, name, description })
        setCurrentCollections((prev) =>
          prev.map((collection) =>
            collection.id === id
              ? { ...collection, name, description }
              : collection
          )
        );
        toast.success("Successfully updated the collection!");
      } else {
        const newCollection = await createProductCollection({
          name,
          description,
        });

        if (!newCollection) {
          throw new Error("Failed to create the collection. Please try again.");
        }

        setCurrentCollections((prev) => [
          ...prev,
          { id: newCollection.id, name, description },
        ]);

        toast.success("Successfully created the collection!");
      }

      setOpenModal(false);
    } catch (error: any) {
      console.error("Error saving the collection:", error);
      toast.error(
        error.message || "An unexpected error occurred. Please try again."
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProductCollection({ id });
      setCurrentCollections((prevCollections) =>
        prevCollections.filter((collection) => collection.id !== id)
      );
      toast.success("Collection deleted successfully.");
    } catch (error) {
      console.error("Error deleting the collection:", error);
      toast.error("Failed to delete collection. Please try again.");
    }
  };

  const openDeleteConfirmation = (collection: Collection) => {
    setCollectionToDelete(collection);
    setOpenDeleteModal(true);
  };

  // Handles cancelling the deletion
  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
    setCollectionToDelete(null);
  };

  // Handles confirming the deletion
  const handleConfirmDelete = () => {
    if (collectionToDelete) {
      handleDelete(collectionToDelete.id);
      setOpenDeleteModal(false);
      setCollectionToDelete(null);
    }
  };
  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      description: "",
    },
    validationSchema: productCollectionvalidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await handleSave();
      setSubmitting(false);
    },
  });

  const rows = currentCollections.map((collection) => ({
    id: collection.id,
    name: <div className="flex items-center">{collection.name}</div>,
    description: (
      <div className="truncate max-w-[100px] sm:max-w-[400px]">
        {collection.description || "N/A"}
      </div>
    ),
    action: (
      <div className="flex space-x-2">
        <EditIcon
          className="w-4 h-4 text-blue-500 cursor-pointer"
          onClick={() => handleEdit(collection)}
        />
        <DeleteIcon
          className="w-4 h-4 text-red-500 cursor-pointer"
          onClick={() => openDeleteConfirmation(collection)}
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
      console.error("Failed to fetch product collections:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (collection: Collection) => {
    formik.setValues({
      id: collection.id,
      name: collection.name,
      description: collection.description || "",
    });
    setOpenModal(true);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Collections</h1>
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
            Create collection
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
        notFoundText="No collections found"
      />

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader onClose={() => setOpenModal(false)}>
          {formik.values.id ? "Edit Collection" : "Create Collection"}
        </ModalHeader>
        <ModalContent>
          <div className="flex flex-col space-y-4">
            <Input
              label="Collection name"
              placeholder="Collection name"
              id="collectionName"
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
            loading={formik.isSubmitting}
            disabled={!formik.isValid || !formik.dirty}
          >
            {formik.values.id ? "Update" : "Save"}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal open={openDeleteModal} onClose={handleCancelDelete}>
        <ModalHeader onClose={handleCancelDelete}>Confirm Deletion</ModalHeader>
        <ModalContent>
          <p>Are you sure you want to delete this collection?</p>
        </ModalContent>
        <ModalFooter>
          <Button
            className="bg-red-500 text-white p-2 rounded"
            onClick={handleConfirmDelete}
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

export default CollectionTable;
