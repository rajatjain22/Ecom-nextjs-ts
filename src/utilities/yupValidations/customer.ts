import * as Yup from "yup";

export const customerValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .typeError("First name must be a string.")
    .min(3, "First name must be at least 3 characters long.")
    .max(100, "First name cannot exceed 100 characters."),

  lastName: Yup.string()
    .typeError("Last name must be a string.")
    .min(3, "Last name must be at least 3 characters long.")
    .max(100, "Last name cannot exceed 100 characters.")
    .optional(),

  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address format"
    )
    .required("Email is required"),

  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),

  gender: Yup.string().required("Gender is required"),

  dateOfBirth: Yup.date().required("Date of birth is required"),

  shippingAddressLine1: Yup.string().required(
    "Shipping address line 1 is required"
  ),

  shippingAddressLine2: Yup.string().optional(),

  city: Yup.string().required("City is required"),

  state: Yup.string().required("State is required"),

  postalCode: Yup.string().required("Postal code is required"),

  country: Yup.string().required("Country is required"),

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
      (value) => !value || ["image/jpeg", "image/png"].includes(value?.type)
    ),

  notes: Yup.string().optional(),

  tags: Yup.array().of(Yup.string().required("Tag is required")).optional(),
});

export const customerIdValidationSchema = Yup.string()
  .required("Customer  ID is required.")
  .typeError("Customer   ID must be a string.");
