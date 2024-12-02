import * as Yup from "yup";

const optionValidationSchema = Yup.object({
  name: Yup.string().required("Option name is required"),
  values: Yup.array()
    .of(Yup.string().min(1, "Value cannot be empty"))
    .min(1, "At least one value is required")
    .required("Values are required"),
});

const createRequiredIfNoOptions = (
  fieldName: string,
  fieldSchema: Yup.NumberSchema
) => {
  return Yup.number().when("options", (options) => {
    if (options[0].length === 0) {
      return fieldSchema.required(`${fieldName} is required`);
    } else {
      return fieldSchema.notRequired();
    }
  });
};

export const productValidationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required.")
    .typeError("Title must be a string.")
    .min(3, "Title must be at least 3 characters long.")
    .max(100, "Title cannot exceed 100 characters."),

  description: Yup.string()
    .optional()
    .max(1000, "Description cannot exceed 1000 characters."),

  files: Yup.array().of(Yup.mixed()).notRequired(),

  productType: Yup.string()
    .optional()
    .matches(
      /^[a-zA-Z\s]+$/,
      "Product type must only contain letters and spaces."
    )
    .max(50, "Product type cannot exceed 50 characters."),

  collections: Yup.string().required("Collections is required"),

  options: Yup.array().of(optionValidationSchema),

  price: createRequiredIfNoOptions(
    "Price",
    Yup.number()
      .integer("Price must be an integer")
      .min(0, "Price cannot be negative")
  ),
  quantity: createRequiredIfNoOptions(
    "Quantity",
    Yup.number()
      .integer("Quantity must be an integer")
      .min(0, "Quantity cannot be negative")
  ),
  tags: Yup.string().required("Tags are required"),
  category: Yup.string().required("Category is required"),
  isActive: Yup.boolean().required("isActive is required"),
  sku: Yup.string().notRequired(),
  brand: Yup.string().required("Brand is required"),
  weight: Yup.number()
    .positive("Weight must be a positive number")
    .notRequired(),
  weightType: Yup.string().when("weight", (val) => {
    if (val[0]) {
      return Yup.string().required("Weight type is required");
    } else {
      return Yup.string().notRequired();
    }
  }),
  discount: Yup.number()
    .integer("Discount must be an integer")
    .min(0, "Discount cannot be negative")
    .notRequired(),
});

export const productVariantValidationSchema = Yup.object({
  files: Yup.array().of(Yup.mixed()).notRequired(),
  price: Yup.number()
    .integer("Price must be an integer")
    .min(0, "Price cannot be negative")
    .required("Price is required"),
  quantity: Yup.number()
    .integer("Quantity must be an integer")
    .min(0, "Quantity cannot be negative")
    .required("Quantity is required"),
  sku: Yup.string().notRequired(),
  barcode: Yup.string().notRequired(),
  brand: Yup.string().required("Brand is required"),
  weight: Yup.number()
    .positive("Weight must be a positive number")
    .notRequired(),
  weightType: Yup.string().when("weight", (val) => {
    if (val[0]) {
      return Yup.string().required("Weight type is required");
    } else {
      return Yup.string().notRequired();
    }
  }),
  discount: Yup.number()
    .positive("Discount must be a positive number")
    .notRequired(),
});

export const productIdValidationSchema = Yup.string()
  .required("Product ID is required.")
  .typeError("Product ID must be a string.");