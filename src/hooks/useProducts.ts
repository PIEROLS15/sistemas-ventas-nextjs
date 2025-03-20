import { useState, useEffect } from "react";
import { Product } from "@/types/products";

const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Función para obtener productos
    const fetchProducts = async () => {
        try {
            const response = await fetch("/api/products");
            if (!response.ok) {
                throw new Error("Error al obtener los productos");
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ocurrió un error desconocido");
            }
        } finally {
            setLoading(false);
        }
    };

    // Función para crear un producto
    const createProduct = async (productData: Omit<Product, "id">) => {
        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error("Error al crear el producto");
            }

            const newProduct = await response.json();
            setProducts((prevProducts) => [...prevProducts, newProduct]);
            return { success: true, message: `El producto ${newProduct.name} ha sido creado correctamente.` }

        } catch (error) {
            void error;
            return { success: false, message: "Ocurrió un error al crear el producto. Intenta nuevamente." };
        }
    };

    // Función para actualizar un producto
    const updateProduct = async (productId: number, productData: Partial<Product>) => {
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el producto");
            }

            const updatedProduct = await response.json();
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === productId ? { ...product, ...updatedProduct } : product
                )
            );
            return { success: true, message: `El producto ${updatedProduct.name} ha sido actualizado correctamente.` }
        } catch (error) {

            void error
            return { success: false, message: "Ocurrió un error al actualizar el producto. Intenta nuevamente." };
        }
    };

    // Función para eliminar un producto
    const deleteProduct = async (productId: number): Promise<{ success: boolean; message: string }> => {
        try {
            const product = products.find((p) => p.id === productId);
            const productName = product ? product.name : "Desconocido";

            const response = await fetch(`/api/products/${productId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Error al eliminar el producto");
            }

            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== productId)
            );

            return { success: true, message: `El producto ${productName} ha sido eliminado correctamente.` };
        } catch (error) {

            void error;
            return { success: false, message: "Ocurrió un error al eliminar el producto. Intenta nuevamente." };
        }
    };


    useEffect(() => {
        fetchProducts();
    }, []);

    return { products, loading, error, fetchProducts, createProduct, updateProduct, deleteProduct };
};

export default useProducts;