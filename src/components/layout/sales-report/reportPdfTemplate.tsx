"use client"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import { Button } from "@/components/ui/button"
import { FileIcon as FilePdf } from "lucide-react"

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

interface ReportPDFTemplateProps {
    data: SaleData[]
    dateRange: { from: Date; to: Date }
}

export function ReportPDFTemplate({ data, dateRange }: ReportPDFTemplateProps) {
    const generatePDF = () => {
        // Crear nuevo documento PDF
        const doc = new jsPDF()

        // Añadir título
        doc.setFontSize(18)
        doc.text("Reporte de Ventas", 14, 22)

        // Añadir información del reporte
        doc.setFontSize(11)
        doc.text(`Período: ${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`, 14, 32)
        doc.text(`Total de ventas: ${data.length}`, 14, 38)

        // Calcular el total
        const total = data.reduce((sum, sale) => sum + Number(sale.totalAmount), 0)
        doc.text(`Monto total: $${total.toFixed(2)}`, 14, 44)
        doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 14, 50)

        // Añadir tabla
        autoTable(doc, {
            startY: 60,
            head: [["Código", "Cliente", "Identificación", "Correo", "Productos", "Total", "Estado", "Fecha"]],
            body: data.map((sale) => [
                sale.saleCode,
                sale.customerName,
                `${sale.identificationType} ${sale.identificationNumber}`,
                sale.email,
                sale.totalProducts,
                `$${Number(sale.totalAmount).toFixed(2)}`,
                sale.status,
                new Date(sale.createdAt).toLocaleDateString(),
            ]),
            theme: "striped",
            headStyles: {
                fillColor: [55, 219, 175],
                textColor: [255, 255, 255],
                fontStyle: "bold",
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240],
            },
            styles: {
                fontSize: 9,
                cellPadding: 3,
            },
        })

        // Añadir pie de página
        const pageCount = doc.getNumberOfPages()
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i)
            doc.setFontSize(8)
            doc.text(
                `Página ${i} de ${pageCount} - Sistema de Ventas`,
                doc.internal.pageSize.getWidth() / 2,
                doc.internal.pageSize.getHeight() - 10,
                { align: "center" },
            )
        }

        // Guardar el PDF
        doc.save("reporte-ventas.pdf")
    }

    return (
        <Button onClick={generatePDF} className="flex items-center gap-2">
            <FilePdf className="h-4 w-4" />
            Generar PDF
        </Button>
    )
}