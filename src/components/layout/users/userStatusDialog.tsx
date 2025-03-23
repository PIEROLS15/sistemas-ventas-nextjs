"use client"

import { useState } from "react"
import { Loader2, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
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
import { User, UserStatusDialogProps } from '@/types/users'
import useUser from '@/hooks/useUsers'

const UserStatusDialog = ({ open, onOpenChange, user, onSuccess }: UserStatusDialogProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const { updateStatusUser } = useUser();
    const isActivating = user.isActive === false

    async function onSubmit(data: User) {
        setIsLoading(true);
        try {
            await updateStatusUser(user.id, isActivating, data);

            toast.success(`Usuario ${isActivating ? "activado" : "desactivado"}`, {
                description: `El usuario ${data.firstName} ${data.lastName} ha sido ${isActivating ? "activado" : "desactivado"} correctamente.`
            });

            onOpenChange(false);
            onSuccess();
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            toast.error("Error", {
                description: "Ocurrió un error al actualizar el usuario. Intenta nuevamente.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <AlertTriangle className={`h-5 w-5 ${isActivating ? "text-primary" : "text-destructive"}`} />
                        {isActivating ? "Activar usuario" : "Desactivar usuario"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {isActivating
                            ? `¿Estás seguro de que deseas activar al usuario ${user.firstName}? El usuario podrá acceder nuevamente al sistema.`
                            : `¿Estás seguro de que deseas desactivar al usuario ${user.firstName}? El usuario no podrá acceder al sistema hasta que sea activado nuevamente.`}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
                    <Button variant={isActivating ? "default" : "destructive"} onClick={() => onSubmit(user)} disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {isActivating ? "Activando..." : "Desactivando..."}
                            </>
                        ) : isActivating ? (
                            "Activar"
                        ) : (
                            "Desactivar"
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default UserStatusDialog