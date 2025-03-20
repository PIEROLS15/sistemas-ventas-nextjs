"use client";

import { useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DeleteProductDialogProps } from "@/types/products";
import useProducts from "@/hooks/useProducts";

const DeleteProductDialog = ({ open, onOpenChange, product, onDelete }: DeleteProductDialogProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { deleteProduct } = useProducts();

    async function handleDelete() {
        setIsLoading(true);

        try {
            const result = await deleteProduct(product.id);

            if (result.success) {
                toast.success("Producto eliminado", { description: result.message });
            } else {
                toast.error("Error", { description: result.message });
            }
            onDelete(product.id);
            onOpenChange(false);

        } catch (error) {
            void error
            toast.error("Error", {
                description: "Ocurrió un error al eliminar el producto. Intenta nuevamente.",
            });

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        Eliminar producto
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        ¿Estás seguro de que deseas eliminar el producto <strong>{product.name}</strong>? Esta acción no se puede
                        deshacer y eliminará permanentemente este producto del inventario.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
                    <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Eliminando...
                            </>
                        ) : (
                            "Eliminar"
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteProductDialog;