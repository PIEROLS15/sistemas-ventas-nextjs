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
import { Loader2 } from "lucide-react"

const verifyTokenSchema = z.object({
    token: z.string().min(6, {
        message: "El código de verificación debe tener al menos 6 caracteres",
    }),
})

type VerifyTokenFormValues = z.infer<typeof verifyTokenSchema>

export function VerifyTokenForm() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<VerifyTokenFormValues>({
        resolver: zodResolver(verifyTokenSchema),
        defaultValues: {
            token: "",
        },
    })

    async function onSubmit(data: VerifyTokenFormValues) {
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/verify-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: data.token }),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Token inválido");
            }

            // Redirige con el token y el email como query param
            router.push(`/reset-password/${data.token}?email=${encodeURIComponent(result.email)}`);

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err);
                toast.error(err.message || "El código de verificación es inválido o ha expirado.");
            } else {
                console.error("Error desconocido", err);
                toast.error("Ha ocurrido un error inesperado.");
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="token"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Código de verificación</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ingresa el código de 6 dígitos"
                                        {...field}
                                        disabled={isLoading}
                                        className="text-center text-lg tracking-widest"
                                        maxLength={6}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                        Ingresa el código de verificación que recibiste en tu correo electrónico. Si no lo encuentras, revisa tu carpeta de spam.
                    </p>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verificando...
                        </>
                    ) : (
                        "Verificar código"
                    )}
                </Button>
            </form>
        </Form>
    )
}