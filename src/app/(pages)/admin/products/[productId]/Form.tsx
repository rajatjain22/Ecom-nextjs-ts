"use client";

import React, { memo } from "react";
import { useFormik } from "formik";
import Select from "@/components/common/Input/Select";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import GeneralInformation from "@/components/layout/Product/GeneralInformationSection";
import VariantsSection from "@/components/layout/Product/VariantsSection";
import PricingSection from "@/components/layout/Product/PricingSection";
import ProductOrganizationSection from "@/components/layout/Product/ProductOrganizationSection";
import { ProductFormValuesType } from "@/components/layout/Product/types";
import Breadcrumb from "@/components/common/Breadcrumb";

import { productValidationSchema } from "@/utilities/yupValidations/product";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const ProductForm: React.FC<any> = memo(({ product }) => {
  const mutation = useMutation({
    mutationFn: async (values: ProductFormValuesType) => {
      const response = await axios.post("/api/products", values);
      return response.data;
    },
    onError: (error: unknown) => {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "An unexpected error occurred. Please try again.";
    },
    onSuccess: (res: any) => {
      console.log("Product created successfully", res);
    },
  });

  const formik = useFormik<ProductFormValuesType>({
    initialValues: {
      title: product?.title || "",
      descriptions: product?.description || "",
      media: product?.images || [],
      category: product?.category || "",
      isActive: product?.isActive || false,
      price: product?.price || 0,
      productType: product?.productType || "",
      collections: product?.collections || "",
      options: product?.options || [],
      variants: product?.variants || false,
      tags: product?.tags || "",
      sku: product?.sku || "",
      barcode: product?.barcode || "",
      brand: product?.brand || "",
      weight: product?.weight || 0,
      weightType: product?.weightType || "",
      quantity: product?.quantity || 0,
      discount: product?.discount || 0 ,
    },
    validationSchema: productValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      mutation.mutate(values)
      setSubmitting(false);
    },
  });

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10);
    formik.setFieldValue("status", value === 1);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Title and Breadcrumb */}
      <div className="flex flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">
            {product ? "Product" : "Add New Product"}
          </h1>
          <Breadcrumb />
        </div>
        <div className="flex space-x-2">
          <Button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded"
            disabled={formik.isSubmitting}
          >
            {product ? "Update" : "Save"}
          </Button>
        </div>
      </div>

      {/* Form Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <GeneralInformation formik={formik} />
          <VariantsSection
            formik={formik}
            productId={product?.id}
            variantFirstId={product?.variantFirstId}
          />

          {/* Conditional rendering of PricingSection */}
          {formik.values.options.length === 0 && (
            <PricingSection formik={formik} />
          )}
        </div>

        {/* Sidebar with Select and Product Organization */}
        <div className="space-y-6">
          <Card>
            <Select
              label="Status"
              options={[
                { label: "Draft", value: 0 },
                { label: "Active", value: 1 },
              ]}
              name="status"
              id="status"
              value={formik.values.isActive ? 1 : 0}
              onChange={handleStatusChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.isActive && formik.errors.isActive
                  ? formik.errors.isActive
                  : undefined
              }
            />
          </Card>

          <ProductOrganizationSection formik={formik} />
        </div>
      </div>
    </form>
  );
});

export default ProductForm;
