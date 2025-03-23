import { useState, useEffect } from "react";
import { User } from "@/types/users";

const useUser = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Función para obtener usuarios
    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/users");
            if (!response.ok) {
                throw new Error("Error al obtener los usuarios");
            }
            const data = await response.json();
            setUsers(data);

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ocurrió un error desconocido");
            }
        } finally {
            setLoading(false);
        }
    }

    //Funcion para activar y desactivar usuarios
    const updateStatusUser = async (userId: number, isActivating: boolean, userData: Partial<User>) => {

        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isActive: isActivating }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Error desconocido");
            }
            return { success: true, message: `El usuario ${userData.firstName} ${userData.lastName} ha sido actualizado correctamente.` }

        } catch (error) {
            void error
            return { success: false, message: "Ocurrió un error al actualizar el estado del usuario. Intenta nuevamente." };
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return { users, loading, error, fetchUsers, updateStatusUser };
}

export default useUser;