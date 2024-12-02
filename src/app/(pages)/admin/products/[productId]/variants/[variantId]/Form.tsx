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
import Badge from "@/components/common/Badge";
import Link from "next/link";

import { productVariantValidationSchema } from "@/utilities/yupValidations/product";

const VarinatForm = ({ product, variant }: { product: any; variant: any }) => {
  const formik = useFormik<ProductvariantFormValuesType>({
    initialValues: {
      media: variant.images || [],
      price: variant.price || 0,
      quantity: variant.quantity || 0,
      sku: variant.sku || "",
      barcode: variant.barcode || "",
      weight: variant.weight || "",
      weightType: variant.weightType || "",
      discount: variant.discount || "",
    },
    validationSchema: productVariantValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log("Variant update:", values);
      setSubmitting(false);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      formik.setFieldValue("media", [...formik.values.media, ...fileArray]);
    }
  };

  const getActiveLinkClass = (href: string) => {
    return variant.id === href
      ? "p-2 border rounded bg-primary text-white"
      : "p-2 border rounded";
  };

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
          disabled={formik.isSubmitting}
        >
          Update
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
                <div className="flex gap-2">
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <Badge className="bg-green-50 text-green-700">
                    {product.isActive ? "Active" : "Draft"}
                  </Badge>
                </div>
                <p className="text-gray-600">
                  {product.variants.length} variants
                </p>
              </div>
            </div>
            <Input
              id="search"
              name="search"
              placeholder="Search variants"
              className="mb-4"
            />
            <div className="flex flex-col space-y-2">
              {product.variants.map((item: { id: string; title: string }) => (
                <Link
                  key={item.id}
                  href={item.id}
                  className={getActiveLinkClass(item.id)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </Card>
        </div>
        <div className="md:col-span-2 space-y-6">
          <Card className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Options</h3>
            <span>Variant: {variant.title}</span>
            <FileUpload
              id="media"
              name="media"
              label="Media"
              files={formik.values.media}
              onChange={handleFileChange}
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
