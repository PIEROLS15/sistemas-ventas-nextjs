// Función para determinar el estado del stock
export const getStockStatus = (stock: number) => {
    if (stock <= 5) return { label: "Crítico", variant: "destructive" as const };
    if (stock <= 15) return { label: "Bajo", variant: "outline" as const };
    if (stock <= 30) return { label: "Medio", variant: "secondary" as const };
    return { label: "Óptimo", variant: "default" as const };
};

// Función para formatear precio
export const formatPrice = (price: number | string) => {
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    return `S/ ${numericPrice.toFixed(2)}`;
};

// Función para formatear fecha con hora
export const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date));
};

// Función para formatear fecha
export const formatDateOnly = (date: string) => {
    return new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(new Date(date));
};

//Función para determinar el esado de la venta
export const getStatusBadge = (status: string) => {
    switch (status) {
        case "Completed":
            return { label: "Completada", variant: "default" as const }
        case "Pending":
            return { label: "Pendiente", variant: "outline" as const }
        case "Canceled":
            return { label: "Cancelada", variant: "destructive" as const }
        default:
            return { label: status, variant: "secondary" as const }
    }
}

// Función para determinar el estado del usuario
export const getStatusUser = (isActive: boolean) => {
    if (isActive === false) return { label: "Inactivo", variant: "destructive" as const };
    return { label: "Activo", variant: "default" as const };
};

export const getRoleuser = (roleName: string) => {
    if (roleName === "Seller") {
        return { label: "Vendedor", variant: "destructive" as const };
    } else if (roleName === "Admin") {
        return { label: "Administrador", variant: "default" as const };
    }
    return { label: "Desconocido", variant: "default" as const };
};
