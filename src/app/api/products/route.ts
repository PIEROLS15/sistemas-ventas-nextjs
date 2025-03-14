import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const products = await prisma.product.findMany();
        return NextResponse.json(products, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener los productos', details: error }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { sku, name, price, stock } = body;

        if (!sku || !name || price === undefined || stock === undefined) {
            return NextResponse.json(
                { error: 'Faltan campos requeridos' },
                { status: 400 }
            );
        }

        const newProduct = await prisma.product.create({
            data: {
                sku,
                name,
                price,
                stock,
            },
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al crear el producto', details: error },
            { status: 500 }
        );
    }
}

export async function PUT() {
    return NextResponse.json({ error: 'Método no permitido' }, { status: 405 });
}

export async function DELETE() {
    return NextResponse.json({ error: 'Método no permitido' }, { status: 405 });
}