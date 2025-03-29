import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { SaleStatus } from '@prisma/client';

interface SaleFilters {
    createdAt?: { gte: Date; lte: Date };
    status?: SaleStatus;
}

export async function POST(req: NextRequest) {
    try {
        const { startDate, endDate, status }: { startDate?: string; endDate?: string; status?: string } = await req.json();

        const filters: SaleFilters = {};

        if (startDate && endDate) {
            filters.createdAt = {
                gte: new Date(startDate),
                lte: new Date(endDate),
            };
        }

        if (status) {
            filters.status = status as SaleStatus;
        }

        const sales = await prisma.sale.findMany({
            where: filters,
            select: {
                id: true,
                saleCode: true,
                customerName: true,
                identification: {
                    select: { type: true },
                },
                identificationNumber: true,
                email: true,
                totalAmount: true,
                status: true,
                createdAt: true,
                SaleDetail: {
                    select: { quantity: true }
                }
            }
        });

        // Procesamos las ventas para calcular total de productos
        const salesWithTotalProducts = sales.map(({ SaleDetail, ...sale }) => ({
            ...sale,
            totalProducts: SaleDetail.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0)
        }));

        return new NextResponse(JSON.stringify(salesWithTotalProducts), { status: 200 });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return new NextResponse(JSON.stringify({ error: errorMessage }), { status: 500 });
    }
}
