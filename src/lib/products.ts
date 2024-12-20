import prisma from "@/config/db.server";
import { STATUS } from "@/constants/apiStatus";
import CustomError from "@/errors/customError";
import { createHandle } from "@/helpers/stringHelpers";

type Variant = {
  name: string;
  values: string[];
};

export const convertDecimalToNumber = (decimalValue: any): number | null => {
  console.log(decimalValue)
  return decimalValue ? decimalValue.toNumber() : null;
};

// Generate a unique handle
export const generateUniqueHandle = async (title: string): Promise<string> => {
  if (!title) {
    throw new CustomError("Title is required", STATUS.BAD_REQUEST);
  }
  if (typeof title !== "string") {
    throw new CustomError("Title should be a string", STATUS.BAD_REQUEST);
  }

  const baseHandle = createHandle(title);

  try {
    const existingHandles = await prisma.product.findMany({
      where: {
        handle: {
          startsWith: baseHandle,
        },
      },
      select: { handle: true },
    });

    if (!existingHandles.length) {
      return baseHandle;
    }

    const handleSet = new Set(existingHandles.map((product) => product.handle));
    let uniqueHandle = baseHandle;
    let counter = 1;

    while (handleSet.has(uniqueHandle)) {
      uniqueHandle = `${baseHandle}-${counter}`;
      counter++;
    }

    return uniqueHandle;
  } catch (error) {
    console.error("Error generating unique handle:", error);
    throw new CustomError(
      "Failed to generate a unique handle",
      STATUS.BAD_REQUEST
    );
  }
};

// Function to create combinations of product variants
export const createCombinations = (
  variants: Variant[],
  productDetails: Record<string, any>
): {
  title: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
}[] => {
  const result: {
    title: string;
    option1: string | null;
    option2: string | null;
    option3: string | null;
  }[] = [];

  const generateCombination = (
    current: Record<string, string>,
    index: number
  ): void => {
    if (index === variants.length) {
      const title = Object.values(current).filter(Boolean).join(" / ");
      result.push({
        ...productDetails,
        title,
        option1: current.option1 || null,
        option2: current.option2 || null,
        option3: current.option3 || null,
      });
      return;
    }

    for (const value of variants[index].values) {
      generateCombination(
        {
          ...current,
          [`option${index + 1}`]:
            value.charAt(0).toUpperCase() + value.slice(1),
        },
        index + 1
      );
    }
  };

  generateCombination({}, 0);
  return result;
};
