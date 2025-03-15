export interface Product {
    id: number;
    sku: string;
    name: string;
    price: number;
    stock: number;
    createdAt: string;
    updatedAt: string;
}

export interface ProductsHeaderProps {
    fetchProducts: () => void;
}

export interface ProductsTableProps {
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => void;
}

export interface ProductsGridProps {
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => void;
}

export interface ProductCardProps {
    product: Product;
    fetchProducts: () => void;
}

export interface ProductDetailsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    product: Product
}

export interface ProductDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product?: Product | null;
    onSuccess: () => void;
}

export interface DeleteProductDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product: Product;
    onDelete: (deletedProductId: number) => void;
}