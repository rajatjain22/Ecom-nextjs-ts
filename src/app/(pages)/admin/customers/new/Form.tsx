"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/common/Input/Input";
import Select from "@/components/common/Input/Select";
import Card from "@/components/common/Card";
import Breadcrumb from "@/components/common/Breadcrumb";
import Button from "@/components/common/Button";
import InputChecks from "@/components/common/Input/InputChecks";
import Textarea from "@/components/common/Input/Textarea";
import ProfileUpload from "@/components/common/FileUpload/ProfileUpload";

// Define the validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
  birthDate: Yup.date().required("Date of birth is required"),
  shippingAddressLine1: Yup.string().required(
    "Shipping address line 1 is required"
  ),
  shippingAddressLine2: Yup.string().optional(),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  postalCode: Yup.string().required("Postal code is required"),
  country: Yup.string().required("Country is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  newsletter: Yup.boolean(),
  marketing: Yup.boolean(),
  language: Yup.string().required("Language is required"),
  currency: Yup.string().required("Currency is required"),
  profilePicture: Yup.mixed()
    .nullable()
    .test(
      "fileSize",
      "File size is too large",
      (value) => !value || value?.size <= 5 * 1024 * 1024
    ) // Max size 5MB
    .test(
      "fileType",
      "Unsupported file format",
      (value) =>
        !value || ["image/jpeg", "image/png"].includes(value?.type)
    ),
  notes: Yup.string().optional(),
  tags: Yup.array().of(Yup.string().required("Tag is required")).optional(),
});

const CustomerForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "male",
      birthDate: "",
      shippingAddressLine1: "",
      shippingAddressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      username: "",
      password: "",
      confirmPassword: "",
      newsletter: false,
      marketing: false,
      language: "en",
      currency: "USD",
      profilePicture: null,
      notes: "",
      tags: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted", values);
      // Submit the form data to your backend or API
    },
  });

  console.log(formik.errors);
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
    <form onSubmit={formik.handleSubmit} className="p-8 rounded-lg space-y-6">
      <div className="flex flex-row justify-between items-center mb-6">
        <div className="">
          <h1 className="text-2xl font-semibold">Add New Customer</h1>
          <Breadcrumb />
        </div>
        <div className="flex space-x-2">
          <Button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Save
          </Button>
        </div>
      </div>

      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Personal Info</h2>
            <div className="flex flex-col sm:flex-row sm:gap-5 space-y-2 sm:space-y-0">
              <Input
                label="First Name"
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName ? formik.errors.firstName : undefined
                }
              />
              <Input
                label="Last Name"
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName ? formik.errors.lastName : undefined
                }
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-5 space-y-2 sm:space-y-0">
              <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email ? formik.errors.email : undefined}
              />
              <Input
                label="Phone"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone ? formik.errors.phone : undefined}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-5 space-y-2 sm:space-y-0">
              <Select
                label="Gender"
                id="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
                error={formik.touched.gender ? formik.errors.gender : undefined}
              />
              <Input
                label="Date of Birth"
                id="birthDate"
                name="birthDate"
                type="date"
                value={formik.values.birthDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.birthDate ? formik.errors.birthDate : undefined
                }
              />
            </div>
          </Card>

          {/* Shipping Info */}
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Shipping Info</h2>
            <div className="flex flex-col sm:flex-row sm:gap-5 space-y-2 sm:space-y-0">
              <Input
                label="Shipping Address Line 1"
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
                id="state"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.state ? formik.errors.state : undefined}
              />
              <Input
                label="City"
                id="city"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city ? formik.errors.city : undefined}
              />
              <Input
                label="Postal Code"
                id="postalCode"
                name="postalCode"
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.postalCode
                    ? formik.errors.postalCode
                    : undefined
                }
              />
            </div>
            <Input
              label="Country"
              id="country"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.country ? formik.errors.country : undefined}
            />
          </Card>

          {/* Account Info */}
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Account Info</h2>
            <Input
              label="Username"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.username ? formik.errors.username : undefined
              }
            />
            <div className="flex flex-col sm:flex-row sm:gap-5 space-y-2 sm:space-y-0">
              <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password ? formik.errors.password : undefined
                }
              />
              <Input
                label="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword
                    ? formik.errors.confirmPassword
                    : undefined
                }
              />
            </div>
          </Card>
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
          <Card className="space-y-4">
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
          </Card>

          {/* Tags */}
          <Card className="space-y-4">
            <Textarea
              label="Notes"
              name="notes"
              id="notes"
              value={formik.values.notes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.notes ? formik.errors.notes : undefined}
            />
            <Input
              label="Tags"
              id="tags"
              name="tags"
              value={formik.values.tags}
              onChange={handleTagsChange}
              placeholder="Add tags separated by commas"
              className="w-full border border-gray-300 rounded px-4 py-2"
              error={formik.touched.tags ? formik.errors.tags : undefined}
            />
          </Card>
        </div>
      </div>
    </form>
  );
};

export default CustomerForm;
