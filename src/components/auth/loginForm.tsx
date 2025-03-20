"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await signIn("credentials", {
            redirect: false,
            email: form.email,
            password: form.password,
        });

        if (result?.error) {
            toast.error("Error en el inicio de sesión: " + result.error);
        } else {
            toast.success("Inicio de sesión exitoso");
            router.push("/dashboard");
        }

        setIsLoading(false);
    };

    const fields = [
        { id: "email", name: "email", label: "Correo electrónico", type: "email", placeholder: "Ingresa tu correo electrónico" },
        { id: "password", name: "password", label: "Contraseña", type: "password", placeholder: "••••••••" },
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
                        Iniciando sesión...
                    </>
                ) : (
                    "Iniciar sesión"
                )}
            </Button>
        </form>
    );
};

export default LoginForm;
