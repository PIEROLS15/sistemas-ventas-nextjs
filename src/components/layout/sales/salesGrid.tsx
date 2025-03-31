"use client";

import { useState } from "react";
import { SaleCard } from "@/components/layout/sales/salesCard";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SalesGridProps } from '@/types/sales';

const SalesGrid = ({ sales, loading, error, fetchSales }: SalesGridProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const salesPerPage = 10;

    // Calcular los productos de la página actual
    const indexOfLastSale = currentPage * salesPerPage;
    const indexOfFirstSale = indexOfLastSale - salesPerPage;
    const currentSales = sales.slice(indexOfFirstSale, indexOfLastSale);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(sales.length / salesPerPage);

    // Función para cambiar de página
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Función para ir a la página anterior
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Función para ir a la página siguiente
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
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
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={handlePreviousPage}
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <PaginationItem key={index + 1}>
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={handleNextPage}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </CardFooter>
        </Card>
    );
};

export default SalesGrid;