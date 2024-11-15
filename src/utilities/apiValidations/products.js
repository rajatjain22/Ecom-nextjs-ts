import * as Yup from "yup";

export const productSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required.")
    .typeError("Title must be a string.")
    .min(3, "Title must be at least 3 characters long.")
    .max(100, "Title cannot exceed 100 characters."),

  description: Yup.string()
    .optional()
    .max(1000, "Description cannot exceed 1000 characters."),

  product_type: Yup.string()
    .optional()
    .matches(
      /^[a-zA-Z\s]+$/,
      "Product type must only contain letters and spaces."
    )
    .max(50, "Product type cannot exceed 50 characters."),
  // product_gender: Yup.string().optional().

  quantity: Yup.number()
    .integer("Quantity must be an integer.")
    .min(0, "Quantity cannot be negative.")
    .optional(),

  price: Yup.number()
    .positive("Price must be a positive number.")
    .required("Price is required.")
    .typeError("Price must be a valid number."),

  discount: Yup.number()
    .min(0, "Discount cannot be negative.")
    .max(100, "Discount cannot be more than 100%.")
    .optional()
    .typeError("Discount must be a valid percentage."),

  tax: Yup.number()
    .min(0, "Tax cannot be negative.")
    .max(100, "Tax rate cannot exceed 100%.")
    .optional()
    .typeError("Tax must be a valid percentage."),

  product_status: Yup.string()
    .oneOf(
      ["draft", "published", "archived"],
      "Product status must be either 'draft', 'published', or 'archived'."
    )
    .optional(),

  product_gender: Yup.string()
    .oneOf(
      ["male", "female", "unisex", "other"],
      "Product gender must be either 'male', 'female', 'unisex', or 'other'."
    )
    .optional(),

  sku: Yup.string()
    .optional()
    .matches(
      /^[a-zA-Z0-9_-]+$/,
      "SKU can only contain alphanumeric characters, underscores, and dashes."
    )
    .max(50, "SKU cannot exceed 50 characters."),

  product_code: Yup.string()
    .optional()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Product code must contain only alphanumeric characters."
    )
    .max(20, "Product code cannot exceed 20 characters."),

  variants: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .required("Variant name is required.")
          .min(2, "Variant name must be at least 2 characters long.")
          .max(50, "Variant name cannot exceed 50 characters."),

        values: Yup.array()
          .of(Yup.string().required("Each value must be a non-empty string."))
          .min(1, "At least one value is required for the variant.")
          .required("Variant values are required.")
          .max(100, "Variant values cannot exceed 100 options."),
      })
    )
    .optional(),
});

export const productIdSchema = Yup.string()
  .required("Product ID is required.")
  .typeError("Product ID must be a string.");
