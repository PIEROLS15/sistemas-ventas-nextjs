import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const saleId = parseInt(id, 10);

    if (isNaN(saleId)) {
        return NextResponse.json(
            { error: "ID de venta no válido" },
            { status: 400 }
        );
    }

    try {
        const sale = await prisma.sale.findUnique({
            where: { id: saleId },
            select: {
                saleCode: true,
                customerName: true,
                identification: {
                    select: {
                        type: true,
                    },
                },
                identificationNumber: true,
                email: true,
                totalAmount: true,
                createdAt: true,
                updatedAt: true,
                status: true,
                seller: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                },
                SaleDetail: {
                    select: {
                        product: {
                            select: {
                                name: true,
                            }
                        },
                        quantity: true,
                        unitPrice: true,
                        subtotal: true
                    }
                }
            }
        });

        if (!sale) {
            return NextResponse.json(
                { error: "Venta no encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json(sale, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error al obtener la venta", details: error },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const saleId = parseInt(id, 10);

        if (isNaN(saleId)) {
            return NextResponse.json(
                { error: "ID de venta no válido" },
                { status: 400 }
            );
        }

        const { status } = await request.json();

        if (!["Pending", "Completed", "Canceled"].includes(status)) {
            return NextResponse.json(
                { error: "Estado de venta no válido" },
                { status: 400 }
            );
        }

        const updatedSale = await prisma.sale.update({
            where: { id: saleId },
            data: { status },
        });

        return NextResponse.json(updatedSale, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { error: "Error al actualizar el estado de la venta", details: error },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}


export async function POST() {
    return NextResponse.json(
        { error: 'Método no permitido' },
        { status: 405 }
    );
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
