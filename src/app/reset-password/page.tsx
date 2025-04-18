import { VerifyTokenForm } from "@/components/layout/reset-password/verifyTokenForm"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ThemeToggle from '@/components/ui/themeToggle'

export default function VerifyTokenPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
            <div className="w-full max-w-md">
                <Card className="w-full">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl">Verificar Código</CardTitle>
                        </div>
                        <CardDescription>Ingresa el código de verificación que recibiste en tu correo electrónico</CardDescription>
                        <ThemeToggle />
                    </CardHeader>
                    <CardContent>
                        <VerifyTokenForm />
                    </CardContent>
                    <CardFooter className="flex justify-center border-t p-4">
                        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Sistema de Ventas</p>
                    </CardFooter>
                </Card>
            </div>
        </main>
    )
}
