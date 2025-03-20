"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import useProducts from "@/hooks/useProducts";
import { getStockStatus, formatPrice } from "@/utils/productUtils";

interface InventoryStatusProps {
    className?: string;
}

const InventoryStatus: React.FC<InventoryStatusProps> = ({ className }) => {
    const { products, loading, error } = useProducts();

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error: {error}</p>;

    // Filtrar productos con stock Crítico y Bajo
    const filteredProducts = products.filter((product) => {
        const { label } = getStockStatus(product.stock);
        return label === "Crítico" || label === "Bajo";
    });

    return (
        <Card className={`h-full ${className}`}>
            <CardHeader>
                <CardTitle>Estado del Inventario</CardTitle>
                <CardDescription>Productos con stock crítico o bajo</CardDescription>
            </CardHeader>
            <CardContent>
                {filteredProducts.length === 0 ? (
                    <p>No hay productos con stock crítico o bajo.</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Producto</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Precio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product) => {
                                const { label, variant } = getStockStatus(product.stock);
                                return (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell>{product.sku}</TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell>
                                            <Badge variant={variant}>{label}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">{formatPrice(product.price)}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
};

export default InventoryStatus;