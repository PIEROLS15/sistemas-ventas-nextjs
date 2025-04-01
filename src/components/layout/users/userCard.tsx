"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Power, Pencil } from "lucide-react";
import UserDetailsDialog from "@/components/layout/users/userDetailDialog"
import UserStatusDialog from "@/components/layout/users/userStatusDialog"
import UserUpdateDialog from "@/components/layout/users/userUpdateDialog"
import { getStatusUser, getRoleuser } from '@/utils/productUtils';
import { UserCardProps, User } from '@/types/users';

export function UserCard({ users, fetchUsers }: UserCardProps) {
    const [editUser, setEditUser] = useState<User | null>(null)
    const [statusUser, setStatusUser] = useState<User | null>(null)
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);

    const userStatus = getStatusUser(users.isActive);
    const userRole = getRoleuser(users.roleName)

    const handleSuccess = () => {
        fetchUsers();
    };

    return (
        <>
            <Card className="h-full flex flex-col">
                <CardContent className="flex-1 pt-6">
                    <div className="space-y-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium text-lg">{users.firstName} {users.lastName}</h3>
                                <p className="text-sm text-muted-foreground">{users.email}</p>
                            </div>
                            <Badge variant={userStatus.variant}>
                                {userStatus.label}
                            </Badge>
                        </div>
                        <p className="text-2xl font-bold">{userRole.label}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline" size="sm" onClick={() => setShowDetailsDialog(true)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                    </Button>

                    <Button
                        onClick={() => setEditUser(users)}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <Pencil className="h-4 w-4" />
                        Editar rol
                    </Button>

                    <Button
                        onClick={() => setStatusUser(users)}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <Power className="h-4 w-4" />
                        {users.isActive ? "Desactivar" : "Activar"}
                    </Button>

                </CardFooter>
            </Card>

            {showDetailsDialog && (
                <UserDetailsDialog
                    open={!!showDetailsDialog}
                    onOpenChange={(open) => !open && setShowDetailsDialog(open)}
                    user={{
                        ...users,
                        createdAt: new Date(users.createdAt).toISOString(),
                        updatedAt: new Date(users.updatedAt).toISOString(),
                    }}
                />
            )}

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

        </>
    );
}