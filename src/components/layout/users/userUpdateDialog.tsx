"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserUpdateDialogProps } from "@/types/users";
import { useRoles } from "@/hooks/useRoles";

const UserUpdateDialog = ({ open, onOpenChange, user, onSuccess }: UserUpdateDialogProps) => {
    const { roles, selectedRole, setSelectedRole, isLoading, updateUserRole } = useRoles(
        open,
        user.role.toString(),
        user.id.toString(),
        onSuccess,
        onOpenChange
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Editar usuario</DialogTitle>
                    <DialogDescription>Modifica el rol del usuario y guarda los cambios.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Nombre completo</label>
                        <Input value={`${user.firstName} ${user.lastName}`} disabled />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Correo electrónico</label>
                        <Input value={user.email} disabled />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Rol</label>
                        <Select
                            value={selectedRole}
                            onValueChange={setSelectedRole}
                            disabled={isLoading || roles.length === 0}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={roles.length === 0 ? "Cargando roles..." : "Selecciona un rol"} />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((role) => (
                                    <SelectItem key={role.id} value={role.id}>
                                        {role.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                        Cancelar
                    </Button>
                    <Button type="button" onClick={updateUserRole} disabled={isLoading || !selectedRole}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Actualizando...
                            </>
                        ) : (
                            "Actualizar usuario"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UserUpdateDialog;