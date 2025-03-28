"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react"
import useUser from "@/hooks/useUsers";
import useProducts from "@/hooks/useProducts";
import useSales from "@/hooks/useSales";

const CardInfo = () => {
    const { users } = useUser();
    const { products } = useProducts();
    const { totalSalesCount, totalIncome } = useSales();

    const stats = [
        {
            title: "Usuarios Totales",
            value: users.length.toString(),
            icon: Users,
        },
        {
            title: "Productos",
            value: products.length.toString(),
            icon: Package,
        },
        {
            title: "Ventas",
            value: totalSalesCount.toString(),
            icon: ShoppingCart,
        },
        {
            title: "Ingresos",
            value: "S/ " + totalIncome.toString(),
            icon: DollarSign,
        },
    ]

    return (
        <div className="flex flex-wrap gap-4">
            {stats.map((stat, index) => (
                <Card key={index} className="flex-1 min-w-[200px]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-primary/20 p-1.5 text-primary">
                            <stat.icon className="h-full w-full" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default CardInfo;