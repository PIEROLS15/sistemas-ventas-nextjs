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