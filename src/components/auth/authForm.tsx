"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import LoginForm from "@/components/auth/loginForm"
import RegisterForm from '@/components/auth/registerForm'
import ResetPasswordForm from '@/components/auth/resetPasswordForm'
import ThemeToggle from "@/components/ui/themeToggle"
import { UserPlus, LogIn, KeyRound } from "lucide-react"
import SocialFooter from "@/components/layout/socialFooter"

const AuthForms = () => {
    const [activeTab, setActiveTab] = useState("login")

    return (
        <Card className="w-full">
            <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Sistema de Ventas</CardTitle>
                    <ThemeToggle />
                </div>
                <CardDescription>
                    {activeTab === "login" && "Ingresa a tu cuenta para continuar"}
                    {activeTab === "register" && "Crea una nueva cuenta"}
                    {activeTab === "reset" && "Recupera el acceso a tu cuenta"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="login" className="flex items-center gap-2">
                            <LogIn className="h-4 w-4" />
                            <span className="hidden sm:inline">Ingresar</span>
                        </TabsTrigger>
                        <TabsTrigger value="register" className="flex items-center gap-2">
                            <UserPlus className="h-4 w-4" />
                            <span className="hidden sm:inline">Registrarse</span>
                        </TabsTrigger>
                        <TabsTrigger value="reset" className="flex items-center gap-2">
                            <KeyRound className="h-4 w-4" />
                            <span className="hidden sm:inline">Recuperar</span>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <LoginForm />
                    </TabsContent>
                    <TabsContent value="register">
                        <RegisterForm />
                    </TabsContent>
                    <TabsContent value="reset">
                        <ResetPasswordForm />
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-4">
                <SocialFooter />
            </CardFooter>
        </Card>
    )
}

export default AuthForms;