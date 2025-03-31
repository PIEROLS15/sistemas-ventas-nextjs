// components/layout/products/ProductsGrid.tsx
import { useState } from "react";
import { ProductCard } from "@/components/layout/products/productsCard";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ProductsGridProps } from '@/types/products';
import PaginationComponent from "@/components/layout/pagination";

const ProductsGrid = ({ products, loading, error, fetchProducts }: ProductsGridProps) => {
    const productsPerPage = 10;

    // Función para calcular los productos de la página actual
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Función para cambiar la página
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
                <CardTitle>Lista de Productos</CardTitle>
                <CardDescription>Total: {products.length} productos en inventario</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {currentProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={{
                                ...product,
                                createdAt: new Date(product.createdAt).toISOString(),
                                updatedAt: new Date(product.updatedAt).toISOString(),
                            }}
                            fetchProducts={fetchProducts}
                        />
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <div className="w-full flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Mostrando {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)} de {products.length} productos
                    </p>
                    <PaginationComponent
                        totalItems={products.length}
                        itemsPerPage={productsPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </CardFooter>
        </Card>
    );
};

export default ProductsGrid;