"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Calendar, Mail, Shield } from "lucide-react"
import { UserDetailsDialogProps } from "@/types/users"
import { formatDate } from '@/utils/productUtils'

const UserDetailsDialog = ({ open, onOpenChange, user }: UserDetailsDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{user.firstName} {user.lastName}</DialogTitle>
                    <DialogDescription>Detalles completos del usuario</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-sm font-medium">ID de Usuario</p>
                                <p className="text-sm text-muted-foreground">{user.id}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Mail className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-sm font-medium">Correo electrónico</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-sm font-medium">Rol</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-muted-foreground">{user.roleName}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="h-5 w-5 flex items-center justify-center">
                                <div
                                    className={`h-3 w-3 rounded-full ${user.isActive === true ? "bg-green-500" : "bg-gray-400"}`}
                                ></div>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Estado</p>
                                <div className="flex items-center gap-2">
                                    <Badge variant={user.isActive === true ? "default" : "destructive"}>
                                        {user.isActive === true ? "Activo" : "Inactivo"}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-sm font-medium">Creado</p>
                                <p className="text-sm text-muted-foreground">{formatDate(user.createdAt)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            <div>
                                <p className="text-sm font-medium">Última actualización</p>
                                <p className="text-sm text-muted-foreground">{formatDate(user.updatedAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UserDetailsDialog;