"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Package, ShoppingCart, DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import { useEffect, useState } from "react"

const CardInfo = () => {
    const [userCount, setUserCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [totalSalesCount, setTotalSalesCount] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users');
                const data = await response.json();
                setUserCount(data.length);
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Error fetching users:', error);
                } else {
                    console.error('Unknown error:', error);
                }
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                setProductCount(data.length);
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Error fetching products:', error);
                } else {
                    console.error('Unknown error:', error);
                }
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchSalesSummary = async () => {
            try {
                const response = await fetch('/api/sales/summary');
                if (!response.ok) {
                    throw new Error('Error al obtener el resumen de ventas');
                }
                const data = await response.json();
                setTotalSalesCount(data.totalSalesCount);
                setTotalIncome(data.totalIncome);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSalesSummary();
    }, []);

    // Datos de ejemplo
    const stats = [
        {
            title: "Usuarios Totales",
            value: userCount.toString(),
            icon: Users,
            change: "+12.5%",
            trend: "up",
        },
        {
            title: "Productos",
            value: productCount.toString(),
            icon: Package,
            change: "+3.2%",
            trend: "up",
        },
        {
            title: "Ventas",
            value: totalSalesCount.toString(),
            icon: ShoppingCart,
            change: "+18.7%",
            trend: "up",
        },
        {
            title: "Ingresos",
            value: "S/ " + totalIncome.toString(),
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