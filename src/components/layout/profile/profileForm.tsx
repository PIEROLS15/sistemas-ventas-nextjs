import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getRoleuser } from "@/utils/productUtils";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
    role: string;
}

const ProfileForm = () => {
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            const user: User = {
                id: parseInt(session.user.id as string),
                firstName: session.user.firstName || "",
                lastName: session.user.lastName || "",
                email: session.user.email || "",
                roleId: session.user.roleId,
                role: session.user.role || "Sin Rol",
            };
            setUserData(user);
        }
    }, [session, status]);

    if (status === "loading") {
        return <p>Cargando...</p>;
    }

    if (!userData) {
        return <p>No estás autenticado. Por favor inicia sesión.</p>;
    }

    const roleInfo = getRoleuser(userData.role);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>
                    Tus datos de perfil. No pueden ser modificados.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Nombre</label>
                        <Input value={userData.firstName} disabled />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Apellido</label>
                        <Input value={userData.lastName} disabled />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Correo electrónico</label>
                        <Input value={userData.email} disabled />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Rol</label>
                        <div className="flex items-center h-10 px-3 border rounded-md bg-muted/50">
                            <span className="text-muted-foreground">{roleInfo.label}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProfileForm;
