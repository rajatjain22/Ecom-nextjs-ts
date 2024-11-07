import prisma from "@/config/db.server";
import { MESSAGES } from "@/constants/apiMessages";
import { STATUS } from "@/constants/apiStatus";
import { NextResponse, NextRequest } from "next/server";
import { getUserByEmail } from "@/lib/users";
import { validateRequestBody } from "@/utilities/validations";
import { hashPassword } from "@/lib/auth";
import { RequestBody } from "@/interfaces/api";

import { errorHandler } from "@/errors/errorHandler";

export const POST = errorHandler(createUser);

async function createUser(request: NextRequest) {
    const body: RequestBody = await request.json();

    // Validate input
    const validationError = validateRequestBody(body, [
        "name",
        "email",
        "password",
    ]);

    if (validationError) {
        return NextResponse.json(
            { error: validationError },
            { status: STATUS.BAD_REQUEST }
        );
    }

    const { email, password, name } = body;

    // Check for existing user
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return NextResponse.json(
            { error: MESSAGES.USER.EMAIL_ALREADY_EXISTS },
            { status: STATUS.CONFLICT }
        );
    }

    // Hash password
    const hashedPassword = await hashPassword(password as string, 10);

    // Create user
    await prisma.users.create({
        data: {
            name: name as string,
            email: email as string,
            password: hashedPassword,
        },
    });

    return NextResponse.json(
        { message: MESSAGES.USER.CREATED },
        { status: STATUS.CREATED }
    );

}
