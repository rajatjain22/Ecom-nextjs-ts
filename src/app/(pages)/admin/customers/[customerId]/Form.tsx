"use client";

import React, { memo } from "react";
import { useFormik } from "formik";
import Input from "@/components/common/Input/Input";
import Select from "@/components/common/Input/Select";
import Card from "@/components/common/Card";
import Breadcrumb from "@/components/common/Breadcrumb";
import Button from "@/components/common/Button";
import InputChecks from "@/components/common/Input/InputChecks";
import Textarea from "@/components/common/Input/Textarea";
import ProfileUpload from "@/components/common/FileUpload/ProfileUpload";

import { customerValidationSchema } from "@/utilities/yupValidations/customer";
import PersonalInfo from "@/components/layout/Customer/PersonalInfo";
import ShippingInfo from "@/components/layout/Customer/ShippingInfo";
import AccountInfo from "@/components/layout/Customer/AccountInfo";

const CustomerForm: React.FC<any> = memo(({ customer }) => {
  const formik = useFormik({
    initialValues: {
      firstName: customer?.firstName ?? "",
      lastName: customer?.lastName ?? "",
      email: customer?.email ?? "",
      phone: customer?.phone ?? "",
      gender: customer?.gender ?? "male",
      dateOfBirth: customer?.dateOfBirth ?? "",
      shippingAddressLine1: customer?.shippingAddressLine1 ?? "",
      shippingAddressLine2: customer?.shippingAddressLine2 ?? "",
      city: customer?.city ?? "",
      state: customer?.state ?? "",
      postalCode: customer?.postalCode ?? "",
      country: customer?.country ?? "",
      profilePicture: customer?.images?.[0] ?? null,
      notes: customer?.notes ?? "",
      tags: customer?.tags ?? "",
    },
    validationSchema: customerValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log("Customer added:", values);
      setSubmitting(false);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      formik.setFieldValue("profilePicture", event.target.files[0]);
    }
  };

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTags = event.target.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag); // Split tags by comma and remove empty tags
    formik.setFieldValue("tags", newTags);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="flex flex-row justify-between items-center mb-6">
        <div className="">
          <h1 className="text-2xl font-semibold">
            {customer ? "Customer" : "Add New Customer"}
          </h1>
          <Breadcrumb />
        </div>
        <div className="flex space-x-2">
          <Button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded"
            disabled={formik.isSubmitting}
          >
            {customer ? "Update" : "Save"}
          </Button>
        </div>
      </div>

      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <PersonalInfo formik={formik} />
          <ShippingInfo formik={formik} />
          {/* <AccountInfo formik={formik} /> */}
        </div>

        {/* Right Side Cards */}
        <div className="space-y-6">
          {/* Profile Picture */}
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>
            <div className="flex flex-col sm:flex-row sm:gap-5 space-y-2 sm:space-y-0">
              <ProfileUpload
                id="profilePicture"
                name="profilePicture"
                files={formik.values.profilePicture}
                onChange={handleFileChange}
                accept={["JPEG", "PNG"]}
              />
            </div>
          </Card>

          {/* Preferences */}
          {/* <Card className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Preferences</h2>
            <InputChecks
              label="Subscribe to newsletter"
              id="newsletter"
              name="newsletter"
              checked={formik.values.newsletter}
              onChange={formik.handleChange}
              className="form-checkbox"
              error={
                formik.touched.newsletter ? formik.errors.newsletter : undefined
              }
            />
            <InputChecks
              label="Receive marketing updates"
              id="marketing"
              name="marketing"
              checked={formik.values.marketing}
              onChange={formik.handleChange}
              className="form-checkbox"
              error={
                formik.touched.marketing ? formik.errors.marketing : undefined
              }
            />
          </Card> */}

          {/* Tags */}
          <Card className="space-y-4">
            <Textarea
              label="Notes"
              placeholder="Notes"
              name="notes"
              id="notes"
              value={formik.values.notes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.notes && typeof formik.errors.notes === "string"
                  ? formik.errors.notes
                  : undefined
              }
            />
            <Input
              label="Tags"
              id="tags"
              name="tags"
              value={formik.values.tags}
              onChange={handleTagsChange}
              placeholder="Add tags separated by commas"
              className="w-full border border-gray-300 rounded px-4 py-2"
              error={
                formik.touched.tags && typeof formik.errors.tags === "string"
                  ? formik.errors.tags
                  : undefined
              }
            />
          </Card>
        </div>
      </div>
    </form>
  );
});

export default CustomerForm;
