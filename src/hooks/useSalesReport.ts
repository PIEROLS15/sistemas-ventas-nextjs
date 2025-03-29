"use client"

import { useState } from "react"
import { format } from "date-fns"
import { toast } from "sonner"
import { SaleReport } from '@/types/sales'

type ReportFormValues = {
    dateRange: {
        from: Date
        to: Date
    }
    status?: string
}

export function useSalesReport() {
    const [filteredSales, setFilteredSales] = useState<SaleReport[]>([])
    const [isGenerating, setIsGenerating] = useState(false)
    const [hasGenerated, setHasGenerated] = useState(false)
    const [isExporting, setIsExporting] = useState<"excel" | "pdf" | "csv" | null>(null)

    const generateReport = async (data: ReportFormValues) => {
        setIsGenerating(true)
        setHasGenerated(false)

        try {
            const requestData = {
                startDate: format(data.dateRange.from, "yyyy-MM-dd"),
                endDate: format(data.dateRange.to, "yyyy-MM-dd"),
                ...(data.status && data.status !== "all" && { status: data.status })
            }

            const response = await fetch('/api/reportSales', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            })

            if (!response.ok) throw new Error('Error en la respuesta')

            const result = await response.json()
            setFilteredSales(result)
            setHasGenerated(true)
            return result
        } catch (error) {
            console.error("Error:", error)
            toast.error("Error al generar reporte")
            setHasGenerated(false)
            throw error
        } finally {
            setIsGenerating(false)
        }
    }

    return {
        filteredSales,
        isGenerating,
        hasGenerated,
        isExporting,
        setIsExporting,
        generateReport,
        setFilteredSales
    }
}