import CustomError from "./customError";
import { MESSAGES } from "@/constants/apiMessages";
import { Prisma } from "@prisma/client";

export const functionErrorHandler = <T>(
  handler: (...args: any[]) => Promise<T>
) => {
  return async (...args: any[]): Promise<T | null> => {
    try {
      return await handler(...args);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw new Error(error.message);
      }

      if (error instanceof Error && error.name === "ValidationError") {
        throw new Error((error as any).errors || "Validation error occurred");
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            throw new Error(MESSAGES.PRISMA.UNIQUE_CONSTRAINT);
          case "P2003":
            throw new Error(MESSAGES.PRISMA.FOREIGN_KEY_CONSTRAINT);
          case "P2025":
            throw new Error(MESSAGES.PRISMA.NOT_FOUND);
          default:
            throw new Error(MESSAGES.PRISMA.UNKNOWN_ERROR);
        }
      }

      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new Error(MESSAGES.PRISMA.VALIDATION_ERROR);
      }

      if (error instanceof Prisma.PrismaClientInitializationError) {
        throw new Error(MESSAGES.PRISMA.INITIALIZATION_ERROR);
      }

      if (error instanceof Prisma.PrismaClientRustPanicError) {
        throw new Error(MESSAGES.PRISMA.RUST_PANIC);
      }

      throw new Error(MESSAGES.SERVER_ERROR);
    }
  };
};
