"use client";

import React from "react";
import Button from "@/components/common/Button";
import Breadcrumb from "@/components/common/Breadcrumb";
import Card from "@/components/common/Card";
import Image from "next/image";
import Input from "@/components/common/Input/Input";
import FileUpload from "@/components/common/FileUpload";
import PricingSection from "@/components/layout/Product/PricingSection";
import { ProductvariantFormValuesType } from "@/components/layout/Product/types";
import { useFormik } from "formik";
import { ProductVariantValidationSchema } from "@/utilities/formValidations/product";

const VarinatForm = ({ productId }: { productId: string }) => {
  const formik = useFormik<ProductvariantFormValuesType>({
    initialValues: {
      media: [],
      price: 0,
      quantity: 0,
      sku: "",
      barcode: "",
      weight: "",
      weightType: "",
      brand: "",
      discount: "",
    },
    validationSchema: ProductVariantValidationSchema,
    onSubmit: (values) => {
      console.log("Product added:", values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-row justify-between items-center mb-6">
        <div className="">
          <h1 className="text-2xl font-semibold">Variants</h1>
          <Breadcrumb />
        </div>

        <Button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Save
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Card className="space-y-6">
            <div className="flex items-center">
              <Image
                src="https://images.ctfassets.net/23aumh6u8s0i/c04wENP3FnbevwdWzrePs/1e2739fa6d0aa5192cf89599e009da4e/nextjs"
                alt="image"
                className="w-12 h-12 rounded mr-4"
                width={100}
                height={100}
              />
              <div>
                <h2 className="text-lg font-semibold">broken dust</h2>
                <span className="text-green-600 font-semibold">Active</span>
              </div>
              <p className="text-gray-600">9 variants</p>
            </div>
            <Input
              id="search"
              name="search"
              placeholder="Search variants"
              className="mb-4"
            />
            <ul className="space-y-2">
              <li className="p-2 border rounded">red / L</li>
              <li className="p-2 border rounded">red / XL</li>
              <li className="p-2 border rounded">red / XXL</li>
              <li className="p-2 border rounded">black / L</li>
              <li className="p-2 border rounded">black / XL</li>
              <li className="p-2 border rounded">black / XXL</li>
              <li className="p-2 border rounded">greed / L</li>
              <li className="p-2 border rounded">greed / XL</li>
              <li className="p-2 border rounded">greed / XXL</li>
            </ul>
          </Card>
        </div>
        <div className="md:col-span-2 space-y-6">
          <Card className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Options</h3>
            <Input
              label="Color"
              id="color"
              name="color"
              placeholder="Color"
              // value={formik.values.title}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // error={formik.touched.title ? formik.errors.title : undefined}
            />
            <Input
              label="size"
              id="size"
              name="size"
              placeholder="Size"
              // value={formik.values.title}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // error={formik.touched.title ? formik.errors.title : undefined}
            />
            <FileUpload
              id="media"
              name="media"
              label="Media"
              files={[]}
              onChange={() => {}}
              multiple={true}
              accept={["JPEG", "PNG"]}
            />
          </Card>
          <PricingSection formik={formik} />
        </div>
      </div>
    </form>
  );
};

export default VarinatForm;
