"use client"

import { format } from "date-fns"
import { es } from "date-fns/locale"
import { FileSpreadsheet, FileIcon as FilePdf, Download, Loader2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate, formatPrice } from '@/utils/productUtils'
import { getStatusBadge } from '@/utils/productUtils'
import { SalesReportResultsCardProps } from '@/types/sales'
import { useExportReports } from '@/hooks/useExportReports'

export function SalesReportResultsCard({
    filteredSales,
    isExporting,
    setIsExporting
}: SalesReportResultsCardProps) {
    const { exportToExcel, exportToPDF, exportToCSV } = useExportReports(setIsExporting)

    // Calcular el total de ventas
    const calculateTotal = () => {
        return filteredSales.reduce((total, sale) => total + Number(sale.totalAmount), 0)
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Resultados del Reporte</CardTitle>
                    <CardDescription>
                        {filteredSales.length} ventas encontradas | Total: {formatPrice(calculateTotal().toString())}
                    </CardDescription>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => exportToExcel(filteredSales)}
                        disabled={isExporting !== null}
                    >
                        {isExporting === "excel" ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <FileSpreadsheet className="h-4 w-4" />
                        )}
                        <span>Excel</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => exportToPDF(filteredSales)}
                        disabled={isExporting !== null}
                    >
                        {isExporting === "pdf" ? <Loader2 className="h-4 w-4 animate-spin" /> : <FilePdf className="h-4 w-4" />}
                        <span>PDF</span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border overflow-hidden">
                    <Table>
                        <TableHeader className="bg-primary/10">
                            <TableRow>
                                <TableHead className="font-semibold text-center">Código</TableHead>
                                <TableHead className="font-semibold text-center">Cliente</TableHead>
                                <TableHead className="font-semibold text-center">Identificación</TableHead>
                                <TableHead className="font-semibold text-center">Correo</TableHead>
                                <TableHead className="font-semibold text-center">Productos</TableHead>
                                <TableHead className="font-semibold text-center">Total</TableHead>
                                <TableHead className="font-semibold text-center">Estado</TableHead>
                                <TableHead className="font-semibold text-center">Fecha</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredSales.map((sale, index) => {
                                const statusBadge = getStatusBadge(sale.status)
                                const isEven = index % 2 === 0

                                return (
                                    <TableRow key={sale.id} className={isEven ? "bg-muted/30" : ""}>
                                        <TableCell className="font-medium text-center">{sale.saleCode}</TableCell>
                                        <TableCell className="text-center">{sale.customerName}</TableCell>
                                        <TableCell className="text-center">
                                            {sale.identification?.type} {sale.identificationNumber}
                                        </TableCell>
                                        <TableCell className="text-center">{sale.email}</TableCell>
                                        <TableCell className="text-center">{sale.totalProducts}</TableCell>
                                        <TableCell className="text-center">{formatPrice(sale.totalAmount)}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant={statusBadge.variant} className="justify-center w-24">
                                                {statusBadge.label}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">{formatDate(sale.createdAt)}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
                <div className="text-sm text-muted-foreground">
                    Reporte generado el {format(new Date(), "dd/MM/yyyy HH:mm", { locale: es })}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => exportToCSV(filteredSales)}
                    disabled={isExporting === "csv"}
                >
                    {isExporting === "csv" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Download className="h-4 w-4" />
                    )}
                    <span>Descargar CSV</span>
                </Button>
            </CardFooter>
        </Card>
    )
}