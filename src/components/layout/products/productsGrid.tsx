"use client"

import { ProductCard } from "@/components/layout/products/productsCard"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// Datos de ejemplo - Esto se reemplazaría con datos reales de tu API
const products = [
    {
        id: 1,
        sku: "PRD-001",
        name: "Smartphone X",
        price: 899.99,
        stock: 25,
        createdAt: new Date("2023-01-15"),
        updatedAt: new Date("2023-03-20"),
    },
    {
        id: 2,
        sku: "PRD-002",
        name: "Laptop Pro",
        price: 1299.99,
        stock: 12,
        createdAt: new Date("2023-02-10"),
        updatedAt: new Date("2023-04-05"),
    },
    {
        id: 3,
        sku: "PRD-003",
        name: "Auriculares BT",
        price: 129.99,
        stock: 50,
        createdAt: new Date("2023-01-20"),
        updatedAt: new Date("2023-03-15"),
    },
    {
        id: 4,
        sku: "PRD-004",
        name: "Smartwatch",
        price: 249.99,
        stock: 18,
        createdAt: new Date("2023-03-05"),
        updatedAt: new Date("2023-04-10"),
    },
    {
        id: 5,
        sku: "PRD-005",
        name: "Tablet Air",
        price: 349.99,
        stock: 30,
        createdAt: new Date("2023-02-25"),
        updatedAt: new Date("2023-04-15"),
    },
    {
        id: 6,
        sku: "PRD-006",
        name: "Monitor 4K",
        price: 499.99,
        stock: 8,
        createdAt: new Date("2023-03-15"),
        updatedAt: new Date("2023-04-20"),
    },
    {
        id: 7,
        sku: "PRD-007",
        name: "Teclado Mecánico",
        price: 89.99,
        stock: 35,
        createdAt: new Date("2023-03-20"),
        updatedAt: new Date("2023-04-25"),
    },
    {
        id: 8,
        sku: "PRD-008",
        name: "Mouse Gamer",
        price: 59.99,
        stock: 40,
        createdAt: new Date("2023-03-25"),
        updatedAt: new Date("2023-04-30"),
    },
]

const ProductsGrid = () => {
    return (
        <Card className="mt-6">
            <CardHeader className="pb-1">
                <CardTitle>Lista de Productos</CardTitle>
                <CardDescription>Total: {products.length} productos en inventario</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <div className="w-full flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Mostrando 1-8 de 8 productos</p>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    1
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </CardFooter>
        </Card>
    )
}

export default ProductsGrid;