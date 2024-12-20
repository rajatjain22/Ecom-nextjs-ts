import { NextResponse } from "next/server";
import prisma from "@/config/db.server";
import { STATUS } from "@/constants/apiStatus";
import { apiErrorHandler } from "@/errors/apiErrorHandler";

export const POST = apiErrorHandler(createProductVariantHandler);

async function createProductVariantHandler(request, { params: { productId } }) {
  const body = await request.json();

  const optionValues = await prisma.productOption.findMany({
    where: { product_id: productId },
    include: {
      values: true,
    },
  });

  return NextResponse.json(optionValues, {
    status: STATUS.CREATED,
  });
}
