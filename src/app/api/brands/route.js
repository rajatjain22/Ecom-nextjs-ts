import { NextResponse } from "next/server";
import { MESSAGES } from "@/constants/apiMessages";
import { STATUS } from "@/constants/apiStatus";
import { createBrands, getBrandsByName } from "@/lib/brands";
import { brandNameSchema } from "@/utilities/apiValidations/brands";
import prisma from "@/config/db.server";

export async function GET(request) {
  try {
    const searchParams = request.nextsearchParams.searchParams;
    const page = Math.max(1, parseInt(url.get("page")) || 1);
    const limit = Math.max(
      1,
      Math.min(parseInt(searchParams.get("limit")) || 10, 100)
    );
    const skip = (page - 1) * limit;

    const [brands, totalBrands] = await Promise.all([
      prisma.productBrand.findMany({
        skip: skip,
        take: limit,
      }),
      prisma.productBrand.count(),
    ]);

    const totalPages = Math.ceil(totalBrands / limit);

    return NextResponse.json(brands, {
      headers: {
        "x-total-item": totalBrands.toString(),
        "x-current-page": page.toString(),
        "x-total-pages": totalPages.toString(),
      },
    });
  } catch (error) {
    console.error("Brand fetch error:", error.message);
    return NextResponse.json(
      { error: MESSAGES.SERVER_ERROR },
      { status: STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function POST(request) {
  try {
    const { name } = await request.json();

    try {
      await brandNameSchema.validate(name, { abortEarly: false });
    } catch (error) {
      return NextResponse.json(
        { error: error.errors },
        { status: STATUS.BAD_REQUEST }
      );
    }
    const brandName = name.toLowerCase();

    const existingBrand = await getBrandsByName(brandName);
    if (existingBrand) {
      return NextResponse.json(
        { error: MESSAGES.BRAND.BRAND_ALREADY_EXISTS },
        { status: STATUS.CONFLICT }
      );
    }

    const brand = await createBrands(brandName);

    return NextResponse.json(brand);
  } catch (error) {
    console.error("Brand create error:", error.message);
    return NextResponse.json(
      { error: MESSAGES.SERVER_ERROR },
      { status: STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
