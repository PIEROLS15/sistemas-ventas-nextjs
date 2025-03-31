"use client";

import type React from "react";
import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import ThemeToggle from "@/components/ui/themeToggle";
import DropdownProfile from "./dashboard/dropdownProfile";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItemsMobile } from '@/utils/navItems'

const HeaderDashboard = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 border-b bg-background">
            <div className="container mx-auto max-w-[1400px] px-4 flex h-16 items-center justify-between py-4">
                <div className="flex items-center gap-2 md:gap-4">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="pr-0">
                            <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                            <div className="px-7">
                                <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                                    <ShoppingCart className="h-6 w-6 text-primary" />
                                    <span>Sistema de Ventas</span>
                                </Link>
                            </div>
                            <nav className="flex flex-col gap-4 px-2 pt-16">
                                {navItemsMobile.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                                            pathname === item.href ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground",
                                        )}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.title}
                                    </Link>
                                ))}
                            </nav>
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
};

export default HeaderDashboard;
