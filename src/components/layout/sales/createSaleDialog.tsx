"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import useIdentification from "@/hooks/useIdentification"
import useProducts from "@/hooks/useProducts"
import { formatPrice } from '@/utils/productUtils'
import { CreateSaleDialogProps } from "@/types/sales";
import useSales from "@/hooks/useSales"

const saleSchema = z.object({
    customerName: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres",
    }),
    identificationType: z.string({
        required_error: "Selecciona un tipo de identificación",
    }),
    identificationNumber: z.string().min(1, {
        message: "El número de identificación es requerido",
    }),
    email: z.string().email({
        message: "Debe ser un correo electrónico válido",
    }),
    products: z
        .array(
            z.object({
                id: z.string(),
                quantity: z.coerce.number().min(1, {
                    message: "La cantidad debe ser al menos 1",
                }),
            }),
        )
        .min(1, {
            message: "Debe agregar al menos un producto",
        }),
})

type SaleFormValues = z.infer<typeof saleSchema>

const CreateSaleDialog = ({ open, onOpenChange, onSuccess }: CreateSaleDialogProps) => {
    const [isLoading] = useState(false)
    const { identification, loading: loadingIdentifications } = useIdentification()
    const { products: availableProducts, loading: loadingProducts } = useProducts()
    const { createSale } = useSales();

    const form = useForm<SaleFormValues>({
        resolver: zodResolver(saleSchema),
        defaultValues: {
            customerName: "",
            identificationType: "",
            identificationNumber: "",
            email: "",
            products: [{ id: "", quantity: 1 }],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "products",
    })

    const watchedProducts = form.watch("products")

    const calculateTotal = () => {
        let total = 0
        watchedProducts.forEach((product) => {
            if (product.id) {
                const productData = availableProducts.find(p => p.id.toString() === product.id)
                if (productData) {
                    total += Number(productData.price) * product.quantity
                }
            }
        })
        return total
    }

    const formattedTotal = formatPrice(calculateTotal())

    const getAvailableProducts = (currentIndex: number) => {
        const currentProductId = form.getValues(`products.${currentIndex}.id`)
        return availableProducts.filter(product => {
            if (product.id.toString() === currentProductId) return true
            return !watchedProducts.some((p, idx) =>
                idx !== currentIndex && p.id === product.id.toString()
            )
        })
    }

    async function onSubmit(data: SaleFormValues) {
        const result = await createSale(data);

        if (result.success) {
            toast.success("Venta creada", {
                description: `La venta ${result.saleCode} ha sido registrada correctamente.`,
            });
            form.reset();
            onOpenChange(false);
            onSuccess();
        } else {
            toast.error("Error", {
                description: result.message,
            });
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Crear nueva venta</DialogTitle>
                    <DialogDescription>Completa los detalles para registrar una nueva venta.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Información del cliente</h3>
                            <FormField
                                control={form.control}
                                name="customerName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre del cliente</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ej: Juan Pérez" {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="identificationType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tipo de identificación</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                disabled={isLoading || loadingIdentifications}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccionar tipo" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {identification.map((idType) => (
                                                        <SelectItem key={idType.id} value={idType.id.toString()}>
                                                            {idType.type}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="identificationNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Número de identificación</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ej: 12345678" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo electrónico</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ej: cliente@ejemplo.com" {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium">Productos</h3>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => append({ id: "", quantity: 1 })}
                                    disabled={isLoading || loadingProducts}
                                >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Agregar producto
                                </Button>
                            </div>

                            {loadingProducts ? (
                                <div className="flex justify-center items-center h-32">
                                    <Loader2 className="h-8 w-8 animate-spin" />
                                </div>
                            ) : (
                                <>
                                    {fields.map((field, index) => (
                                        <div key={field.id} className="space-y-4 p-4 pb-6 border rounded-md relative">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="text-sm font-medium">Producto {index + 1}</h4>
                                                {fields.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 rounded-full p-0"
                                                        onClick={() => remove(index)}
                                                        disabled={isLoading}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name={`products.${index}.id`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Producto</FormLabel>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                value={field.value}
                                                                disabled={isLoading || loadingProducts}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Seleccionar producto" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {getAvailableProducts(index).map((product) => (
                                                                        <SelectItem
                                                                            key={product.id}
                                                                            value={product.id.toString()}
                                                                        >
                                                                            {product.name} - {formatPrice(product.price)}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name={`products.${index}.quantity`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Cantidad</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    min="1"
                                                                    {...field}
                                                                    disabled={isLoading || loadingProducts}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    {form.formState.errors.products?.root && (
                                        <p className="text-sm font-medium text-destructive">
                                            {form.formState.errors.products.root.message}
                                        </p>
                                    )}

                                    <div className="flex justify-end items-center space-x-2 pt-2">
                                        <span className="text-sm font-medium text-muted-foreground">Total:</span>
                                        <span className="text-lg font-bold">{formattedTotal}</span>
                                    </div>
                                </>
                            )}
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    form.reset()
                                    onOpenChange(false)
                                }}
                                disabled={isLoading || loadingProducts}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading || loadingProducts || availableProducts.length === 0}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creando venta...
                                    </>
                                ) : (
                                    "Crear venta"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateSaleDialog