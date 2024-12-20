import React, { memo, useEffect, useState } from "react";
import Input from "@/components/common/Input/Input";
import Card from "@/components/common/Card";
import Select from "@/components/common/Input/Select";
import ReactSelect from "@/components/common/Input/ReactSelect";

interface ProductBrand {
  id: string;
  name: string;
}

const ProductOrganizationSection = memo(
  ({ formik, getAllProductBrands, getAllProductCollections }: any) => {
    const [selectedBrand, setSelectedBrand] = useState<any>(
      formik.values.brand
        ? {
            value: formik.values.brand?.id,
            label: formik.values.brand?.name,
          }
        : null
    );
    const [selectedCollection, setSelectedCollection] = useState<any>(
      formik.values.collections
        ? {
            value: formik.values.collections?.id,
            label: formik.values.collections?.name,
          }
        : null
    );

    const [isBrandLoading, setIsBrandLoading] = useState<boolean>(false);
    const [isCollectionLoading, setIsCollectionLoading] =
      useState<boolean>(false);

    const [brandOptions, setBrandOptions] = useState<any[]>([]);
    const [collectionOptions, setCollectionOptions] = useState<any[]>([]);

    const handleBrandInputChange = async (query: string) => {
      if (!query) {
        return;
      }
      setIsBrandLoading(true);
      try {
        const data = await getAllProductBrands({
          where: {
            name: {
              contains: query.toLowerCase(),
            },
          },
          select: {
            id: true,
            name: true,
          },
        });
        const response = data.brands.map((e: ProductBrand) => ({
          label: e.name,
          value: e.id,
        }));
        setBrandOptions(response);
      } catch (error) {
        console.error("Error fetching brand options:", error);
      } finally {
        setIsBrandLoading(false);
      }
    };

    // Handle collection search
    const handleCollectionInputChange = async (query: string) => {
      if (!query) {
        return;
      }
      setIsCollectionLoading(true);
      try {
        const data = await getAllProductCollections({
          where: {
            name: {
              contains: query.toLowerCase(),
            },
          },
          select: {
            id: true,
            name: true,
          },
        });
        const response = data.collections.map((e: ProductBrand) => ({
          label: e.name,
          value: e.id,
        }));
        setCollectionOptions(response);
      } catch (error) {
        console.error("Error fetching collection options:", error);
      } finally {
        setIsCollectionLoading(false);
      }
    };

    // Handle brand selection
    const handleBrandChange = (newValue: any) => {
      formik.setFieldValue("brand", {
        id: newValue?.value,
        name: newValue?.label,
      });
      setSelectedBrand(newValue);
    };

    // Handle collection selection
    const handleCollectionChange = (newValue: any) => {
      formik.setFieldValue("collections", {
        id: newValue?.value,
        name: newValue?.label,
      });
      setSelectedCollection(newValue);
    };

    return (
      <Card className="space-y-2 ">
        <h2 className="text-lg font-semibold mb-4">Product organization</h2>
        <Select
          label="Product Type"
          name="productType"
          id="productType"
          options={[
            { label: "Physical", value: "physical" },
            { label: "Digital", value: "digital" },
            { label: "Service", value: "service" },
          ]}
          value={formik.values.productType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.productType ? formik.errors.productType : undefined
          }
        />

        <ReactSelect
          label="Brand"
          name="brand"
          id="brand"
          placeholder="Select Brand"
          options={brandOptions}
          value={selectedBrand}
          onChange={handleBrandChange}
          onInputChange={handleBrandInputChange}
          isLoading={isBrandLoading}
          error={formik.touched.brand ? formik.errors.brand : undefined}
        />

        <ReactSelect
          label="Collections"
          name="collections"
          id="collections"
          placeholder="Select Collections"
          options={collectionOptions}
          value={selectedCollection}
          onChange={handleCollectionChange}
          onInputChange={handleCollectionInputChange}
          isLoading={isCollectionLoading}
          error={
            formik.touched.collections ? formik.errors.collections : undefined
          }
        />

        <Input
          label="Tags"
          name="tags"
          id="tags"
          placeholder="Tags"
          value={formik.values.tags}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.tags ? formik.errors.tags : undefined}
        />
      </Card>
    );
  }
);

ProductOrganizationSection.displayName = "ProductOrganizationSection";
export default ProductOrganizationSection;
