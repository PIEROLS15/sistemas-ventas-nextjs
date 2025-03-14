"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProductDialog from "@/components/layout/products/productsDialog"
import { ProductsTabs } from "@/components/layout/products/productsTab"

const ProductsHeader = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-2">
                <div>
                    <h1 className="font-heading text-3xl md:text-4xl">Productos</h1>
                    <p className="text-lg text-muted-foreground">Gestiona tu inventario de productos</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative w-full sm:w-64">
                        <Input placeholder="Buscar productos..." className="pl-3 pr-10" />
                    </div>
                    <Button onClick={() => setOpen(true)} className="gap-1">
                        <Plus className="h-4 w-4" />
                        <span>Nuevo Producto</span>
                    </Button>
                </div>
            </div>

            <ProductsTabs />

            <ProductDialog open={open} onOpenChange={setOpen} />
        </div>
    )
}

export default ProductsHeader;