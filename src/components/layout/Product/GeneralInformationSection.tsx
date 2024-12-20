import React, { memo, useState, useCallback, useMemo } from "react";
import Input from "@/components/common/Input/Input";
import Textarea from "@/components/common/Input/Textarea";
import FileUpload from "@/components/common/FileUpload";
import Card from "@/components/common/Card";
import ReactSelect from "@/components/common/Input/ReactSelect";
import { Field, Form } from "formik";

interface ProductCategory {
  id: string;
  name: string;
}

const GeneralInformation = memo(({ formik, getAllProductCategories }: any) => {
  const [selectedCategory, setSelectedCategory] = useState<any>(
    formik.values.category
      ? {
          value: formik.values.category?.id,
          label: formik.values.category?.name,
        }
      : null
  );
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(false);
  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
  const [mediaFiles, setMediaFiles] = useState(formik.values.media);

  const handleCategoryInputChange = useCallback(
    async (query: string) => {
      if (!query) {
        return;
      }
      setIsCategoryLoading(true);
      try {
        const data = await getAllProductCategories({
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
        const response = data.category.map((e: ProductCategory) => ({
          label: e.name,
          value: e.id,
        }));
        setCategoryOptions(response);
      } catch (error) {
        console.error("Error fetching brand options:", error);
      } finally {
        setIsCategoryLoading(false);
      }
    },
    [getAllProductCategories]
  );

  const handleCategoryChange = useCallback(
    (newValue: any) => {
      formik.setFieldValue("category", {
        id: newValue?.value,
        name: newValue?.label,
      });
      setSelectedCategory(newValue);
    },
    [formik]
  );

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
        const fileArray = Array.from(files);
        setMediaFiles([...mediaFiles, ...fileArray]);
        formik.setFieldValue("media", [...mediaFiles, ...fileArray]);
      }
    },
    [mediaFiles, formik]
  );

  // Memoize categoryOptions to avoid unnecessary recalculations
  const memoizedCategoryOptions = useMemo(
    () => categoryOptions,
    [categoryOptions]
  );

  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">General Information</h2>
      <Input
        label="Title"
        name="title"
        id="title"
        placeholder="Product Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title ? formik.errors.title : undefined}
      />
      <Textarea
        label="Description"
        name="description"
        id="description"
        placeholder="Product Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.description ? formik.errors.description : undefined
        }
      />
      <FileUpload
        id="media"
        name="media"
        label="Media"
        files={mediaFiles}
        onChange={handleFileChange}
        multiple={true}
        accept={["JPEG", "PNG"]}
      />

      <ReactSelect
        label="Category"
        name="category"
        id="category"
        placeholder="Select category"
        options={memoizedCategoryOptions}
        value={selectedCategory}
        onChange={handleCategoryChange}
        onInputChange={handleCategoryInputChange}
        isLoading={isCategoryLoading}
        error={formik.touched.category ? formik.errors.category : undefined}
      />
    </Card>
  );
});

export default GeneralInformation;