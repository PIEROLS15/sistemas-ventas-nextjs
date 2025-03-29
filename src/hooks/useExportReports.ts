"use client"

import { toast } from "sonner"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from 'xlsx'
import { SaleReport } from '@/types/sales'
import { formatPrice, formatDate } from '@/utils/productUtils'
import { getStatusBadge } from '@/utils/productUtils'

type ExportType = "excel" | "pdf" | "csv" | null

export const useExportReports = (setIsExporting: (type: ExportType) => void) => {
    const exportToExcel = async (filteredSales: SaleReport[]) => {
        setIsExporting("excel")

        try {
            const worksheet = XLSX.utils.json_to_sheet(filteredSales.map(sale => ({
                "Código": sale.saleCode,
                "Cliente": sale.customerName,
                "Correo": sale.email,
                "Tipo Identificación": sale.identification.type,
                "N° Identificación": sale.identificationNumber,
                "Monto": formatPrice(sale.totalAmount),
                "Productos": sale.totalProducts,
                "Estado": getStatusBadge(sale.status).label,
                "Fecha": formatDate(sale.createdAt)
            })))

            const workbook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte de Ventas")
            XLSX.writeFile(workbook, "reporte_ventas.xlsx")

            toast.success("Exportación completada", {
                description: "El reporte ha sido exportado a Excel correctamente.",
            })
        } catch (error) {
            console.error("Error al exportar a Excel:", error)
            toast.error("Error", {
                description: "Ocurrió un error al exportar a Excel. Intenta nuevamente.",
            })
        } finally {
            setIsExporting(null)
        }
    }

    const exportToPDF = async (filteredSales: SaleReport[]) => {
        setIsExporting("pdf")

        try {
            const doc = new jsPDF({
                orientation: "landscape",
                unit: "mm",
                format: "a4",
            })

            doc.setFontSize(18)
            doc.text("Reporte de Ventas", 14, 20)

            const headers = [["Código", "Cliente", "Correo", "Tipo Identificacion", "N° Identificacion", "Monto", "Productos", "Estado", "Fecha"]]

            const data = filteredSales.map(sale => [
                sale.saleCode,
                sale.customerName,
                sale.email,
                sale.identification.type,
                sale.identificationNumber,
                `S/ ${sale.totalAmount}`,
                sale.totalProducts,
                sale.status,
                formatDate(sale.createdAt)
            ])

            autoTable(doc, {
                startY: 30,
                head: headers,
                body: data,
                styles: { fontSize: 10 },
            })

            doc.save("reporte_ventas.pdf")

            toast.success("Exportación completada", {
                description: "El reporte ha sido exportado a PDF correctamente.",
            })
        } catch (error) {
            console.error("Error al exportar a PDF:", error)
            toast.error("Error", {
                description: "Ocurrió un error al exportar a PDF. Intenta nuevamente.",
            })
        } finally {
            setIsExporting(null)
        }
    }

    const exportToCSV = async (filteredSales: SaleReport[]) => {
        setIsExporting("csv")

        try {
            const headers = [
                "Código", "Cliente", "Correo", "Tipo Identificación",
                "N° Identificación", "Monto", "Productos", "Estado", "Fecha"
            ]

            const csvContent = [
                headers.join(","),
                ...filteredSales.map(sale => [
                    sale.saleCode,
                    `"${sale.customerName}"`,
                    sale.email,
                    sale.identification.type,
                    sale.identificationNumber,
                    formatPrice(sale.totalAmount),
                    sale.totalProducts,
                    getStatusBadge(sale.status).label,
                    formatDate(sale.createdAt)
                ].join(","))
            ].join("\n")

            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.setAttribute("href", url)
            link.setAttribute("download", "reporte_ventas.csv")
            link.click()

            toast.success("Exportación completada", {
                description: "El reporte ha sido exportado a CSV correctamente.",
            })
        } catch (error) {
            console.error("Error al exportar a CSV:", error)
            toast.error("Error", {
                description: "Ocurrió un error al exportar a CSV. Intenta nuevamente.",
            })
        } finally {
            setIsExporting(null)
        }
    }

    return {
        exportToExcel,
        exportToPDF,
        exportToCSV
    }
}