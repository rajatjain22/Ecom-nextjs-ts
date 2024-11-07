import prisma from "@/config/db.server";
import { MESSAGES } from "@/constants/apiMessages";
import { comparePassword } from "@/lib/auth";

import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

import { getUserByEmail } from "@/lib/users";
import { validateRequestBody } from "@/utilities/validations";

import { SessionUser } from "@/interfaces/auth";

const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt", maxAge: 24 * 60 * 60 }, // 1 day
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 60 * 60 * 24 * 30, // 30 days
    },
    // pages: {
    //     signIn: "/login",
    //     signOut: "/login",
    // },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error(MESSAGES.AUTH.UNAUTHORIZED);
                }

                try {
                    const errorMessage = validateRequestBody(credentials, [
                        "email",
                        "password",
                    ]);

                    if (errorMessage) throw new Error(errorMessage);

                    const { email, password } = credentials;

                    const user = await getUserByEmail(email, {
                        select: { id: true, password: true, role: true },
                    });

                    if (!user) throw new Error(MESSAGES.USER.NOT_FOUND);


                    const isPassword = await comparePassword(password, user.password);
                    if (!isPassword) throw new Error(MESSAGES.USER.INCORRECT_PASSWORD);

                    return { id: user.id, email, role: user.role };
                } catch (error: unknown) {
                    if (error instanceof Error) throw new Error(error.message);
                    throw new Error(MESSAGES.AUTH.UNAUTHORIZED);
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ account }) {
            if (account && account.provider === "credentials") {
                return true;
            }
            return false;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user as SessionUser;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user as SessionUser;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
