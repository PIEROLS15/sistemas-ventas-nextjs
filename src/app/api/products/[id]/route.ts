import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!product) {
            return NextResponse.json(
                { error: 'Producto no encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al obtener el producto', details: error },
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
    const { id } = await context.params;

    try {
        const productId = Number(id);
        const body = await request.json();
        const { sku, name, price, stock } = body;

        if (!sku || !name || price === undefined || stock === undefined) {
            return NextResponse.json(
                { error: 'Faltan campos requeridos' },
                { status: 400 }
            );
        }

        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: {
                sku,
                name,
                price,
                stock,
            },
        });

        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al actualizar el producto', details: error },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    try {
        const productId = Number(id);

        await prisma.product.delete({
            where: { id: productId },
        });

        return NextResponse.json(
            { message: 'Producto eliminado correctamente' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al eliminar el producto', details: error },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
