// usePasswordChange.ts
"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { z } from "zod"

// Esquema de validación para el formulario de cambio de contraseña
export const passwordSchema = z
    .object({
        currentPassword: z.string().min(1, {
            message: "La contraseña actual es requerida",
        }),
        newPassword: z.string().min(6, {
            message: "La nueva contraseña debe tener al menos 6 caracteres",
        }),
        confirmPassword: z.string().min(6, {
            message: "La confirmación de contraseña debe tener al menos 6 caracteres",
        }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
        message: "La nueva contraseña debe ser diferente a la actual",
        path: ["newPassword"],
    })

export type PasswordFormValues = z.infer<typeof passwordSchema>

export const useProfile = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { data: session } = useSession()

    const handleSubmit = async (data: PasswordFormValues, onSuccess?: () => void) => {
        setIsLoading(true)

        try {
            // Verificar si tenemos el ID del usuario
            if (!session?.user?.id) {
                throw new Error("No se puede identificar al usuario actual")
            }

            const userId = session.user.id

            // Preparar los datos para enviar al endpoint
            const requestData = {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            }

            // Llamada al endpoint
            const response = await fetch(`/api/profile/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || "Error al cambiar la contraseña")
            }

            // Mostrar notificación de éxito
            toast.success("Contraseña actualizada", {
                description: "Tu contraseña ha sido actualizada correctamente.",
            })

            // Ejecutar callback en caso de éxito (como resetear el formulario)
            if (onSuccess) {
                onSuccess()
            }
        } catch (error) {
            console.error("Error al cambiar la contraseña:", error)

            // Manejo tipado del error
            let errorMessage = "Ocurrió un error al cambiar tu contraseña. Intenta nuevamente."

            if (error instanceof Error) {
                errorMessage = error.message
            }

            toast.error("Error", {
                description: errorMessage,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        handleSubmit
    }
}