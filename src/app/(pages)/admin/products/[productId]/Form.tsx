"use client";

import React, { memo, useCallback } from "react";
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
import toast from "react-hot-toast";
import { MESSAGES } from "@/constants/apiMessages";
import { useRouter } from "next/navigation";

const ProductForm: React.FC<any> = memo(
  ({
    product,
    createProduct,
    getAllProductBrands,
    getAllProductCollections,
    getAllProductCategories,
  }) => {
    const router = useRouter();
    const formik = useFormik<ProductFormValuesType>({
      initialValues: {
        title: product?.title || null,
        description: product?.description || null,
        media: product?.images || [],
        isActive: product?.isActive || false,
        price: product?.price || 0,
        productType: product?.productType || null,
        category: product?.category || null,
        collections: product?.collection || null,
        brand: product?.brand || null,
        options: product?.options || [],
        variants: product?.variants || false,
        tags: product?.tags || null,
        sku: product?.sku || null,
        barcode: product?.barcode || null,
        weight: product?.weight || 0,
        weightType: product?.weightType || null,
        quantity: product?.quantity || 0,
        discount: product?.discount || 0,
      },
      validationSchema: productValidationSchema,
      onSubmit: useCallback(
        async (values, { setSubmitting }) => {
          try {
            await createProduct(values);
            setSubmitting(false);
            toast.success(MESSAGES.PRODUCT.CREATED);
            router.push("/admin/products");
          } catch (error: any) {
            console.log(error);
            toast.error(error.message || MESSAGES.GENERAL.SOMTHING_WENT_WRONG);
          }
        },
        [createProduct, router]
      ),
    });

    return (
      <form onSubmit={formik.handleSubmit}>
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
              loading={formik.isSubmitting}
              disabled={!formik.isValid || !formik.dirty}
            >
              {product ? "Update" : "Save"}
            </Button>
          </div>
        </div>

        {/* Form Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <GeneralInformation
              formik={formik}
              getAllProductCategories={getAllProductCategories}
            />
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

          <div className="space-y-6">
            <Card>
              <Select
                label="Status"
                options={[
                  { label: "Draft", value: "false" },
                  { label: "Active", value: "true" },
                ]}
                name="isActive"
                id="status"
                value={formik.values.isActive ? "true" : "false"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.isActive && formik.errors.isActive
                    ? formik.errors.isActive
                    : undefined
                }
              />
            </Card>

            <ProductOrganizationSection
              formik={formik}
              getAllProductBrands={getAllProductBrands}
              getAllProductCollections={getAllProductCollections}
            />
          </div>
        </div>
      </form>
    );
  }
);

ProductForm.displayName = "ProductForm";
export default ProductForm;
