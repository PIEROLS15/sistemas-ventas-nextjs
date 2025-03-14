"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface InventoryStatusProps {
    className?: string;
}

const InventoryStatus: React.FC<InventoryStatusProps> = ({ className }) => {
    // Datos de ejemplo
    const products = [
        {
            name: "Smartphone X",
            sku: "SP-X-001",
            stock: 5,
            status: "Bajo",
            price: "$899.00",
        },
        {
            name: "Laptop Pro",
            sku: "LP-001",
            stock: 12,
            status: "Medio",
            price: "$1,299.00",
        },
        {
            name: "Auriculares BT",
            sku: "BT-001",
            stock: 3,
            status: "Crítico",
            price: "$129.00",
        },
        {
            name: "Smartwatch",
            sku: "SW-001",
            stock: 8,
            status: "Bajo",
            price: "$249.00",
        },
        {
            name: "Tablet Air",
            sku: "TA-001",
            stock: 25,
            status: "Óptimo",
            price: "$349.00",
        },
        {
            name: "Monitor 4K",
            sku: "M4K-001",
            stock: 2,
            status: "Crítico",
            price: "$499.00",
        },
    ]

    // Función para determinar el color del badge según el estado
    const getStatusVariant = (status: string) => {
        switch (status) {
            case "Crítico":
                return "destructive"
            case "Bajo":
                return "outline"
            case "Medio":
                return "secondary"
            case "Óptimo":
                return "default"
            default:
                return "outline"
        }
    }

    return (
        <Card className={`h-full ${className}`}>
            <CardHeader>
                <CardTitle>Estado del Inventario</CardTitle>
                <CardDescription>Productos con inventario bajo o crítico</CardDescription>
            </CardHeader>
            <CardContent>
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
                        {products.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.sku}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(product.status)}>{product.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">{product.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default InventoryStatus;