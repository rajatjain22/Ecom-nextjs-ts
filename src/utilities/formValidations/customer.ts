import * as Yup from 'yup';

export const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
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
        (value) => !value || ["image/jpeg", "image/png"].includes(value?.type)
      ),
    notes: Yup.string().optional(),
    tags: Yup.array().of(Yup.string().required("Tag is required")).optional(),
  });