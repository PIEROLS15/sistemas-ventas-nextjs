"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Eye } from "lucide-react"
import ProductDialog from "@/components/layout/products/productsDialog"
import DeleteProductDialog from "@/components/layout/products/deleteProductDialog"
import DetailsProductDialog from "@/components/layout/products/detailProductDialog"

interface ProductCardProps {
    product: {
        id: number
        sku: string
        name: string
        price: number
        stock: number
        createdAt: Date
        updatedAt: Date
    }
}

// Función para determinar el estado del stock
const getStockStatus = (stock: number) => {
    if (stock <= 5) return { label: "Crítico", variant: "destructive" as const }
    if (stock <= 15) return { label: "Bajo", variant: "outline" as const }
    if (stock <= 30) return { label: "Medio", variant: "secondary" as const }
    return { label: "Óptimo", variant: "default" as const }
}

// Función para formatear precio
const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "USD",
    }).format(price)
}

export function ProductCard({ product }: ProductCardProps) {
    const [showEditDialog, setShowEditDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showDetailsDialog, setShowDetailsDialog] = useState(false)

    const stockStatus = getStockStatus(product.stock)

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
                        <Button variant="outline" size="sm" className="text-destructive" onClick={() => setShowDeleteDialog(true)}>
                            <Trash2 className="h-4 w-4 mr-1" />
                            Eliminar
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            {showEditDialog && <ProductDialog open={showEditDialog} onOpenChange={setShowEditDialog} product={product} />}

            {showDeleteDialog && (
                <DeleteProductDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog} product={product} />
            )}

            {showDetailsDialog && (
                <DetailsProductDialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog} product={product} />
            )}
        </>
    )
}

