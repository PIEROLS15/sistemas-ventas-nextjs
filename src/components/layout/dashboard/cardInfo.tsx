"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Package, ShoppingCart, DollarSign, TrendingUp, TrendingDown } from "lucide-react"

const CardInfo = () => {
    // Datos de ejemplo
    const stats = [
        {
            title: "Usuarios Totales",
            value: "2,853",
            icon: Users,
            change: "+12.5%",
            trend: "up",
        },
        {
            title: "Productos",
            value: "1,245",
            icon: Package,
            change: "+3.2%",
            trend: "up",
        },
        {
            title: "Ventas",
            value: "12,234",
            icon: ShoppingCart,
            change: "+18.7%",
            trend: "up",
        },
        {
            title: "Ingresos",
            value: "$45,678",
            icon: DollarSign,
            change: "-2.5%",
            trend: "down",
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
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                            {stat.trend === "up" ? (
                                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                            ) : (
                                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                            )}
                            <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                            <span className="ml-1">desde el mes pasado</span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default CardInfo;