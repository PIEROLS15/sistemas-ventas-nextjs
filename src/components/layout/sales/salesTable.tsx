"use client"

import { useState } from "react"
import { MoreHorizontal, Eye, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import DetailSaleDialog from "@/components/layout/sales/detailSaleDialog"
import SaleStatusDialog from "@/components/layout/sales/saleStatusDialog"
import { formatPrice, formatDateOnly, getStatusBadge } from '@/utils/productUtils'
import { Sale, SalesTableProps } from '@/types/sales'


const SalesTable = ({ sales, loading, error, fetchSales }: SalesTableProps) => {
    const [viewSale, setViewSale] = useState<Sale | null>(null)
    const [statusSale, setStatusSale] = useState<(typeof sales)[0] | null>(null)
    const [currentPage, setCurrentPage] = useState(1);
    const salesPerPage = 10;

    const handleSuccess = () => {
        fetchSales();
    };

    // Calcular las ventas de la página actual
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
        return <div>Cargando ventas...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <Card className="mt-6">
            <CardHeader className="pb-1">
                <CardTitle>Lista de Ventas</CardTitle>
                <CardDescription>Total: {sales.length} ventas registradas</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px] pl-5 text-center">Código</TableHead>
                                    <TableHead className="text-center">Cliente</TableHead>
                                    <TableHead className="text-center">Correo Cliente</TableHead>
                                    <TableHead className="text-center">Vendedor</TableHead>
                                    <TableHead className="text-center">Total</TableHead>
                                    <TableHead className="text-center">Estado</TableHead>
                                    <TableHead className="hidden md:table-cell">Fecha</TableHead>
                                    <TableHead className="w-[70px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentSales.map((sale) => {
                                    const statusBadge = getStatusBadge(sale.status)

                                    return (
                                        <TableRow key={sale.id}>
                                            <TableCell className="font-medium pl-5 text-center">{sale.saleCode}</TableCell>
                                            <TableCell className="text-center">{sale.customerName}</TableCell>
                                            <TableCell className="text-center">{sale.email}</TableCell>
                                            <TableCell className="text-center">{`${sale.seller.firstName} ${sale.seller.lastName}`}</TableCell>
                                            <TableCell className="text-center">{formatPrice(sale.totalAmount)}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={statusBadge.variant} className="justify-center w-24">
                                                    {statusBadge.label}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">{formatDateOnly(sale.createdAt)}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Abrir menú</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => setViewSale(sale)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            <span>Ver detalles</span>
                                                        </DropdownMenuItem>
                                                        {sale.status !== "Completed" && (
                                                            <DropdownMenuItem onClick={() => setStatusSale({ ...sale, status: "Completed" })}>
                                                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                                                <span>Marcar como completada</span>
                                                            </DropdownMenuItem>
                                                        )}
                                                        {sale.status !== "Canceled" && (
                                                            <DropdownMenuItem onClick={() => setStatusSale({ ...sale, status: "Canceled" })}>
                                                                <XCircle className="mr-2 h-4 w-4 text-destructive" />
                                                                <span>Marcar como cancelada</span>
                                                            </DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
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

            {/* Diálogos para ver detalles y cambiar estado */}
            {viewSale && (
                <DetailSaleDialog
                    open={!!viewSale}
                    onOpenChange={(open) => !open && setViewSale(null)}
                    sale={viewSale}
                />
            )}

            {statusSale && (
                <SaleStatusDialog
                    open={!!statusSale}
                    onOpenChange={(open) => !open && setStatusSale(null)}
                    sale={statusSale}
                    onSuccess={handleSuccess}
                />
            )}
        </Card>
    )
}

export default SalesTable;