"use client";

import { useState, useEffect } from "react";
import { MoreHorizontal, Pencil, Trash2, Eye, ArrowUp, ArrowDown } from "lucide-react";
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

// Función para determinar el estado del stock
const getStockStatus = (stock: number) => {
    if (stock <= 5) return { label: "Crítico", variant: "destructive" as const };
    if (stock <= 15) return { label: "Bajo", variant: "outline" as const };
    if (stock <= 30) return { label: "Medio", variant: "secondary" as const };
    return { label: "Óptimo", variant: "default" as const };
};

// Función para formatear precio
const formatPrice = (price: number | string) => {
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    return `S/ ${numericPrice.toFixed(2)}`;
};

// Función para formatear fecha
const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(new Date(date));
};

interface Product {
    id: number;
    sku: string;
    name: string;
    price: number;
    stock: number;
    createdAt: string;
    updatedAt: string;
}

const ProductsTable = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
    const [viewProduct, setViewProduct] = useState<Product | null>(null);
    const [sortColumn, setSortColumn] = useState<keyof Product | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    // Obtener los productos desde la API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                if (!response.ok) {
                    throw new Error("Error al obtener los productos");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : "Error desconocido");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Función para manejar el ordenamiento
    const handleSort = (column: keyof Product) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    // Ordenar los productos
    const sortedProducts = [...products].sort((a, b) => {
        if (!sortColumn) return 0;

        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        // Ordenar por SKU o nombre (cadena)
        if (sortColumn === "sku" || sortColumn === "name") {
            if (typeof valueA === "string" && typeof valueB === "string") {
                return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
            }
        }

        // Ordenar por precio o stock (número)
        if (sortColumn === "price" || sortColumn === "stock") {
            if (typeof valueA === "number" && typeof valueB === "number") {
                return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
            }
        }

        // Ordenar por fecha (cadena)
        if (sortColumn === "createdAt" || sortColumn === "updatedAt") {
            if (typeof valueA === "string" && typeof valueB === "string") {
                const dateA = new Date(valueA).getTime();
                const dateB = new Date(valueB).getTime();
                return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
            }
        }

        return 0;
    });

    // Calcular los productos de la página actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

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
                <CardTitle>Lista de Productos</CardTitle>
                <CardDescription>Total: {products.length} productos en inventario</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead
                                        className="w-[100px] pl-5 text-center cursor-pointer"
                                        onClick={() => handleSort("sku")}
                                    >
                                        <div className="flex items-center justify-center">
                                            <span>SKU</span>
                                            {sortColumn === "sku" && (
                                                sortDirection === "asc" ? (
                                                    <ArrowUp className="h-4 w-4 ml-1" />
                                                ) : (
                                                    <ArrowDown className="h-4 w-4 ml-1" />
                                                )
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        className="text-center cursor-pointer"
                                        onClick={() => handleSort("name")}
                                    >
                                        <div className="flex items-center justify-center">
                                            <span>Nombre</span>
                                            {sortColumn === "name" && (
                                                sortDirection === "asc" ? (
                                                    <ArrowUp className="h-4 w-4 ml-1" />
                                                ) : (
                                                    <ArrowDown className="h-4 w-4 ml-1" />
                                                )
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        className="text-center cursor-pointer"
                                        onClick={() => handleSort("price")}
                                    >
                                        <div className="flex items-center justify-center">
                                            <span>Precio</span>
                                            {sortColumn === "price" && (
                                                sortDirection === "asc" ? (
                                                    <ArrowUp className="h-4 w-4 ml-1" />
                                                ) : (
                                                    <ArrowDown className="h-4 w-4 ml-1" />
                                                )
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        className="text-center cursor-pointer"
                                        onClick={() => handleSort("stock")}
                                    >
                                        <div className="flex items-center justify-center">
                                            <span>Stock</span>
                                            {sortColumn === "stock" && (
                                                sortDirection === "asc" ? (
                                                    <ArrowUp className="h-4 w-4 ml-1" />
                                                ) : (
                                                    <ArrowDown className="h-4 w-4 ml-1" />
                                                )
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        className="text-center cursor-pointer"
                                        onClick={() => handleSort("stock")}
                                    >
                                        <div className="flex items-center justify-center">
                                            <span>Estado</span>
                                            {sortColumn === "stock" && (
                                                sortDirection === "asc" ? (
                                                    <ArrowUp className="h-4 w-4 ml-1" />
                                                ) : (
                                                    <ArrowDown className="h-4 w-4 ml-1" />
                                                )
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        className="hidden md:table-cell cursor-pointer"
                                        onClick={() => handleSort("createdAt")}
                                    >
                                        <div className="flex items-center justify-center">
                                            <span>Creado</span>
                                            {sortColumn === "createdAt" && (
                                                sortDirection === "asc" ? (
                                                    <ArrowUp className="h-4 w-4 ml-1" />
                                                ) : (
                                                    <ArrowDown className="h-4 w-4 ml-1" />
                                                )
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        className="hidden md:table-cell cursor-pointer"
                                        onClick={() => handleSort("updatedAt")}
                                    >
                                        <div className="flex items-center justify-center">
                                            <span>Actualizado</span>
                                            {sortColumn === "updatedAt" && (
                                                sortDirection === "asc" ? (
                                                    <ArrowUp className="h-4 w-4 ml-1" />
                                                ) : (
                                                    <ArrowDown className="h-4 w-4 ml-1" />
                                                )
                                            )}
                                        </div>
                                    </TableHead>
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
                                            <TableCell className="hidden md:table-cell">{formatDate(product.createdAt)}</TableCell>
                                            <TableCell className="hidden md:table-cell">{formatDate(product.updatedAt)}</TableCell>
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
                        Mostrando {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sortedProducts.length)} de {sortedProducts.length} productos
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

            {/* Diálogos para CRUD */}
            {editProduct && (
                <ProductDialog
                    open={!!editProduct}
                    onOpenChange={(open) => !open && setEditProduct(null)}
                    product={editProduct}
                />
            )}

            {deleteProduct && (
                <DeleteProductDialog
                    open={!!deleteProduct}
                    onOpenChange={(open) => !open && setDeleteProduct(null)}
                    product={deleteProduct}
                />
            )}

            {viewProduct && (
                <DetailsProductDialog
                    open={!!viewProduct}
                    onOpenChange={(open) => !open && setViewProduct(null)}
                    product={{
                        ...viewProduct,
                        createdAt: new Date(viewProduct.createdAt),
                        updatedAt: new Date(viewProduct.updatedAt),
                    }}
                />
            )}
        </Card>
    );
};

export default ProductsTable;