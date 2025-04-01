"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutGrid, List } from "lucide-react"

const SalesTabs = () => {
    const pathname = usePathname()
    const isGridView = pathname.includes("/grid")

    return (
        <div className="flex justify-end mb-4">
            <Tabs defaultValue={isGridView ? "grid" : "list"} className="w-auto">
                <TabsList>
                    <TabsTrigger value="list" asChild>
                        <Link href="/dashboard/sales" className="flex items-center gap-1">
                            <List className="h-4 w-4" />
                            <span className="hidden sm:inline">Lista</span>
                        </Link>
                    </TabsTrigger>
                    <TabsTrigger value="grid" asChild>
                        <Link href="/dashboard/sales/grid" className="flex items-center gap-1">
                            <LayoutGrid className="h-4 w-4" />
                            <span className="hidden sm:inline">Cuadrícula</span>
                        </Link>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
}

export default SalesTabs;