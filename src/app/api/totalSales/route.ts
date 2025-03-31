import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


export async function GET() {
    try {
        const [totalSalesCount, totalIncome] = await Promise.all([
            prisma.sale.count(),
            prisma.sale.aggregate({
                _sum: {
                    totalAmount: true,
                },
            }),
        ]);

        return NextResponse.json(
            {
                totalSalesCount,
                totalIncome: totalIncome._sum.totalAmount || 0,
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error calculating sales summary:', error);
            return NextResponse.json(
                { error: 'Error al obtener el resumen de ventas', details: error.message },
                { status: 500 }
            );
        } else {
            console.error('Unknown error:', error);
            return NextResponse.json(
                { error: 'Error desconocido al obtener el resumen de ventas' },
                { status: 500 }
            );
        }
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