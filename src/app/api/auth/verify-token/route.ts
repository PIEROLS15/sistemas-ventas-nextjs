import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const { token } = await req.json();

    if (!token) {
        return NextResponse.json({ message: "El token es requerido" }, { status: 400 });
    }

    try {
        // Buscar usuario con el resetToken y ver que no haya expirado
        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiresAt: {
                    gte: new Date(),
                },
            },
            select: { email: true },
        });

        if (!user) {
            return NextResponse.json({ message: "Token inválido o ha expirado" }, { status: 404 });
        }

        return NextResponse.json({ message: "Token válido", email: user.email });
    } catch (error) {
        console.error("Error al verificar el token:", error);
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
    }
}
