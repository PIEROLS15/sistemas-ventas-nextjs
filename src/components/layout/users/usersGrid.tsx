"use client";

import { useState } from "react";
import { UserCard } from "@/components/layout/users/userCard";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UsersGridProps } from '@/types/users';
import PaginationComponent from "@/components/layout/pagination";

const UsersGrid = ({ users, loading, error, fetchUsers }: UsersGridProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const salesPerPage = 10;

    // Calcular los productos de la página actual
    const indexOfLastSale = currentPage * salesPerPage;
    const indexOfFirstSale = indexOfLastSale - salesPerPage;
    const currentSales = users.slice(indexOfFirstSale, indexOfLastSale);

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
                <CardDescription>Total: {users.length} usuarios en el sitema</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {currentSales.map((users) => (
                        <UserCard
                            key={users.id}
                            users={{
                                ...users,
                                createdAt: new Date(users.createdAt).toISOString(),
                                updatedAt: new Date(users.updatedAt).toISOString(),
                            }}
                            fetchUsers={fetchUsers}
                        />
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <div className="w-full flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Mostrando {indexOfFirstSale + 1}-{Math.min(indexOfLastSale, users.length)} de {users.length} productos
                    </p>
                    <PaginationComponent
                        totalItems={users.length}
                        itemsPerPage={salesPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </CardFooter>
        </Card>
    );
};

export default UsersGrid;