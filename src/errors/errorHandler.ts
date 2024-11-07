import { NextResponse, NextRequest } from "next/server";
import CustomError from "./customError";
import { STATUS } from "@/constants/apiStatus";
import { MESSAGES } from "@/constants/apiMessages";
import { Prisma } from "@prisma/client";
import { Context, HandlerFunction, ValidationError } from "./interface";

// Custom error handler function
export const errorHandler = (handler: HandlerFunction) => {
  return async (request: NextRequest, context: Context): Promise<NextResponse> => {
    try {
      // Execute the actual handler function
      return await handler(request, context);
    } catch (error: unknown) {
      // Log the API route, method, and error stack trace
      console.error(
        `API Error => \n   Route: ${request.method} ${request.url}\n   Message: ${error instanceof Error ? error.message : error}\n   Stack: ${error instanceof Error ? error.stack : 'No stack available'}`
      );

      // Custom error handling for CustomError
      if (error instanceof CustomError) {
        return NextResponse.json({ error: error.message }, { status: error.status });
      }

      // Validation error handling
      if (typeof error === 'object' && error !== null && 'name' in error) {
        const validationError = error as ValidationError;

        if (validationError.name === "ValidationError") {
          return NextResponse.json({ error: validationError.errors }, { status: STATUS.BAD_REQUEST });
        }
      }

      // Handle Prisma errors
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          // Unique constraint violation
          return NextResponse.json({ error: MESSAGES.PRISMA.UNIQUE_CONSTRAINT }, { status: STATUS.CONFLICT });
        }
        if (error.code === "P2003") {
          // Foreign key constraint violation
          return NextResponse.json({ error: MESSAGES.PRISMA.FOREIGN_KEY_CONSTRAINT }, { status: STATUS.BAD_REQUEST });
        }
        if (error.code === "P2025") {
          // Record not found
          return NextResponse.json({ error: MESSAGES.PRISMA.NOT_FOUND }, { status: STATUS.BAD_REQUEST });
        }
      }

      // Handle Prisma validation and initialization errors
      if (error instanceof Prisma.PrismaClientValidationError) {
        return NextResponse.json({ error: MESSAGES.PRISMA.VALIDATION_ERROR }, { status: STATUS.BAD_REQUEST });
      }
      if (error instanceof Prisma.PrismaClientInitializationError) {
        return NextResponse.json({ error: MESSAGES.PRISMA.INITIALIZATION_ERROR }, { status: STATUS.SERVICE_UNAVAILABLE });
      }
      if (error instanceof Prisma.PrismaClientRustPanicError) {
        return NextResponse.json({ error: MESSAGES.PRISMA.RUST_PANIC }, { status: STATUS.INTERNAL_SERVER_ERROR });
      }

      // Handle unknown errors
      return NextResponse.json({ error: MESSAGES.SERVER_ERROR }, { status: STATUS.INTERNAL_SERVER_ERROR });
    }
  };
};
