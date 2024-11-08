import React, { memo } from 'react';
import Input from '@/components/common/Input/Input';
import Textarea from '@/components/common/Input/Textarea';
import Select from '@/components/common/Input/Select';
import FileUpload from '@/components/common/FileUpload';
import Card from '@/components/common/Card';

const GeneralInformation = memo(({ formik }: any) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      formik.setFieldValue('media', [...formik.values.media, ...fileArray]);
    }
  };

  return (
    <Card className='space-y-4'>
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
        name="descriptions"
        id="descriptions"
        placeholder="Product Description"
        value={formik.values.descriptions}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.descriptions ? formik.errors.descriptions : undefined}
      />
      <FileUpload
        id="media"
        name="media"
        label="Media"
        files={formik.values.media}
        onChange={handleFileChange}
        multiple={true}
        accept={["JPEG", "PNG"]}
      />

      <Select
        label="Category"
        options={[{ label: "Option 1", value: "1" }, { label: "Option 2", value: "2" }]}
        name="category"
        id="category"
        value={formik.values.category}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.category ? formik.errors.category : undefined}
      />
    </Card>
  );
});

export default GeneralInformation;
