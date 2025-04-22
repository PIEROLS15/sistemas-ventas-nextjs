"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Eye, EyeOff, Loader2, CheckCircle } from "lucide-react"

const resetPasswordSchema = z
    .object({
        password: z.string().min(6, {
            message: "La contraseña debe tener al menos 6 caracteres",
        }),
        confirmPassword: z.string().min(6, {
            message: "La confirmación de contraseña debe tener al menos 6 caracteres",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    })

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

interface ResetPasswordFormProps {
    token: string
    email: string
}

const ResetPasswordForm = ({ token, email }: ResetPasswordFormProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const router = useRouter()

    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(data: ResetPasswordFormValues) {
        setIsLoading(true)

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    token,
                    password: data.password,
                }),
            })

            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.message || "Ocurrió un error al restablecer la contraseña")
            }

            toast.success("Tu contraseña ha sido restablecida correctamente. Serás redirigido a la página de inicio de sesión.")

            setTimeout(() => {
                router.push("/")
            }, 3000)
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err);
                toast.error(err.message || "El código de verificación es inválido o ha expirado.");
            } else {
                console.error("Error desconocido", err);
                toast.error("Ha ocurrido un error inesperado.");
            }

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nueva contraseña</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                            tabIndex={-1}
                                            disabled={isLoading}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                            <span className="sr-only">
                                                {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                            </span>
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirmar nueva contraseña</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            tabIndex={-1}
                                            disabled={isLoading}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                            <span className="sr-only">
                                                {showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                            </span>
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Tu contraseña debe tener al menos 6 caracteres y ser segura.</p>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Restableciendo contraseña...
                        </>
                    ) : (
                        <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Restablecer contraseña
                        </>
                    )}
                </Button>
            </form>
        </Form>
    )
}

export default ResetPasswordForm;