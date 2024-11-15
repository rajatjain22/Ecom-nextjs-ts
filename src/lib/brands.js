import prisma from "@/config/db.server";
import { STATUS } from "@/constants/apiStatus";
import CustomError from "@/errors/customError";

export const createBrands = async (name) => {
  if (!name) {
    throw new CustomError("name is required", STATUS.BAD_REQUEST);
  }
  try {
    return await prisma.productBrand.create({
      data: { name },
    });
  } catch (error) {
    console.error("Error creating brand:", error);
    throw new CustomError("Failed to created brand", STATUS.BAD_REQUEST);
  }
};

export const getBrandsByName = async (name) => {
  if (!name) {
    throw new CustomError("name is required", STATUS.BAD_REQUEST);
  }

  try {
    return await prisma.productBrand.findUnique({
      where: { name },
      ...options,
    });
  } catch (error) {
    console.error("Error fetching brand by name:", error);
    throw new CustomError("Failed to retrieve brand data", STATUS.BAD_REQUEST);
  }
};

export const getBrandsById = async (brandId, options = {}) => {
  if (!brandId) {
    throw new CustomError("brand Id is required", STATUS.BAD_REQUEST);
  }

  try {
    return await prisma.productBrand.findUnique({
      where: { id: brandId },
      ...options,
    });
  } catch (error) {
    console.error("Error fetching brand by id:", error);
    throw new CustomError("Failed to retrieve brand data", STATUS.BAD_REQUEST);
  }
};
