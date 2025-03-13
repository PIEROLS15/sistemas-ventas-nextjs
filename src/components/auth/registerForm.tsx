"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { signIn } from "next-auth/react";

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: form.firstName,
                    lastName: form.lastName,
                    email: form.email,
                    password: form.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error en el registro");
            }

            // Iniciar sesión automáticamente después del registro
            const result = await signIn("credentials", {
                redirect: false,
                email: form.email,
                password: form.password,
            });

            if (result?.error) {
                throw new Error(result.error);
            }

            toast.success("Registro exitoso");

            // Redirigir al usuario a /dashboard
            router.push("/dashboard");

        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : "Error en el registro");
        } finally {
            setIsLoading(false);
        }
    };

    const fields = [
        { id: "firstName", name: "firstName", label: "Nombres", type: "text", placeholder: "Ingresa tus nombres" },
        { id: "lastName", name: "lastName", label: "Apellidos", type: "text", placeholder: "Ingresa tus apellidos" },
        { id: "email", name: "email", label: "Correo electrónico", type: "email", placeholder: "Ingresa tu correo" },
        { id: "password", name: "password", label: "Contraseña", type: "password", placeholder: "••••••••" },
        { id: "confirmPassword", name: "confirmPassword", label: "Confirmar contraseña", type: "password", placeholder: "••••••••" },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ id, name, label, type, placeholder }) => (
                <div key={id} className="space-y-2">
                    <label htmlFor={id}>{label}</label>
                    <Input id={id} name={name} type={type} placeholder={placeholder} disabled={isLoading} onChange={handleChange} />
                </div>
            ))}

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creando cuenta...
                    </>
                ) : (
                    "Crear cuenta"
                )}
            </Button>
            <ToastContainer position="top-right" autoClose={1000} toastClassName="toast-custom" />
        </form>
    );
};

export default RegisterForm;
