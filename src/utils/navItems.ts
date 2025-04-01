import {
    LayoutDashboard,
    ShoppingCart,
    Users,
    Package,
    BarChart
} from "lucide-react"
import { NavItem } from '@/types/nav'

export const navItems: NavItem[] = [
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

export const navItemsMobile: NavItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Ventas",
        href: "/dashboard/sales/grid",
        icon: ShoppingCart,
    },
    {
        title: "Productos",
        href: "/dashboard/products/grid",
        icon: Package,
    },
    {
        title: "Usuarios",
        href: "/dashboard/users/grid",
        icon: Users,
    },
    {
        title: "Reportes",
        href: "/dashboard/sales-report",
        icon: BarChart,
    }
]
