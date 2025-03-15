"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useProducts from "@/hooks/useProducts";
import { ProductDialogProps } from "@/types/products";

// Esquema de validación para el formulario
const productSchema = z.object({
    sku: z.string().min(3, {
        message: "El SKU debe tener al menos 3 caracteres",
    }),
    name: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres",
    }),
    price: z.coerce.number().min(0, {
        message: "El precio no puede ser negativo",
    }),
    stock: z.coerce.number().int().min(0, {
        message: "El stock no puede ser negativo",
    }),
});

type ProductFormValues = z.infer<typeof productSchema>;

const ProductDialog = ({ open, onOpenChange, product, onSuccess }: ProductDialogProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const isEditing = !!product;
    const { createProduct, updateProduct } = useProducts();

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            sku: product?.sku || "",
            name: product?.name || "",
            price: product?.price || 0,
            stock: product?.stock || 0,
        },
    });

    async function onSubmit(data: ProductFormValues) {
        setIsLoading(true);

        try {
            const productData = {
                ...data,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            if (isEditing && product) {
                await updateProduct(product.id, data);
            } else {
                await createProduct(productData);
            }

            toast.success(isEditing ? "Producto actualizado" : "Producto creado", {
                description: isEditing
                    ? `El producto ${data.name} ha sido actualizado correctamente.`
                    : `El producto ${data.name} ha sido creado correctamente.`,
            });

            onOpenChange(false);
            onSuccess();
        } catch (error) {
            console.error("Error al guardar el producto:", error);
            toast.error("Error", {
                description: "Ocurrió un error al guardar el producto. Intenta nuevamente.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Editar producto" : "Crear nuevo producto"}</DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Modifica los detalles del producto y guarda los cambios."
                            : "Completa los detalles del nuevo producto para agregarlo al inventario."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="sku"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>SKU</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ej: PRD-001" {...field} disabled={isLoading || isEditing} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre del producto</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ej: Smartphone X" {...field} disabled={isLoading} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Precio</FormLabel>
                                        <FormControl>
                                            <Input type="number" step="0.01" placeholder="0.00" {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="stock"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Stock</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="0" {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {isEditing ? "Actualizando..." : "Guardando..."}
                                    </>
                                ) : isEditing ? (
                                    "Actualizar producto"
                                ) : (
                                    "Crear producto"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDialog;