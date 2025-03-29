"use client"

export function ReportsHeader() {
    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-2">
                <div>
                    <h1 className="font-heading text-3xl md:text-4xl">Reportes</h1>
                    <p className="text-lg text-muted-foreground">Genera reportes y análisis de datos del sistema</p>
                </div>
            </div>
        </div>
    )
}