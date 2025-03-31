"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navItems } from '@/utils/navItems'

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