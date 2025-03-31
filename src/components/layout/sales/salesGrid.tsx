"use client";

import { useState } from "react";
import { SaleCard } from "@/components/layout/sales/salesCard";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SalesGridProps } from '@/types/sales';
import PaginationComponent from "@/components/layout/pagination";

const SalesGrid = ({ sales, loading, error, fetchSales }: SalesGridProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const salesPerPage = 10;

    // Calcular los productos de la página actual
    const indexOfLastSale = currentPage * salesPerPage;
    const indexOfFirstSale = indexOfLastSale - salesPerPage;
    const currentSales = sales.slice(indexOfFirstSale, indexOfLastSale);

    // Función para cambiar de página
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    if (loading) {
        return <div>Cargando productos...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Card className="mt-6">
            <CardHeader className="pb-1">
                <CardTitle>Lista de Ventas</CardTitle>
                <CardDescription>Total: {sales.length} productos en inventario</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {currentSales.map((sales) => (
                        <SaleCard
                            key={sales.id}
                            sales={{
                                ...sales,
                                createdAt: new Date(sales.createdAt).toISOString(),
                                updatedAt: new Date(sales.updatedAt).toISOString(),
                            }}
                            fetchSales={fetchSales}
                        />
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <div className="w-full flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Mostrando {indexOfFirstSale + 1}-{Math.min(indexOfLastSale, sales.length)} de {sales.length} productos
                    </p>
                    <PaginationComponent
                        totalItems={sales.length}
                        itemsPerPage={salesPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </CardFooter>
        </Card>
    );
};

export default SalesGrid;