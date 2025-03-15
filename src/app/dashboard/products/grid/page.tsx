'use client'

import ProductsHeader from "@/components/layout/products/productsHeader"
import ProductsGrid from "@/components/layout/products/productsGrid"
import DashboardShell from "@/components/layout/dashboardShell";
import useProducts from "@/hooks/useProducts";

const ProductsGridPage = () => {
    const { products, loading, error, fetchProducts } = useProducts();
    return (
        <DashboardShell>
            <ProductsHeader fetchProducts={fetchProducts} />
            <ProductsGrid products={products} loading={loading} error={error} fetchProducts={fetchProducts} />
        </DashboardShell>
    )
}

export default ProductsGridPage;

