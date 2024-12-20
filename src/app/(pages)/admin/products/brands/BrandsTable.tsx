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
import { productBrandValidationSchema } from "@/utilities/yupValidations/product";
import toast from "react-hot-toast";

interface Brand {
  id: string;
  name: string;
}

interface Column {
  header: string;
  accessor: string;
}

interface BrandTableProps {
  brands: Brand[];
  getAllProductBrands: (params: { page?: number; limit?: number }) => Promise<{
    brands: Brand[];
    totalCount: number;
    totalPages: number;
    page: number;
  }>;
  createProductBrand: (params: { name: string }) => Promise<Brand>;
  updateProductBrand: (params: { id: string; name: string }) => Promise<Brand>;
  deleteProductBrand: (params: { id: string }) => Promise<void>;
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

const BrandsTable: React.FC<BrandTableProps> = ({
  brands,
  createProductBrand,
  deleteProductBrand,
  getAllProductBrands,
  updateProductBrand,
  totalCount,
  totalPages,
  currentPage,
}) => {
  const [currentBrands, setCurrentBrands] = useState<Brand[]>(brands);
  const [currentPageState, setCurrentPageState] = useState<number>(currentPage);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: { id: "", name: "" },
    validationSchema: productBrandValidationSchema,
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
    async (values: Brand) => {
      const { id, name } = values;
      try {
        if (id) {
          await updateProductBrand({
            id,
            name
          });
          setCurrentBrands((prev) =>
            prev.map((brand) =>
              brand.id === id
                ? { ...brand, name }
                : brand
            )
          );
          toast.success("Successfully updated the brand!");
        } else {
          const newBrand = await createProductBrand({
            name
          });
          setCurrentBrands((prev) => [...prev, newBrand]);
          toast.success("Successfully created the brand!");
        }
        formik.resetForm();
        setOpenModal(false);
      } catch (error: any) {
        console.error("Error saving the brand:", error);
        toast.error(
          error.message || "Failed to save the brand. Please try again."
        );
      }
    },
    [updateProductBrand, createProductBrand, formik]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteProductBrand({ id });
        setCurrentBrands((prevBrand) =>
          prevBrand.filter((brand) => brand.id !== id)
        );
        handleCancelDelete();
        toast.success("brand deleted successfully.");
      } catch (error) {
        console.error("Error deleting the brand:", error);
        toast.error("Failed to delete brand. Please try again.");
      }
    },
    [deleteProductBrand]
  );

  const openDeleteConfirmation = (brand: Brand) => {
    formik.setValues({
      id: brand.id,
      name: brand.name
    });
    setOpenDeleteModal(true);
  };

  const handleCancelDelete = () => setOpenDeleteModal(false);

  const handleEdit = (brand: Brand) => {
    formik.setValues({
      id: brand.id,
      name: brand.name
    });
    setOpenModal(true);
  };

  const rows = useMemo(
    () => currentBrands.map((brand) => ({
      id: brand.id,
      name: <div className="flex items-center">{brand.name}</div>,
      action: (
        <div className="flex space-x-2">
          <EditIcon className="w-4 h-4 text-blue-500 cursor-pointer" onClick={() => handleEdit(brand)} />
          <DeleteIcon className="w-4 h-4 text-red-500 cursor-pointer" onClick={() => openDeleteConfirmation(brand)} />
        </div>
      ),
    })), [currentBrands]
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
  }, [loading, getAllProductBrands]
  );

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Brands</h1>
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
        notFoundText="No brand found"
      />

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader onClose={() => setOpenModal(false)}>
          {formik.values.id ? "Edit Brand" : "Create Brand"}
        </ModalHeader>
        <ModalContent>
          <div className="flex flex-col space-y-4">
            <Input
              label="Brand name"
              id="brandName"
              name="name"
              placeholder="Brand name"
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
          <p>Are you sure you want to delete this brand?</p>
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

export default BrandsTable;
