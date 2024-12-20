"use client";

import React, { memo } from "react";
import { useFormik } from "formik";
import Input from "@/components/common/Input/Input";
import Card from "@/components/common/Card";
import Breadcrumb from "@/components/common/Breadcrumb";
import Button from "@/components/common/Button";
import Textarea from "@/components/common/Input/Textarea";
import ProfileUpload from "@/components/common/FileUpload/ProfileUpload";

import { customerValidationSchema } from "@/utilities/yupValidations/customer";
import PersonalInfo from "@/components/layout/Customer/PersonalInfo";
import ShippingInfo from "@/components/layout/Customer/ShippingInfo";
import { CustomerFormValuesType } from "@/components/layout/Customer/types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MESSAGES } from "@/constants/apiMessages";

const CustomerForm: React.FC<any> = memo(
  ({ customer, createCustomer, updateCustomer }) => {
    const router = useRouter();
    const formik = useFormik<CustomerFormValuesType>({
      initialValues: {
        id: customer?.id ?? "",
        firstName: customer?.firstName ?? "",
        lastName: customer?.lastName ?? "",
        email: customer?.email ?? "",
        mobile: customer?.mobile ?? "",
        gender: customer?.gender ?? "male",
        dateOfBirth: customer?.dateOfBirth ?? "",
        profile: customer?.images?.[0] ?? null,
        notes: customer?.notes ?? "",
        tags: customer?.tags ?? "",
        shippingAddressId: customer?.shippingAddresses?.[0].id ?? "",
        shippingAddressLine1:
          customer?.shippingAddresses?.[0].shippingAddressLine1 ?? "",
        shippingAddressLine2:
          customer?.shippingAddresses?.[0].shippingAddressLine2 ?? "",
        city: customer?.shippingAddresses?.[0].city ?? "",
        district: customer?.shippingAddresses?.[0].district ?? "",
        state: customer?.shippingAddresses?.[0].state ?? "",
        postalCode: customer?.shippingAddresses?.[0].postalCode ?? "",
        country: customer?.shippingAddresses?.[0].country ?? "",
        shippingAddress: customer?.shippingAddress ?? [],
      },
      validationSchema: customerValidationSchema,
      onSubmit: async (values, { setSubmitting }) => {
        try {
          if (customer) {
            await updateCustomer({ ...values });
            toast.success(MESSAGES.USER.UPDATED);
          } else {
            await createCustomer({ ...values });
            toast.success(MESSAGES.USER.CREATED);
            router.push("/admin/customers");
          }
        } catch (error: any) {
          console.log(error)
          toast.error(MESSAGES.GENERAL.SOMTHING_WENT_WRONG);
        } finally {
          setSubmitting(false);
        }
      },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        formik.setFieldValue("profile", event.target.files[0]);
      }
    };

    // const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   const newTags = event.target.value
    //     .split(",")
    //     .map((tag) => tag.trim())
    //     .filter((tag) => tag);
    //   formik.setFieldValue("tags", newTags);
    // };

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
              loading={formik.isSubmitting}
              disabled={!formik.isValid || !formik.dirty}
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
                  id="profile"
                  name="profile"
                  files={formik.values.profile}
                  onChange={handleFileChange}
                  accept={["JPEG", "PNG"]}
                />
              </div>
            </Card>

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
                  formik.touched.notes &&
                  typeof formik.errors.notes === "string"
                    ? formik.errors.notes
                    : undefined
                }
              />
              <Input
                label="Tags"
                id="tags"
                name="tags"
                value={formik.values.tags}
                onChange={formik.handleChange}
                placeholder="Tags"
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
  }
);

export default CustomerForm;
