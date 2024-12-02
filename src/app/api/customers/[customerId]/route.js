import prisma from "@/config/db.server";
import { MESSAGES } from "@/constants/apiMessages";
import { STATUS } from "@/constants/apiStatus";
import { errorHandler } from "@/errors/errorHandler";
import { NextResponse } from "next/server";
import { customerIdValidationSchema } from "@/utilities/validations/customer";
import { getCustomerById } from "@/lib/customer";

export const GET = errorHandler(getCustomerByIdHandler);

async function getCustomerByIdHandler(request, { params: { customerId } }) {
  await customerIdValidationSchema.validate(customerId, { abortEarly: false });

  const customer = await getCustomerById(customerId);

  // Check if the customer exists
  if (!customer) {
    return NextResponse.json(
      { error: MESSAGES.PRODUCT.NOT_FOUND },
      { status: STATUS.NOT_FOUND }
    );
  }

  return NextResponse.json(product);
}
