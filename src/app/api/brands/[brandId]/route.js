import { MESSAGES } from "@/constants/apiMessages";
import { STATUS } from "@/constants/apiStatus";
import { getBrandsById } from "@/lib/brands";
import { brandIdSchema } from "@/utilities/apiValidations/brands";
import { NextResponse } from "next/server";

export async function GET(request, { params: { brandId } }) {
  try {
    // Validate the request body
    try {
      await brandIdSchema.validate(brandId, { abortEarly: false });
    } catch (error) {
      return NextResponse.json(
        { error: error.errors },
        { status: STATUS.BAD_REQUEST }
      );
    }

    const brand = await getBrandsById(brandId);

    // Check if the brand exists
    if (!brand) {
      return NextResponse.json(
        { error: MESSAGES.BRAND.NOT_FOUND },
        { status: STATUS.NOT_FOUND }
      );
    }

    return NextResponse.json(brand);
  } catch (error) {
    console.error("Product create error:", error.message);
    return NextResponse.json(
      { error: MESSAGES.SERVER_ERROR },
      { status: STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
