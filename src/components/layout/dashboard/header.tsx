"use client"

import type React from "react"
import Link from "next/link"
import { ShoppingCart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ThemeToggle from "@/components/ui/themeToggle"
import DropdownProfile from "./dropdownProfile"


const HeaderDashboard = () => {
    return (
        <header className="sticky top-0 z-40 border-b bg-background">
            <div className="container mx-auto max-w-[1400px] px-4 flex h-16 items-center justify-between py-4">
                <div className="flex items-center gap-2 md:gap-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="pr-0">
                            <div className="px-7">
                                <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                                    <ShoppingCart className="h-6 w-6 text-primary" />
                                    <span>Sistema de Ventas</span>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Link href="/dashboard" className="hidden items-center gap-2 font-semibold md:flex">
                        <ShoppingCart className="h-6 w-6 text-primary" />
                        <span>Sistema de Ventas</span>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <DropdownProfile />
                </div>
            </div>
        </header>
    );
}

export default HeaderDashboard;