"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import { es } from "date-fns/locale"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const DateRangePicker = () => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2023, 0, 1),
        to: new Date(),
    })

    // Opciones de rangos predefinidos
    const predefinedRanges = [
        { label: "Hoy", days: 0 },
        { label: "Ayer", days: 1 },
        { label: "Últimos 7 días", days: 7 },
        { label: "Últimos 30 días", days: 30 },
        { label: "Este mes", days: "month" },
        { label: "Personalizado", days: "custom" },
    ]

    const handleRangeChange = (value: string) => {
        const today = new Date()

        if (value === "month") {
            // Primer día del mes actual
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
            setDate({
                from: firstDayOfMonth,
                to: today,
            })
            return
        }

        if (value === "custom") {
            // No hacer nada, dejar que el usuario seleccione en el calendario
            return
        }

        const days = Number.parseInt(value)
        if (!isNaN(days)) {
            const fromDate = addDays(today, -days)
            setDate({
                from: days === 0 ? today : fromDate,
                to: today,
            })
        }
    }

    return (
        <div className="flex items-center space-x-2">
            <Select onValueChange={handleRangeChange} defaultValue="30">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar período" />
                </SelectTrigger>
                <SelectContent>
                    {predefinedRanges.map((range) => (
                        <SelectItem key={range.label} value={range.days.toString()}>
                            {range.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y", { locale: es })} - {format(date.to, "LLL dd, y", { locale: es })}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y", { locale: es })
                            )
                        ) : (
                            <span>Seleccionar fechas</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        locale={es}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DateRangePicker;