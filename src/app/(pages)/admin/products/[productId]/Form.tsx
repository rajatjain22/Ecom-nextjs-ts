"use client";

import React from "react";
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

import { ProductValidationSchema } from "@/utilities/formValidations/product";

const ProductForm: React.FC<any> = ({ product }) => {
  console.log(product)
  const formik = useFormik<ProductFormValuesType>({
    initialValues: {
      title: product.title || "",
      descriptions: product.descriptions || "",
      media: product.media || [],
      category: product.category || "",
      status: product.status || false,
      price: product.price || 0,
      productType: product.productType || "",
      collections: product.collections || "",
      options: product.options || [],
      variants: product.variants || false,
      tags: product.tsgs || "",
      sku: product.sku || "",
      barcode: product.barcode || "",
      brand: product.brand || "",
      weight: product.weight || "",
      weightType: product.weightType || "",
      quantity: product.quantity || 0,
      discount: product.discount || "",
    },
    validationSchema: ProductValidationSchema,
    onSubmit: (values) => {
      console.log("Product added:", values);
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
          <h1 className="text-2xl font-semibold">Add New Product</h1>
          <Breadcrumb />
        </div>
        <div className="flex space-x-2">
          <Button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Save
          </Button>
        </div>
      </div>

      {/* Form Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <GeneralInformation formik={formik} />
          <VariantsSection formik={formik} productId={product?.id} />

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
              value={formik.values.status ? 1 : 0}
              onChange={handleStatusChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.status && formik.errors.status
                  ? formik.errors.status
                  : undefined
              }
            />
          </Card>

          <ProductOrganizationSection formik={formik} />
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
