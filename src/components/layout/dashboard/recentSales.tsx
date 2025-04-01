"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useSales from "@/hooks/useSales";
import { formatPrice, getStatusBadge } from "@/utils/productUtils";

// Función para calcular tiempo relativo
const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "justo ahora";
    if (diffInSeconds < 3600) return `hace ${Math.floor(diffInSeconds / 60)} min`;
    if (diffInSeconds < 86400) return `hace ${Math.floor(diffInSeconds / 3600)} h`;

    return date.toLocaleString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const RecentSales: React.FC<{ className?: string }> = ({ className }) => {
    const { sales, loading, error } = useSales();

    if (loading) {
        return <div>Cargando ventas...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Filtrar y ordenar las 5 ventas más recientes
    const recentSales = [...sales]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

    return (
        <Card className={`h-full ${className}`}>
            <CardHeader>
                <CardTitle>Ventas Recientes</CardTitle>
                <CardDescription>Has realizado {sales.length} ventas</CardDescription>
            </CardHeader>
            <CardContent className="overflow-hidden w-full">
                <div className="space-y-6">
                    {recentSales.map((sale) => (
                        <div key={sale.id} className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div className="flex items-center gap-2 md:gap-4">
                                <Avatar>
                                    <AvatarFallback>
                                        {sale.customerName
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium leading-none">{sale.customerName}</p>
                                    <p className="text-sm text-muted-foreground">{sale.email}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 md:gap-4">
                                {(() => {
                                    const { label, variant } = getStatusBadge(sale.status);
                                    return <Badge variant={variant}>{label}</Badge>;
                                })()}
                                <p className="font-medium">{formatPrice(sale.totalAmount)}</p>
                                <p className="text-xs text-muted-foreground">
                                    {getRelativeTime(new Date(sale.createdAt))}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>

        </Card>
    );
};

export default RecentSales;