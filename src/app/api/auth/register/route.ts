import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: Request) {
    try {
        const { firstName, lastName, email, password } = await req.json();

        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ message: "El correo ya está registrado" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const assignedRoleId = 2;

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                roleId: assignedRoleId,
            },
        });

        // Generar un token JWT
        const token = jwt.sign(
            {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                roleId: newUser.roleId,
            },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Devolver el token en la respuesta
        return NextResponse.json({ message: "Usuario registrado con éxito", user: newUser, token }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
    }
}