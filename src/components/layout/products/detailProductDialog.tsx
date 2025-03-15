"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, Calendar, DollarSign, BarChart } from "lucide-react"
import { ProductDetailsDialogProps } from '@/types/products'
import { getStockStatus, formatDate, formatPrice } from '@/utils/productUtils'

const DetailsProductDialog = ({ open, onOpenChange, product }: ProductDetailsDialogProps) => {
    const stockStatus = getStockStatus(product.stock)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{product.name}</DialogTitle>
                    <DialogDescription>Detalles completos del producto</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <Package className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-sm font-medium">SKU</p>
                                <p className="text-sm text-muted-foreground">{product.sku}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-sm font-medium">Precio</p>
                                <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <BarChart className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-sm font-medium">Stock</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-muted-foreground">{product.stock} unidades</p>
                                    <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-sm font-medium">Creado</p>
                                <p className="text-sm text-muted-foreground">{formatDate(product.createdAt)}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-sm font-medium">Última actualización</p>
                            <p className="text-sm text-muted-foreground">{formatDate(product.updatedAt)}</p>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DetailsProductDialog;