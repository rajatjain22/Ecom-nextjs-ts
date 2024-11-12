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

import { validationSchema } from "@/utilities/formValidations/product";

const ProductForm = ({ productId }: { productId: string }) => {
  const newProductId = productId === "new"
  const formik = useFormik<ProductFormValuesType>({
    initialValues: {
      title: "",
      descriptions: "",
      media: [],
      category: "",
      status: "",
      price: 0,
      productType: "",
      vendor: "",
      collections: "",
      options: [],
      variants: [],
      tags: "",
      sku: "",
      barcode: "",
      brand: "",
      weight: "",
      weightType: "",
      quantity: 0,
      discount: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Product added:", values);
    },
  });

  const handleSaveDraft = () => {
    console.log("Draft saved:", formik.values);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-row justify-between items-center mb-6">
        <div className="">
          <h1 className="text-2xl font-semibold">Add New Product</h1>
          <Breadcrumb />
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={handleSaveDraft}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
          >
            {" "}
            Save Draft
          </Button>
          <Button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <GeneralInformation formik={formik} />

          <VariantsSection formik={formik} productId={productId}/>

          {formik.values.options.length === 0 && (
            <PricingSection formik={formik} />
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <Select
              label="Status"
              options={[
                { label: "Draft", value: "0" },
                { label: "Active", value: "1" },
              ]}
              name="status"
              id="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.status ? formik.errors.status : undefined}
            />
          </Card>

          <ProductOrganizationSection formik={formik} />
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
