"use client"

import { useState } from "react"
import { MoreHorizontal, Pencil, Eye, Power } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import UserUpdateDialog from "@/components/layout/users/userUpdateDialog"
import UserStatusDialog from "@/components/layout/users/userStatusDialog"
import UserDetailsDialog from "@/components/layout/users/userDetailDialog"
import { User, UsersTableProps } from '@/types/users'
import { formatDateOnly, getRoleuser } from '@/utils/productUtils'
import PaginationComponent from "@/components/layout/pagination";

const UsersTable = ({ users, loading, error, fetchUsers }: UsersTableProps) => {
    const [editUser, setEditUser] = useState<User | null>(null)
    const [statusUser, setStatusUser] = useState<User | null>(null)
    const [viewUser, setViewUser] = useState<User | null>(null)
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    // Función para manejar la actualización de la lista después de editar un usuario
    const handleSuccess = () => {
        fetchUsers();
    };

    // Calcular los usuarios de la página actual
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Función para cambiar de página
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <div>Cargando usuarios...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <Card className="mt-6">
            <CardHeader className="pb-1">
                <CardTitle>Lista de Usuarios</CardTitle>
                <CardDescription>Total: {users.length} usuarios en el sistema</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px] pl-5 text-center">ID</TableHead>
                                    <TableHead className="text-center">Nombre</TableHead>
                                    <TableHead className="text-center">Apellido</TableHead>
                                    <TableHead className="text-center">Correo electrónico</TableHead>
                                    <TableHead className="text-center">Rol</TableHead>
                                    <TableHead className="text-center">Estado</TableHead>
                                    <TableHead className="hidden md:table-cell">Creado</TableHead>
                                    <TableHead className="hidden md:table-cell">Actualizado</TableHead>
                                    <TableHead className="w-[70px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentUsers.map((users) => {
                                    const userRole = getRoleuser(users.roleName);
                                    return (
                                        <TableRow key={users.id}>
                                            <TableCell className="font-medium text-center">{users.id}</TableCell>
                                            <TableCell className="text-center">{users.firstName}</TableCell>
                                            <TableCell className="text-center">{users.lastName}</TableCell>
                                            <TableCell className="text-center">{users.email}</TableCell>
                                            <TableCell className="text-center">{userRole.label}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge
                                                    variant={users.isActive === true ? "default" : "destructive"}
                                                    className="justify-center w-20"
                                                >
                                                    {users.isActive === true ? "Activo" : "Inactivo"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">{formatDateOnly(users.createdAt)}</TableCell>
                                            <TableCell className="hidden md:table-cell">{formatDateOnly(users.updatedAt)}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Abrir menú</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={() => setViewUser(users)}>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            <span>Ver detalles</span>
                                                        </DropdownMenuItem>
                                                        <>
                                                            <DropdownMenuItem onClick={() => setEditUser(users)}>
                                                                <Pencil className="mr-2 h-4 w-4" />
                                                                <span>Editar rol</span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => setStatusUser(users)}>
                                                                <Power className="mr-2 h-4 w-4" />
                                                                <span>{users.isActive === true ? "Desactivar" : "Activar"}</span>
                                                            </DropdownMenuItem>
                                                        </>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="w-full flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Mostrando {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, users.length)} de {users.length} productos
                    </p>
                    <PaginationComponent
                        totalItems={users.length}
                        itemsPerPage={usersPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </CardFooter>

            {editUser &&
                <UserUpdateDialog
                    open={!!editUser}
                    onOpenChange={(open) => !open && setEditUser(null)}
                    user={editUser}
                    onSuccess={handleSuccess}
                />
            }

            {statusUser && (
                <UserStatusDialog
                    open={!!statusUser}
                    onOpenChange={(open) => !open && setStatusUser(null)}
                    user={statusUser}
                    onSuccess={handleSuccess}
                />
            )}

            {viewUser && (
                <UserDetailsDialog
                    open={!!viewUser}
                    onOpenChange={(open) => !open && setViewUser(null)}
                    user={{
                        ...viewUser,
                        createdAt: new Date(viewUser.createdAt).toISOString(),
                        updatedAt: new Date(viewUser.updatedAt).toISOString(),
                    }}
                />
            )}
        </Card >
    )
}

export default UsersTable;