"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import ProductDialog from "@/components/layout/products/productsDialog";
import DeleteProductDialog from "@/components/layout/products/deleteProductDialog";
import DetailsProductDialog from "@/components/layout/products/detailProductDialog";
import { getStockStatus, formatPrice } from '@/utils/productUtils';
import { ProductCardProps } from '@/types/products';

export function ProductCard({ product, fetchProducts }: ProductCardProps) {
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);

    const stockStatus = getStockStatus(product.stock);

    // Función para manejar la actualización de productos
    const handleEditSuccess = () => {
        setShowEditDialog(false);
        fetchProducts();
    };

    // Función para manejar la eliminación exitosa
    const handleDelete = () => {
        setShowDeleteDialog(false);
        fetchProducts();
    };

    return (
        <>
            <Card className="h-full flex flex-col">
                <CardContent className="flex-1 pt-6">
                    <div className="space-y-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium text-lg">{product.name}</h3>
                                <p className="text-sm text-muted-foreground">{product.sku}</p>
                            </div>
                            <Badge variant={stockStatus.variant}>
                                {product.stock} ({stockStatus.label})
                            </Badge>
                        </div>
                        <p className="text-2xl font-bold">{formatPrice(product.price)}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline" size="sm" onClick={() => setShowDetailsDialog(true)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setShowEditDialog(true)}>
                            <Pencil className="h-4 w-4 mr-1" />
                            Editar
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive"
                            onClick={() => setShowDeleteDialog(true)}
                        >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Eliminar
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            {showEditDialog && (
                <ProductDialog
                    open={showEditDialog}
                    onOpenChange={setShowEditDialog}
                    product={product}
                    onSuccess={handleEditSuccess}
                />
            )}

            {showDeleteDialog && (
                <DeleteProductDialog
                    open={showDeleteDialog}
                    onOpenChange={setShowDeleteDialog}
                    product={product}
                    onDelete={handleDelete}
                />
            )}

            {showDetailsDialog && (
                <DetailsProductDialog
                    open={showDetailsDialog}
                    onOpenChange={setShowDetailsDialog}
                    product={product}
                />
            )}
        </>
    );
}