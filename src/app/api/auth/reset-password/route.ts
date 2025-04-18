import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const { email, token, password } = await req.json();

        if (!email || !token || !password) {
            return NextResponse.json({ message: 'Datos incompletos' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || user.resetToken !== token) {
            return NextResponse.json({ message: 'Token inválido o usuario no encontrado' }, { status: 400 });
        }

        // Validar si el token ha expirado
        if (user.resetTokenExpiresAt && user.resetTokenExpiresAt < new Date()) {
            return NextResponse.json({ message: 'El token ha expirado' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { email },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiresAt: null,
            },
        });

        return NextResponse.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error('[RESET_PASSWORD_ERROR]', error);
        return NextResponse.json({ message: 'Error al restablecer la contraseña' }, { status: 500 });
    }
}
