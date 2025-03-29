"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    ShoppingCart,
    Users,
    Package,
    BarChart
} from "lucide-react"

import { cn } from "@/lib/utils"

interface NavItem {
    title: string
    href: string
    icon: React.ElementType
}

const navItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Ventas",
        href: "/dashboard/sales",
        icon: ShoppingCart,
    },
    {
        title: "Productos",
        href: "/dashboard/products",
        icon: Package,
    },
    {
        title: "Usuarios",
        href: "/dashboard/users",
        icon: Users,
    },
    {
        title: "Reportes",
        href: "/dashboard/sales-report",
        icon: BarChart,
    }
]

const Sidebar = () => {
    const pathname = usePathname()


    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex flex-1">
                <aside className="hidden w-64 border-r bg-background md:block">
                    <div className="flex h-full flex-col">
                        <div className="flex-1 overflow-auto py-8 px-4">
                            <nav className="grid items-start gap-2">
                                {navItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                                            pathname === item.href ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground",
                                        )}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.title}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Sidebar;