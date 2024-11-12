import React, { memo } from 'react';
import Input from '@/components/common/Input/Input';
import Card from '@/components/common/Card';

const ProductOrganizationSection = memo(({ formik }: any) => {
  return (
    <Card className='space-y-2 '>
      <h2 className="text-lg font-semibold mb-4">Product organization</h2>
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
  );
});

export default ProductOrganizationSection;