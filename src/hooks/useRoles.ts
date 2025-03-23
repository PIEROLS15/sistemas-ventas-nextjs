"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Role } from '@/types/users'

export function useRoles(
    open: boolean,
    userRole: string | number,
    userId: string,
    onSuccess: () => void,
    onOpenChange: (open: boolean) => void
) {
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchRoles() {
            try {
                const response = await fetch("/api/roles");
                const data: Role[] = await response.json();
                setRoles(data);

                if (open) {
                    const currentRole = data.find((role) => role.id.toString() === userRole.toString());
                    setSelectedRole(currentRole ? currentRole.id : "");
                }
            } catch (error) {
                console.error("Error al obtener los roles:", error);
                toast.error("No se pudieron cargar los roles.");
            }
        }

        if (open) {
            fetchRoles();
        }
    }, [open, userRole]);

    async function updateUserRole() {
        if (!selectedRole) {
            toast.error("Debes seleccionar un rol.");
            return;
        }
        if (isLoading) return

        setIsLoading(true);

        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ roleId: selectedRole }),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el rol del usuario");
            }

            toast.success("Usuario actualizado", {
                description: "El rol ha sido actualizado correctamente.",
            });

            onOpenChange(false);
            onSuccess();
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            toast.error("Error", {
                description: "Ocurrió un error al actualizar el usuario. Intenta nuevamente.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return { roles, selectedRole, setSelectedRole, isLoading, updateUserRole };
}
