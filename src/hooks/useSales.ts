import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Sale, SaleData } from "@/types/sales";
import { useSession } from "next-auth/react"

const useSales = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { data: session } = useSession();

    // Obtener ventas
    const fetchSales = async () => {
        try {
            const response = await fetch("/api/sales");
            if (!response.ok) {
                throw new Error("Error al obtener las ventas");
            }
            const data = await response.json();
            setSales(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Ocurrió un error desconocido");
        } finally {
            setLoading(false);
        }
    };

    const createSale = async (data: SaleData) => {
        setLoading(true);

        try {
            if (!session?.user?.id) {
                throw new Error("No se pudo identificar al vendedor");
            }

            const sellerId = parseInt(session.user.id);
            if (isNaN(sellerId)) {
                throw new Error("ID de vendedor inválido");
            }

            const requestData = {
                cliente_nombre: data.customerName,
                identificacion_id: parseInt(data.identificationType),
                numero_identificacion: data.identificationNumber,
                cliente_correo: data.email,
                sellerId: sellerId,
                products: data.products.map(product => ({
                    id: parseInt(product.id),
                    cantidad: product.quantity
                }))
            };

            const response = await fetch('/api/sales', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al crear la venta');
            }

            const result = await response.json();
            return { success: true, saleCode: result.saleCode };

        } catch (error) {
            console.error("Error al crear la venta:", error);
            return { success: false, message: error instanceof Error ? error.message : "Error desconocido" };
        } finally {
            setLoading(false);
        }
    }

    // Actualizar estado de una venta
    const updateSaleStatus = async (saleId: number, newStatus: "Completed" | "Canceled", onOpenChange: (open: boolean) => void, onSuccess: () => void) => {
        try {
            const response = await fetch(`/api/sales/${saleId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${await response.text()}`);
            }

            const updatedSale = await response.json();

            setSales((prevSales) =>
                prevSales.map((sale) =>
                    sale.id === saleId ? { ...sale, status: updatedSale.status } : sale
                )
            );

            toast.success("Estado de venta actualizado", {
                description: `La venta ${updatedSale.saleCode} ha sido marcada como ${updatedSale.status}.`,
            });

            onOpenChange(false);
            onSuccess();
        } catch (error) {
            console.error("Error al cambiar el estado de la venta:", error);
            toast.error("Error", { description: "Ocurrió un error al actualizar el estado de la venta. Intenta nuevamente." });
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    return { sales, loading, error, fetchSales, updateSaleStatus, createSale };
};

export default useSales;
