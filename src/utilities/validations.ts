import { MESSAGES } from "@/constants/apiMessages";
import { RequestBody } from "@/interfaces/api";

export const validateEmail = (email: string): boolean => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(String(email).toLowerCase());
};

export const validateRequestBody = (
  body: RequestBody,
  required: string[]
): string => {
  const missingFields: string[] = [];

  // Check if body is empty
  if (!body || Object.keys(body).length === 0) {
    return MESSAGES.GENERAL.INVALID_REQUEST_BODY;
  }

  // Check for required fields
  for (const field of required) {
    if (!body[field]) {
      missingFields.push(field.replace(/_/g, " "));
    }
  }

  // If there are any missing fields, return them
  if (missingFields.length > 0) {
    return `Missing - ${missingFields.join(", ")}`;
  }

  // Check for valid email format if email is required
  if (required.includes("email") && body.email && !validateEmail(body.email)) {
    return MESSAGES.USER.EMAIL_INVALID;
  }

  return ""; // No errors found
};
