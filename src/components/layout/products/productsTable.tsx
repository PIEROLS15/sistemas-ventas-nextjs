"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import ProductDialog from "@/components/layout/products/productsDialog";
import DeleteProductDialog from "@/components/layout/products/deleteProductDialog";
import DetailsProductDialog from "@/components/layout/products/detailProductDialog";
import { Product, ProductsTableProps } from '@/types/products'
import { getStockStatus, formatPrice, formatDateOnly } from '@/utils/productUtils'

const ProductsTable = ({ products, loading, error, fetchProducts }: ProductsTableProps) => {
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
    const [viewProduct, setViewProduct] = useState<Product | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    // Función para manejar la actualización de la lista después de crear/editar un producto
    const handleSuccess = () => {
        fetchProducts();
    };

    // Calcular los productos de la página actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(products.length / productsPerPage);

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

    // Función para actualizar el estado de la tabla cuando se elimine un producto
    const handleDeleteProduct = () => {
        fetchProducts();
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
                <CardTitle>Lista de Productos</CardTitle>
                <CardDescription>Total: {products.length} productos en inventario</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px] pl-5 text-center">SKU</TableHead>
                                    <TableHead className="text-center">Nombre</TableHead>
                                    <TableHead className="text-center">Precio</TableHead>
                                    <TableHead className="text-center">Stock</TableHead>
                                    <TableHead className="text-center">Estado</TableHead>
                                    <TableHead className="hidden md:table-cell">Creado</TableHead>
                                    <TableHead className="hidden md:table-cell">Actualizado</TableHead>
                                    <TableHead className="w-[70px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentProducts.map((product) => {
                                    const stockStatus = getStockStatus(product.stock);
                                    return (
                                        <TableRow key={product.id}>
                                            <TableCell className="font-medium pl-5 text-center">{product.sku}</TableCell>
                                            <TableCell className="text-center">{product.name}</TableCell>
                                            <TableCell className="text-center">{formatPrice(product.price)}</TableCell>
                                            <TableCell className="text-center">{product.stock}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={stockStatus.variant} className="justify-center w-20">
                                                    {stockStatus.label}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">{formatDateOnly(product.createdAt)}</TableCell>
                                            <TableCell className="hidden md:table-cell">{formatDateOnly(product.updatedAt)}</TableCell>
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
                                                        <DropdownMenuItem onClick={() => setViewProduct(product)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            <span>Ver detalles</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => setEditProduct(product)}>
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            <span>Editar</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => setDeleteProduct(product)}
                                                            className="text-destructive focus:text-destructive"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            <span>Eliminar</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="w-full flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Mostrando {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)} de {products.length} productos
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

            {/* Dialogs para CRUD */}

            {editProduct && (
                <ProductDialog
                    open={!!editProduct}
                    onOpenChange={(open) => !open && setEditProduct(null)}
                    product={editProduct}
                    onSuccess={handleSuccess}
                />
            )}

            {deleteProduct && (
                <DeleteProductDialog
                    open={!!deleteProduct}
                    onOpenChange={(open) => !open && setDeleteProduct(null)}
                    product={deleteProduct}
                    onDelete={handleDeleteProduct}
                />
            )}

            {viewProduct && (
                <DetailsProductDialog
                    open={!!viewProduct}
                    onOpenChange={(open) => !open && setViewProduct(null)}
                    product={{
                        ...viewProduct,
                        createdAt: new Date(viewProduct.createdAt).toISOString(),
                        updatedAt: new Date(viewProduct.updatedAt).toISOString(),
                    }}
                />
            )}
        </Card>
    );
};

export default ProductsTable;