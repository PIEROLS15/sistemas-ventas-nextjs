import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authOptions } from "@/lib/auth";
import { getServerSession } from 'next-auth';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id, 10) },
            include: {
                role: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Usuario no encontrado' },
                { status: 404 }
            );
        }

        const roleName = user.role ? user.role.name : null;

        const { ...userWithoutRole } = user;

        return NextResponse.json(
            { ...userWithoutRole, roleName },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al obtener el usuario', details: error },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST() {
    return NextResponse.json({ error: 'Método no permitido' }, { status: 405 });
}

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.roleId !== 1) {
        return NextResponse.json(
            { error: "No autorizado. Solo los administradores pueden modificar el rol del usuario." },
            { status: 403 }
        );
    }

    const { id } = await context.params;
    const { roleId } = await request.json();

    if (!roleId) {
        return NextResponse.json(
            { error: "El campo roleId es requerido." },
            { status: 400 }
        );
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id, 10) },
            data: { roleId: parseInt(roleId, 10) },
            include: { role: true },
        });

        return NextResponse.json(
            { message: "Rol actualizado correctamente", user: updatedUser },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Error al actualizar el rol del usuario", details: error },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.email) {
            return NextResponse.json(
                { error: 'No autorizado' },
                { status: 401 }
            );
        }

        // Busca el usuario autenticado en la base de datos
        const requestingUser = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!requestingUser || requestingUser.roleId !== 1) {
            return NextResponse.json(
                { error: "No autorizado. Solo los administradores pueden modificar el estado del usuario." },
                { status: 403 }
            );
        }

        const userId = Number(id);
        const body = await request.json();
        const { isActive } = body;

        if (typeof isActive !== 'boolean') {
            return NextResponse.json(
                { error: 'El campo isActive es requerido y debe ser un booleano' },
                { status: 400 }
            );
        }

        await prisma.user.update({
            where: { id: userId },
            data: { isActive },
        });

        return NextResponse.json(
            { message: `Usuario ${isActive ? 'activado' : 'inactivado'} correctamente` },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al actualizar el estado del usuario', details: error },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}


export async function DELETE() {
    return NextResponse.json({ error: 'Método no permitido' }, { status: 405 });
}