import { NextRequest, NextResponse } from "next/server";

export interface Context {
    user?: { id: string };
}

export interface ValidationError {
    name: string;
    errors: { [key: string]: string[] };
}

export type HandlerFunction = (request: NextRequest, context: Context) => Promise<NextResponse>;