"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { toast, ToastContainer } from "react-toastify";


const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false)

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        contrasena: "",
        repetirContrasena: ""
    });

    const API_BACKEND = process.env.NEXT_PUBLIC_API_BACKEND;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.contrasena !== form.repetirContrasena) {
            toast.error("Las contraseñas no coinciden");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${API_BACKEND}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre: form.nombre,
                    apellido: form.apellido,
                    correo: form.correo,
                    password: form.contrasena
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(JSON.stringify(data));
            }

            toast.success("Registro exitoso");
        } catch (error: unknown) {
            let errorMessage = "Error en el registro";

            if (error instanceof Error) {
                try {
                    const parsedError = JSON.parse(error.message);
                    errorMessage = parsedError.message || errorMessage;
                } catch {
                    errorMessage = error.message;
                }
            } else if (typeof error === "object" && error !== null) {
                if ("message" in error && typeof error.message === "string") {
                    errorMessage = error.message;
                } else {
                    errorMessage = JSON.stringify(error);
                }
            }
            toast.error(errorMessage);
        } finally {
            setIsLoading(false)
        }
    };

    const fields = [
        { id: "nombre", name: "nombre", label: "Nombres Completos", type: "text", placeholder: "Ingresa tus nombres" },
        { id: "apellido", name: "apellido", label: "Apellidos Completos", type: "text", placeholder: "Ingresa tus apellidos" },
        { id: "correo", name: "correo", label: "Correo electrónico", type: "email", placeholder: "Ingresa tu correo electrónico" },
        { id: "contrasena", name: "contrasena", label: "Contraseña", type: "password", placeholder: "••••••••" },
        { id: "repetirContrasena", name: "repetirContrasena", label: "Confirmar contraseña", type: "password", placeholder: "••••••••" },
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
    )
}

export default RegisterForm;
