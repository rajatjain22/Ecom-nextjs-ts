import Card from "@/components/common/Card";
import Input from "@/components/common/Input/Input";

const ShippingInfo = ({ formik }: any) => {
  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Shipping Info</h2>
      <div className="flex flex-col sm:flex-row sm:gap-5 space-y-2 sm:space-y-0">
        <Input
          label="Shipping Address Line 1"
          placeholder="Shipping Address Line 1"
          id="shippingAddressLine1"
          name="shippingAddressLine1"
          value={formik.values.shippingAddressLine1}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.shippingAddressLine1
              ? formik.errors.shippingAddressLine1
              : undefined
          }
        />
        <Input
          label="Shipping Address Line 2"
          placeholder="Shipping Address Line 2"
          id="shippingAddressLine2"
          name="shippingAddressLine2"
          value={formik.values.shippingAddressLine2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.shippingAddressLine2
              ? formik.errors.shippingAddressLine2
              : undefined
          }
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-5 space-y-2 sm:space-y-0">
        <Input
          label="State"
          placeholder="State"
          id="state"
          name="state"
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.state ? formik.errors.state : undefined}
        />
        <Input
          label="City"
          placeholder="City"
          id="city"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city ? formik.errors.city : undefined}
        />
        <Input
          label="Postal Code"
          placeholder="Postal Code"
          id="postalCode"
          name="postalCode"
          value={formik.values.postalCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.postalCode ? formik.errors.postalCode : undefined
          }
        />
      </div>
      <Input
        label="Country"
        placeholder="Country"
        id="country"
        name="country"
        value={formik.values.country}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.country ? formik.errors.country : undefined}
      />
    </Card>
  );
};

export default ShippingInfo;
