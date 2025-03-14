"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RecentSalesProps {
    className?: string;
}

const RecentSales: React.FC<RecentSalesProps> = ({ className }) => {
    // Datos de ejemplo
    const sales = [
        {
            customer: {
                name: "Olivia Martínez",
                email: "olivia@example.com",
                avatar: "/placeholder-user.jpg",
                initials: "OM",
            },
            amount: "$429.00",
            status: "Completada",
            date: "Hace 2 horas",
        },
        {
            customer: {
                name: "Carlos Rodríguez",
                email: "carlos@example.com",
                avatar: "/placeholder-user.jpg",
                initials: "CR",
            },
            amount: "$829.00",
            status: "Completada",
            date: "Hace 5 horas",
        },
        {
            customer: {
                name: "Sofía García",
                email: "sofia@example.com",
                avatar: "/placeholder-user.jpg",
                initials: "SG",
            },
            amount: "$129.00",
            status: "Pendiente",
            date: "Hace 8 horas",
        },
        {
            customer: {
                name: "Javier López",
                email: "javier@example.com",
                avatar: "/placeholder-user.jpg",
                initials: "JL",
            },
            amount: "$549.00",
            status: "Completada",
            date: "Hace 12 horas",
        },
        {
            customer: {
                name: "Ana Torres",
                email: "ana@example.com",
                avatar: "/placeholder-user.jpg",
                initials: "AT",
            },
            amount: "$949.00",
            status: "Cancelada",
            date: "Hace 1 día",
        },
    ]

    return (
        <Card className={`h-full ${className}`}>
            <CardHeader>
                <CardTitle>Ventas Recientes</CardTitle>
                <CardDescription>Has realizado 265 ventas este mes</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {sales.map((sale, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Avatar>
                                    <AvatarImage src={sale.customer.avatar} />
                                    <AvatarFallback>{sale.customer.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium leading-none">{sale.customer.name}</p>
                                    <p className="text-sm text-muted-foreground">{sale.customer.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Badge
                                    variant={
                                        sale.status === "Completada" ? "default" : sale.status === "Pendiente" ? "outline" : "destructive"
                                    }
                                >
                                    {sale.status}
                                </Badge>
                                <p className="font-medium">{sale.amount}</p>
                                <p className="text-xs text-muted-foreground">{sale.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default RecentSales;