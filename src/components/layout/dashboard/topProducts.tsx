"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const TopProducts = () => {
    // Datos de ejemplo
    const data = [
        { name: "Smartphone X", sales: 120 },
        { name: "Laptop Pro", sales: 98 },
        { name: "Auriculares BT", sales: 86 },
        { name: "Smartwatch", sales: 72 },
        { name: "Tablet Air", sales: 65 },
        { name: "Monitor 4K", sales: 53 },
    ]

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Productos Más Vendidos</CardTitle>
                <CardDescription>Los productos con mayor número de ventas este mes</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--background)",
                                borderColor: "var(--border)",
                                borderRadius: "8px",
                            }}
                            cursor={{ fill: "var(--primary-light)", opacity: 0.2 }}
                        />
                        <Bar dataKey="sales" fill="#37dbaf" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

export default TopProducts;