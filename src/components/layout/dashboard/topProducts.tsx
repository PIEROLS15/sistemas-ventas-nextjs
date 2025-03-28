"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import useSales from "@/hooks/useSales";
import { useMemo } from "react";

const TopProducts = () => {
    const { sales } = useSales();

    // Procesar las ventas para obtener los productos más vendidos
    const topProducts = useMemo(() => {
        const productMap = new Map();

        sales.forEach((sale) => {
            sale.SaleDetail.forEach(({ product, quantity }) => {
                productMap.set(
                    product.name,
                    (productMap.get(product.name) || 0) + quantity
                );
            });
        });

        return Array.from(productMap.entries())
            .map(([name, sales]) => ({ name, sales }))
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 5);
    }, [sales]);

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Productos Más Vendidos</CardTitle>
                <CardDescription>Los productos con mayor número de ventas</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={topProducts}
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
    );
};

export default TopProducts;