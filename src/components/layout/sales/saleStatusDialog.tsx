"use client"

import { useState } from "react"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
// import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { SaleStatusDialogProps } from "@/types/sales"
import useSales from "@/hooks/useSales";

const SaleStatusDialog = ({ open, onOpenChange, sale, onSuccess }: SaleStatusDialogProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const isCompleting = sale.status === "Completed"
    const { updateSaleStatus } = useSales();

    // Determinar el mensaje según el estado actual y el nuevo estado
    const getStatusChangeMessage = () => {
        if (sale.status === "Pending") {
            return isCompleting
                ? `¿Estás seguro de que deseas marcar la venta ${sale.saleCode} como completada?`
                : `¿Estás seguro de que deseas cancelar la venta ${sale.saleCode}? Esta acción no se puede deshacer.`
        } else if (sale.status === "Completed") {
            return `¿Estás seguro de que deseas cancelar la venta ${sale.saleCode} que ya estaba completada? Esta acción no se puede deshacer.`
        } else {
            return `¿Estás seguro de que deseas reactivar y marcar como completada la venta ${sale.saleCode} que estaba cancelada?`
        }
    }

    const handleStatusChange = async () => {
        setIsLoading(true);
        await updateSaleStatus(sale.id, isCompleting ? "Completed" : "Canceled", onOpenChange, onSuccess);
        setIsLoading(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        {isCompleting ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                            <XCircle className="h-5 w-5 text-destructive" />
                        )}
                        {isCompleting ? "Completar venta" : "Cancelar venta"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>{getStatusChangeMessage()}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
                    <Button variant={isCompleting ? "default" : "destructive"} onClick={handleStatusChange} disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {isCompleting ? "Completando..." : "Cancelando..."}
                            </>
                        ) : isCompleting ? (
                            "Completar venta"
                        ) : (
                            "Cancelar venta"
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default SaleStatusDialog;