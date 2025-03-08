'use client'
import { Button } from "@/components/ui/button";

const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/logout`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Error al cerrar sesión");
        }

        // Eliminar el token del almacenamiento local
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");

        // Redirigir al login
        window.location.href = "/";
    } catch (error) {
        console.error("Error cerrando sesión", error);
    }
};


const LogoutButton = () => {
    return (
        <Button variant="destructive" onClick={handleLogout}>
            Cerrar Sesión
        </Button>
    );
}

export default LogoutButton;