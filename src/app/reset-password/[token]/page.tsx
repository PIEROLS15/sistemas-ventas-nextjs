'use client';

import { useSearchParams } from 'next/navigation';
import { use } from 'react';
import ResetPasswordForm from "@/components/layout/reset-password/resetPasswordForm";
import {
    Card, CardContent, CardDescription, CardFooter,
    CardHeader, CardTitle
} from "@/components/ui/card";
import ThemeToggle from '@/components/ui/themeToggle';

interface ResetPasswordPageProps {
    params: Promise<{
        token: string;
    }>;
}

const ResetPasswordPage = ({ params }: ResetPasswordPageProps) => {
    const { token } = use(params);
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
            <div className="w-full max-w-md">
                <Card className="w-full">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl">Restablecer Contraseña</CardTitle>
                            <ThemeToggle />
                        </div>
                        <CardDescription>
                            Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResetPasswordForm token={token} email={email} />
                    </CardContent>
                    <CardFooter className="flex justify-center border-t p-4">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} Sistema de Ventas
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
}

export default ResetPasswordPage;