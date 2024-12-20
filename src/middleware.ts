import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import {
    DEFAULT_REDIRECT,
    DEFAULT_ADMIN_REDIRECT,
    PUBLIC_ROUTES,
    LOGIN,
    PUBLIC_API_ROUTES,
    ROLE_ADMIN
} from "@/lib/routes";
import { apiErrorHandler } from "./errors/apiErrorHandler";
import { SessionUser } from "./interfaces/auth";

export const middleware = apiErrorHandler(createMiddleware);

interface Token{
    user?: SessionUser
}

// Define the middleware function
export async function createMiddleware(request: NextRequest): Promise<NextResponse> {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    }) as Token;

    const userRole = token?.user?.role;
    const { pathname } = request.nextUrl;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isPublicApiRoute = PUBLIC_API_ROUTES.some((route) => pathname.startsWith(route));
    const isApiRoute = pathname.startsWith("/api");

    // Handle API routes
    if (isApiRoute) {
        if (!token && !isPublicApiRoute) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.next();
    }

    // Redirect logic
    if (token) {
        if (isPublicRoute) {
            return NextResponse.redirect(new URL(DEFAULT_REDIRECT, request.url));
        }
        
        if (userRole === ROLE_ADMIN) {
            if (!pathname.startsWith("/admin")) {
                return NextResponse.redirect(new URL(DEFAULT_ADMIN_REDIRECT, request.url));
            }
        } else if (pathname.startsWith("/admin/")) {
            return NextResponse.redirect(new URL(DEFAULT_REDIRECT, request.url));
        }
    } else if (!isPublicRoute) {
        return NextResponse.redirect(new URL(LOGIN, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login", "/signup", "/dashboard", "/admin/:path*", "/api/:path*"],
};
