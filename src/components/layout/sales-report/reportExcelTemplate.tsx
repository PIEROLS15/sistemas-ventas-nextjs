"use client"

import * as XLSX from "xlsx"
import { Button } from "@/components/ui/button"
import { FileSpreadsheet } from "lucide-react"

interface SaleData {
    saleCode: string
    customerName: string
    identificationType: string
    identificationNumber: string
    email: string
    totalProducts: number
    totalAmount: string
    status: string
    createdAt: string
}

interface ReportExcelTemplateProps {
    data: SaleData[]
    dateRange: { from: Date; to: Date }
}

export function ReportExcelTemplate({ data, dateRange }: ReportExcelTemplateProps) {
    const generateExcel = () => {
        // Preparar los datos para Excel
        const excelData = data.map((sale) => ({
            "Código de Venta": sale.saleCode,
            Cliente: sale.customerName,
            "Tipo de Identificación": sale.identificationType,
            "Número de Identificación": sale.identificationNumber,
            "Correo Electrónico": sale.email,
            "Cantidad de Productos": sale.totalProducts,
            "Monto Total": `$${Number(sale.totalAmount).toFixed(2)}`,
            Estado: sale.status,
            "Fecha de Venta": new Date(sale.createdAt).toLocaleDateString(),
        }))

        // Crear una hoja de cálculo
        const worksheet = XLSX.utils.json_to_sheet(excelData)

        // Ajustar el ancho de las columnas
        const columnWidths = [
            { wch: 15 }, // Código de Venta
            { wch: 20 }, // Cliente
            { wch: 10 }, // Tipo de Identificación
            { wch: 20 }, // Número de Identificación
            { wch: 25 }, // Correo Electrónico
            { wch: 10 }, // Cantidad de Productos
            { wch: 12 }, // Monto Total
            { wch: 12 }, // Estado
            { wch: 15 }, // Fecha de Venta
        ]
        worksheet["!cols"] = columnWidths

        // Crear un libro de trabajo y añadir la hoja
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte de Ventas")

        // Generar el archivo Excel
        const from = dateRange.from.toLocaleDateString().replace(/\//g, "-")
        const to = dateRange.to.toLocaleDateString().replace(/\//g, "-")
        XLSX.writeFile(workbook, `reporte-ventas-${from}-a-${to}.xlsx`)
    }

    return (
        <Button onClick={generateExcel} className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Generar Excel
        </Button>
    )
}

