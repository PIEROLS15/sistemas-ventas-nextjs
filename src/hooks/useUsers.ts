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
                return {
                    success: false,
                    message: result.error || "Ocurrió un error al actualizar el usuario. Intenta nuevamente.",
                };
            }

            return {
                success: true,
                message: `El usuario ${userData.firstName} ${userData.lastName} ha sido ${isActivating ? "activado" : "desactivado"} correctamente.`,
            };

        } catch (error: unknown) {
            let errorMessage = "Error de red. Intenta nuevamente.";

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            return {
                success: false,
                message: errorMessage,
            };
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return { users, loading, error, fetchUsers, updateStatusUser };
}

export default useUser;