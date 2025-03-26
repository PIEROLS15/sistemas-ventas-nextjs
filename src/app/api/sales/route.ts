import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
    try {
        const sales = await prisma.sale.findMany({
            select: {
                saleCode: true,
                id: true,
                customerName: true,
                identification: {
                    select: {
                        type: true,
                    },
                },
                identificationNumber: true,
                email: true,
                totalAmount: true,
                seller: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
                saleDate: true,
            },
        });

        return new Response(JSON.stringify(sales), { status: 200 });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
    }
}
export async function POST(req: NextRequest) {
    try {
        const { cliente_nombre, identificacion_id, numero_identificacion, cliente_correo, sellerId, products } = await req.json();

        const productIds = products.map((p: { id: number }) => p.id);
        const productData = await prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, price: true, stock: true },
        });

        const unitPrices: { [key: number]: number } = {};
        productData.forEach((p) => (unitPrices[p.id] = Number(p.price)));

        //Calcular el total de la venta
        const saleDetails = products.map(({ id, cantidad }: { id: number; cantidad: number }) => ({
            productId: id,
            quantity: cantidad,
            unitPrice: unitPrices[id],
            subtotal: unitPrices[id] * cantidad,
        }));

        const totalAmount = saleDetails.reduce((sum: number, item: { subtotal: number }) => sum + item.subtotal, 0);


        // Verificar stock antes de registrar la venta
        for (const { id, cantidad } of products) {
            const product = productData.find((p) => p.id === id);
            if (!product || product.stock < cantidad) {
                return new Response(JSON.stringify({ error: `Stock insuficiente para el producto ID ${id}` }), { status: 400 });
            }
        }

        const sale = await prisma.sale.create({
            data: {
                saleCode: uuidv4(),
                customerName: cliente_nombre,
                identification: { connect: { id: identificacion_id } },
                identificationNumber: numero_identificacion,
                email: cliente_correo,
                totalAmount,
                saleDate: new Date(),
                saleTime: new Date().toISOString().split("T")[1],
                seller: { connect: { id: sellerId } },
                SaleDetail: { create: saleDetails },
            },
            include: { SaleDetail: true },
        });

        for (const { id, cantidad } of products) {
            await prisma.product.update({
                where: { id },
                data: { stock: { decrement: cantidad } },
            });
        }

        return new Response(JSON.stringify(sale), { status: 201 });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
    }

}

export async function PUT() {
    return NextResponse.json(
        { error: 'Método no permitido' },
        { status: 405 }
    );
}

export async function DELETE() {
    return NextResponse.json(
        { error: 'Método no permitido' },
        { status: 405 }
    );
}