"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CreateSaleDialog from "@/components/layout/sales/createSaleDialog"
import { SalesHeaderProps } from "@/types/sales";

const SalesHeader = ({ fetchSales }: SalesHeaderProps) => {
    const [open, setOpen] = useState(false)

    // Función que se ejecutará después de crear una venta
    const handleSuccess = () => {
        fetchSales();
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-2">
                <div>
                    <h1 className="font-heading text-3xl md:text-4xl">Ventas</h1>
                    <p className="text-lg text-muted-foreground">Gestiona las ventas del sistema</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative w-full sm:w-64">
                        <Input placeholder="Buscar ventas..." className="pl-3 pr-10" />
                    </div>
                    <Button onClick={() => setOpen(true)} className="gap-1">
                        <Plus className="h-4 w-4" />
                        <span>Nueva Venta</span>
                    </Button>
                </div>
            </div>

            <CreateSaleDialog open={open} onOpenChange={setOpen} onSuccess={handleSuccess} />
        </div>
    )
}

export default SalesHeader;