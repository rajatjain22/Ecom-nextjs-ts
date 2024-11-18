import React, { memo } from "react";
import Input from "@/components/common/Input/Input";
import Card from "@/components/common/Card";

const PricingSection = memo(({ formik }: any) => {
  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Inventory</h2>
      <div className="flex flex-col sm:flex-row sm:gap-5 space-y-2 sm:space-y-0">
        <Input
          label="Price"
          type="number"
          prefix="₹"
          name="price"
          id="price"
          placeholder="Price"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price ? formik.errors.price : undefined}
        />
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
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-5 space-y-2 sm:space-y-0">
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
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-5 space-y-2 sm:space-y-0">
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
          placeholder="Weight Type"
          value={formik.values.weightType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.weightType ? formik.errors.weightType : undefined
          }
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-5 space-y-2 sm:space-y-0">
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
  );
});

export default PricingSection;
