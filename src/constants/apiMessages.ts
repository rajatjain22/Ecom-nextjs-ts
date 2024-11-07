import { MessageType } from "@/interfaces/apiMessages";

export const MESSAGES: MessageType = {
  GENERAL: {
    SUCCESS: "Request completed successfully.",
    FAILURE: "Request failed. Please try again.",
    INVALID_REQUEST_BODY: "Invalid request body.",
    INVALID_REQUEST: "Invalid request parameters.",
  },
  PRISMA: {
    UNIQUE_CONSTRAINT: "A record with this value already exists.",
    FOREIGN_KEY_CONSTRAINT: "A foreign key constraint failed.",
    VALIDATION_ERROR: "Invalid data provided.",
    RUST_PANIC: "An internal error occurred. Please contact support.",
    INITIALIZATION_ERROR:
      "Database initialization error. Please try again later.",
    NOT_FOUND: "Record to delete does not exist.",
    UNKNOWN_ERROR: "An unknown error occurred. Please try again later.",
    CONNECTION_ERROR: "Failed to connect to the database.",
  },
  USER: {
    CREATED: "User has been successfully registered.",
    UPDATED: "User information has been updated.",
    DELETED: "User has been deleted.",
    EMAIL_ALREADY_EXISTS: "Email is already in use.",
    EMAIL_INVALID: "Invalid email format.",
    PHONE_ALREADY_EXISTS: "Phone number is already in use.",
    NOT_FOUND: "User not found.",
    INCORRECT_PASSWORD: "Incorrect password.",
  },
  PRODUCT: {
    CREATED: "Product has been created successfully.",
    UPDATED: "Product information has been updated.",
    DELETED: "Product has been deleted.",
    PRODUCT_ALREADY_EXISTS: "Product is already in use.",
    NOT_FOUND: "Product not found.",
  },
  AUTH: {
    NO_TOKEN_FOUND: "No token provided.",
    TOKEN_EXPIRED: "Token has expired.",
    UNAUTHORIZED: "Unauthorized access.",
    ACCESS_DENIED: "Access denied.",
  },
  DB_FAILURE: "Database failure.",
  SERVER_ERROR: "An error occurred on the server. Please try again later.",
};
