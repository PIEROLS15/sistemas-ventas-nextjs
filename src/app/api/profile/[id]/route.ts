import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const { firstName, lastName, currentPassword, newPassword } = await request.json();

    // Obtener el usuario actual para validar la contraseña
    const user = await prisma.user.findUnique({
        where: { id: parseInt(id, 10) }
    });

    if (!user) {
        return NextResponse.json(
            { error: "Usuario no encontrado." },
            { status: 404 }
        );
    }

    // Verificar la contraseña actual antes de actualizar
    if (currentPassword && newPassword) {
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) {
            return NextResponse.json(
                { error: "La contraseña actual es incorrecta." },
                { status: 401 }
            );
        }
    }

    // Definir los datos a actualizar
    const data: Partial<{ firstName: string; lastName: string; password: string }> = {};
    if (firstName) data.firstName = firstName;
    if (lastName) data.lastName = lastName;
    if (newPassword) data.password = await bcrypt.hash(newPassword, 10);

    // Si no hay datos para actualizar, devolver error
    if (Object.keys(data).length === 0) {
        return NextResponse.json(
            { error: "Debe proporcionar al menos un campo para actualizar." },
            { status: 400 }
        );
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id, 10) },
            data,
        });

        return NextResponse.json(
            { message: "Usuario actualizado correctamente", user: updatedUser },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Error al actualizar el usuario", details: error },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
