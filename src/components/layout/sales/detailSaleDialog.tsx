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
import { ShoppingCart, User, Tag } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SaleDetailsDialogProps } from "@/types/sales"
import { formatPrice, formatDate, getStatusBadge } from '@/utils/productUtils'

const DetailSaleDialog = ({ open, onOpenChange, sale }: SaleDetailsDialogProps) => {
    const statusBadge = getStatusBadge(sale.status)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-2">
                        <ShoppingCart className="h-6 w-6 text-primary" />
                        Detalles de Venta
                    </DialogTitle>
                    <DialogDescription>Información completa de la venta {sale.saleCode}</DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Información general */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Código de Venta</p>
                            <p className="text-base font-semibold">{sale.saleCode}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Estado</p>
                            <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                        </div>
                    </div>

                    <Separator />

                    {/* Información del cliente */}
                    <div>
                        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            Información del Cliente
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Nombre</p>
                                <p className="text-base">{sale.customerName}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Correo Electrónico</p>
                                <p className="text-base">{sale.email}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Tipo de Identificación</p>
                                <p className="text-base">{sale.identification.type}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Número de Identificación</p>
                                <p className="text-base">{sale.identificationNumber}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Información de la venta */}
                    <div>
                        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                            <Tag className="h-5 w-5 text-primary" />
                            Detalles de Productos
                        </h3>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Producto</TableHead>
                                        <TableHead className="text-right">Precio Unitario</TableHead>
                                        <TableHead className="text-center">Cantidad</TableHead>
                                        <TableHead className="text-right">Subtotal</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sale.SaleDetail?.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.product.name}</TableCell>
                                            <TableCell className="text-right">{formatPrice(item.unitPrice)}</TableCell>
                                            <TableCell className="text-center">{item.quantity}</TableCell>
                                            <TableCell className="text-right">{formatPrice(item.subtotal)}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-right font-medium">
                                            Total
                                        </TableCell>
                                        <TableCell className="text-right font-bold">{formatPrice(sale.totalAmount)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    <Separator />

                    {/* Información adicional */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Vendedor</p>
                            <p className="text-base">{`${sale.seller.firstName} ${sale.seller.lastName}`}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Monto Total</p>
                            <p className="text-base font-bold">{formatPrice(sale.totalAmount)}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Fecha de Creación</p>
                            <p className="text-base">{formatDate(sale.createdAt)}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Última Actualización</p>
                            <p className="text-base">{formatDate(sale.updatedAt)}</p>
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

export default DetailSaleDialog;