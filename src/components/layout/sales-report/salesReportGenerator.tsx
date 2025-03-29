"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { addDays, format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SalesReportResultsCard } from "@/components/layout/sales-report/salesReportResultsCard"
import { useSalesReport } from "@/hooks/useSalesReport"

// Esquema de validación para el formulario
const reportFormSchema = z.object({
    dateRange: z.object({
        from: z.date(),
        to: z.date(),
    }),
    status: z.string().optional(),
})

type ReportFormValues = z.infer<typeof reportFormSchema>

export function SalesReportGenerator() {
    const {
        filteredSales,
        isGenerating,
        hasGenerated,
        isExporting,
        setIsExporting,
        generateReport
    } = useSalesReport()

    // Inicializar el formulario
    const form = useForm<ReportFormValues>({
        resolver: zodResolver(reportFormSchema),
        defaultValues: {
            dateRange: {
                from: addDays(new Date(), -30),
                to: new Date(),
            },
            status: "",
        },
    })

    // Función para manejar el submit del formulario
    async function onSubmit(data: ReportFormValues) {
        await generateReport(data)
    }

    return (
        <div className="space-y-6 mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Reporte de Ventas</CardTitle>
                    <CardDescription>
                        Selecciona un rango de fechas y otros filtros para generar un reporte de ventas.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="dateRange"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Rango de fechas</FormLabel>
                                            <div className="h-10">
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full h-10 pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground",
                                                                )}
                                                            >
                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                {field.value?.from ? (
                                                                    field.value.to ? (
                                                                        <>
                                                                            {format(field.value.from, "dd/MM/yyyy", { locale: es })} -{" "}
                                                                            {format(field.value.to, "dd/MM/yyyy", { locale: es })}
                                                                        </>
                                                                    ) : (
                                                                        format(field.value.from, "dd/MM/yyyy", { locale: es })
                                                                    )
                                                                ) : (
                                                                    <span>Seleccionar fechas</span>
                                                                )}
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            initialFocus
                                                            mode="range"
                                                            defaultMonth={field.value?.from}
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            numberOfMonths={2}
                                                            locale={es}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Estado de venta</FormLabel>
                                            <div className="h-10">
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-10">
                                                            <SelectValue placeholder="Todos los estados" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="all">Todos los estados</SelectItem>
                                                        <SelectItem value="Completed">Completada</SelectItem>
                                                        <SelectItem value="Pending">Pendiente</SelectItem>
                                                        <SelectItem value="Canceled">Cancelada</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={isGenerating}>
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Generando...
                                        </>
                                    ) : (
                                        "Generar Reporte"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            {hasGenerated && filteredSales && (
                <SalesReportResultsCard
                    filteredSales={filteredSales}
                    isExporting={isExporting}
                    setIsExporting={setIsExporting}
                />
            )}
        </div>
    )
}