import * as Yup from "yup";

export const brandIdSchema = Yup.string()
  .required("Brand ID is required.")
  .typeError("Brand ID must be a string.");

export const brandNameSchema = Yup.string()
  .required("Brand name is required.")
  .typeError("Brand name must be a string.");
