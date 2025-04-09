"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

const resetSchema = z.object({
    email: z.string().email({ message: "Correo electrónico inválido" }),
})

type ResetFormValues = z.infer<typeof resetSchema>

const ResetPasswordForm = () => {
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ResetFormValues>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(data: ResetFormValues) {
        setIsLoading(true)

        try {
            // Simulación de envío de correo
            await new Promise((resolve) => setTimeout(resolve, 1500))
            console.log("Reset password for:", data)
            // Aquí iría la lógica real de recuperación
            toast.success("Se ha enviado un correo con instrucciones para restablecer tu contraseña.")
            reset()
        } catch (err) {
            void err
            toast.error("Ocurrió un error al enviar el correo. Intenta nuevamente.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    {...register("email")}
                    disabled={isLoading}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
                <p>Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.</p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando instrucciones...
                    </>
                ) : (
                    "Recuperar contraseña"
                )}
            </Button>
        </form>
    )
}

export default ResetPasswordForm
