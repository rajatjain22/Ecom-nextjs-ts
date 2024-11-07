"use client";

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '@/components/common/Input/Input';
import Textarea from '@/components/common/Input/Textarea';
import Select from '@/components/common/Input/Select';
import FileUpload from '@/components/common/FileUpload';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { ProductFormValuesType } from './types';
import OptionItem from './OptionItem';

// Validation schemas
const optionValidationSchema = Yup.object({
  name: Yup.string().required('Option name is required'),
  values: Yup.array()
    .of(Yup.string().min(1, 'Value cannot be empty'))
    .min(1, 'At least one value is required')
    .required('Values are required'),
});

const productValidationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  descriptions: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required').positive('Price must be a positive number'),
  compareAtPrice: Yup.number().positive('Compare at Price must be a positive number').notRequired(),
  productType: Yup.string().required('Product type is required'),
  vendor: Yup.string().required('Vendor is required'),
  collections: Yup.string().required('Collections is required'),
  options: Yup.array().of(optionValidationSchema).min(1, 'At least one option is required').required('Options are required'),
  tags: Yup.string().required('Tags are required'),
  category: Yup.string().required('Category is required'),
  status: Yup.string().required('Status is required'),

  sku: Yup.string().notRequired(),
  barcode: Yup.string().notRequired(),
  quantity: Yup.number().integer('Quantity must be an integer').min(0, 'Quantity cannot be negative').required("Quantity are required"),
  brand: Yup.string().notRequired(),
  weight: Yup.number().positive('Weight must be a positive number').notRequired(),
  discount: Yup.number().positive('Discount must be a positive number').notRequired(),
});

const ProductForm = () => {
  const formik = useFormik<ProductFormValuesType>({
    initialValues: {
      title: '',
      descriptions: '',
      category: '',
      status: '',
      price: '',
      compareAtPrice: '',
      productType: '',
      vendor: '',
      collections: '',
      options: [],
      tags: '',
      sku: '',
      barcode: '',
      brand: '',
      weight: '',
      weightType: '',
      quantity: 0,
      discount: '',
    },
    validationSchema: productValidationSchema,
    onSubmit: (values) => {
      console.log('Product added:', values);
    },
    // validateOnChange: false,
    // validateOnBlur: false,
  });

  const handleSaveDraft = () => {
    console.log('Draft saved:', formik.values);
  };

  const handleOptionChange = (index: number, name: string) => {
    const newOptions = [...formik.values.options];
    newOptions[index].name = name;
    formik.setFieldValue('options', newOptions);
  };

  const handleValueChange = (optionIndex: number, valueIndex: number, value: string) => {
    const newOptions = [...formik.values.options];
    newOptions[optionIndex].values[valueIndex] = value;
    formik.setFieldValue('options', newOptions);

    if (newOptions[optionIndex].values.length - 1 === valueIndex && value) {
      newOptions[optionIndex].values.push(""); // Add a new empty value if needed
      formik.setFieldValue('options', newOptions);
    }
  };

  const removeValue = (optionIndex: number, valueIndex: number) => {
    const newOptions = [...formik.values.options];
    newOptions[optionIndex].values.splice(valueIndex, 1);
    formik.setFieldValue('options', newOptions);
  };

  const removeOption = (index: number) => {
    const newOptions = formik.values.options.filter((_, i) => i !== index);
    formik.setFieldValue('options', newOptions);
  };

  const addOption = () => {
    const blankOption = { name: '', values: [''], done: false };
    if (formik.values.options.length < 3) {
      formik.setFieldValue('options', [...formik.values.options, blankOption]);
    }
  };

  const handleDone = (index: number) => {
    const optionData = formik.values.options[index];
    let hasErrors = false;

    if (!optionData.name.trim()) {
      formik.setFieldError(`options[${index}].name`, 'Option name cannot be empty.');
      hasErrors = true;
    }

    if (optionData.values.every((v) => !v.trim())) {
      formik.setFieldError(`options[${index}].values`, 'Values cannot be empty.');
      hasErrors = true;
    }

    if (!hasErrors) {
      const updatedOptions = [...formik.values.options];
      updatedOptions[index] = { ...updatedOptions[index], done: true, values: optionData.values.filter(Boolean) };
      formik.setFieldValue('options', updatedOptions);
    }
  };

  const handleEdit = (index: number) => {
    const newOptions = [...formik.values.options];
    newOptions[index].done = false;
    newOptions[index].values.push(""); // Add an empty value for editing
    formik.setFieldValue('options', newOptions);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-4 md:p-8 rounded-lg shadow-md">
        <div className="flex flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold mb-4 md:mb-0">
            <i className="fas fa-box-open mr-2"></i>Add New Product
          </h1>
          <div className="flex space-x-2">
            <Button onClick={handleSaveDraft} className="bg-gray-200 text-gray-700 px-4 py-2 rounded"> Save Draft</Button>
            <Button type="submit" className="bg-primary text-white px-4 py-2 rounded">Publish</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className='space-y-4'>
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
              <FileUpload id="file-upload" label="Upload Media" name="fileUpload" />
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

            <Card>
              <label className="block text-sm font-medium text-gray-700">Options</label>
              {formik.values.options.length === 0 ? (
                <div className="text-sm text-gray-500">No options added yet. Click "Add Option" to start.</div>
              ) : (
                formik.values.options.map((option, index) => (
                  <OptionItem
                    key={index}
                    option={option}
                    optionIndex={index}
                    onNameChange={handleOptionChange}
                    onValueChange={handleValueChange}
                    onRemoveValue={removeValue}
                    onRemoveOption={removeOption}
                    onDone={handleDone}
                    onEdit={handleEdit}
                    errors={formik.errors.options?.[index]}
                  />
                ))
              )}
              {formik.values.options.length < 3 && (
                <Button
                  type="button"
                  className="bg-gray-800 text-white px-4 py-2 rounded"
                  onClick={addOption}
                >
                  Add Option
                </Button>
              )}
            </Card>

            {formik.values.options.length > 0 ? <div>dfgd</div> :
              <>
                <Card className='sm:flex-row sm:gap-5 space-y-2 sm:space-y-0'>
                  <Input
                    label="Price"
                    type='number'
                    prefix='₹'
                    name="price"
                    id="price"
                    placeholder="Price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.price ? formik.errors.price : undefined}
                  />
                  <Input
                    label="Compare at Price"
                    type='number'
                    prefix='₹'
                    name="compareAtPrice"
                    id="compareAtPrice"
                    placeholder="Compare at Price"
                    value={formik.values.compareAtPrice}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.compareAtPrice ? formik.errors.compareAtPrice : undefined}
                  />
                </Card>
                <Card className='space-y-4'>
                  <div className='flex flex-col sm:flex-row sm:gap-5 space-y-2 sm:space-y-0'>
                    <Input
                      label="SKU"
                      name="sku"
                      id="sku"
                      placeholder="Stock Keeping Unit"
                      value={formik.values.sku}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.sku ? formik.errors.sku : undefined}
                    />
                    <Input
                      label="Barcode"
                      name="barcode"
                      id="barcode"
                      placeholder="Barcode"
                      value={formik.values.barcode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.barcode ? formik.errors.barcode : undefined}
                    /></div>
                  <div className='flex flex-col sm:flex-row sm:gap-5 space-y-2 sm:space-y-0'>
                    <Input
                      label="Quantity"
                      name="quantity"
                      id="quantity"
                      type="number"
                      value={formik.values.quantity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.quantity ? formik.errors.quantity : undefined}
                    />
                    <Input
                      label="Brand"
                      name="brand"
                      id="brand"
                      placeholder="Brand"
                      value={formik.values.brand}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.brand ? formik.errors.brand : undefined}
                    /></div>
                  <div className='flex flex-col sm:flex-row sm:gap-5 space-y-2 sm:space-y-0'>
                    <Input
                      label="Weight"
                      name="weight"
                      id="weight"
                      type="number"
                      placeholder="Weight"
                      value={formik.values.weight}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.weight ? formik.errors.weight : undefined}
                    />
                    <Input
                      label="Weight type"
                      name="weightType"
                      id="weightType"
                      type="number"
                      placeholder="WeightType"
                      value={formik.values.weightType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.weightType ? formik.errors.weightType : undefined}
                    />
                  </div>
                  <div className='flex flex-col sm:flex-row sm:gap-5 space-y-2 sm:space-y-0'>
                    <Input
                      label="Discount"
                      name="discount"
                      id="discount"
                      type="number"
                      placeholder="Discount"
                      value={formik.values.discount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.discount ? formik.errors.discount : undefined}
                    />
                  </div>
                </Card>
              </>
            }
          </div>

          <div className="space-y-6">
            <Card>
              <Select
                label="Status"
                options={[{ label: "Draft", value: "0" }, { label: "Active", value: "1" }]}
                name="status"
                id="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.status ? formik.errors.status : undefined}
              />
            </Card>

            <Card className='space-y-2 '>
              <Input
                label="Product Type"
                name="productType"
                id="productType"
                placeholder="Product Type"
                value={formik.values.productType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.productType ? formik.errors.productType : undefined}
              />
              <Input
                label="Vendor"
                name="vendor"
                id="vendor"
                placeholder="Vendor"
                value={formik.values.vendor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.vendor ? formik.errors.vendor : undefined}
              />
              <Input
                label="Collections"
                name="collections"
                id="collections"
                placeholder="Collections"
                value={formik.values.collections}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.collections ? formik.errors.collections : undefined}
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
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
