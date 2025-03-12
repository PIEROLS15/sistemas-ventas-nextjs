import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            firstName: string;
            lastName: string;
            roleId: number;
            role: string;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        firstName: string;
        lastName: string;
        roleId: number;
        role: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        firstName: string;
        lastName: string;
        roleId: number;
        role: string;
    }
}

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email y contraseña son obligatorios");
                }

                const userFound = await prisma.user.findUnique({
                    where: { email: credentials.email },
                    include: { role: true }
                });

                if (!userFound) {
                    throw new Error("Usuario no encontrado");
                }

                const matchPassword = await bcrypt.compare(credentials.password, userFound.password);
                if (!matchPassword) {
                    throw new Error("Contraseña incorrecta");
                }

                return {
                    id: userFound.id.toString(),
                    firstName: userFound.firstName,
                    lastName: userFound.lastName,
                    email: userFound.email,
                    roleId: userFound.roleId,
                    role: userFound.role.name
                };
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
                session.user.roleId = token.roleId;
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.roleId = user.roleId;
                token.role = user.role;
            }
            return token;
        }
    },
    session: {
        strategy: "jwt",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
