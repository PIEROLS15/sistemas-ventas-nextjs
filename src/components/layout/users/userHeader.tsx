"use client"

import { Input } from "@/components/ui/input"

export function UsersHeader() {

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-2">
                <div>
                    <h1 className="font-heading text-3xl md:text-4xl">Usuarios</h1>
                    <p className="text-lg text-muted-foreground">Gestiona los usuarios del sistema</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative w-full sm:w-64">
                        <Input placeholder="Buscar usuarios..." className="pl-3 pr-10" />
                    </div>
                </div>
            </div>

        </div>
    )
}