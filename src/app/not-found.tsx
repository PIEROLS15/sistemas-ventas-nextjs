import Link from "next/link"
import { ShoppingCart, Home, ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 md:p-8 relative overflow-hidden">
            {/* Fondo decorativo */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-4 opacity-[0.03] dark:opacity-[0.05] -z-10">
                {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-center">
                        <ShoppingCart className="h-12 w-12" />
                    </div>
                ))}
            </div>

            <div className="relative z-10 mx-auto max-w-3xl w-full text-center space-y-8">
                <div className="space-y-2">
                    <h1 className="text-9xl font-bold text-primary">404</h1>
                    <h2 className="text-3xl font-bold">Página no encontrada</h2>
                    <p className="text-xl text-muted-foreground mt-2">
                        Lo sentimos, no pudimos encontrar la página que estás buscando.
                    </p>
                </div>

                <div className="h-0.5 w-1/3 bg-border mx-auto"></div>

                <div className="space-y-2">
                    <p className="text-muted-foreground">
                        Es posible que la página haya sido movida, eliminada o que hayas ingresado una URL incorrecta.
                    </p>
                    <p className="text-muted-foreground">
                        Verifica la URL o utiliza una de las siguientes opciones para continuar.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Button asChild size="lg" className="gap-2">
                        <Link href="/dashboard">
                            <Home className="h-5 w-5" />
                            Ir al Dashboard
                        </Link>
                    </Button>
                    <Button variant="outline" asChild size="lg" className="gap-2">
                        <Link href="/">
                            <ArrowLeft className="h-5 w-5" />
                            Volver al inicio
                        </Link>
                    </Button>
                    <Button variant="outline" asChild size="lg" className="gap-2">
                        <Link href="/dashboard">
                            <Search className="h-5 w-5" />
                            Buscar
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Sistema de Ventas</p>
            </div>
        </div>
    )
}

