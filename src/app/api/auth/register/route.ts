import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const SECRET_KEY = process.env.JWT_SECRET || "super_secreto";

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

        const token = jwt.sign({ userId: newUser.id, role: newUser.roleId }, SECRET_KEY, { expiresIn: "1h" });

        return NextResponse.json({ message: "Usuario registrado con éxito", token, user: newUser }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
    }
}
