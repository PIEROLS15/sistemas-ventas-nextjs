'use client'

import ProductsHeader from "@/components/layout/products/productsHeader"
import ProductsTable from "@/components/layout/products/productsTable"
import DashboardShell from "@/components/layout/dashboardShell";
import useProducts from "@/hooks/useProducts";

const ProductsPage = () => {
    const { products, loading, error, fetchProducts } = useProducts();

    return (
        <DashboardShell>
            <ProductsHeader fetchProducts={fetchProducts} />
            <ProductsTable products={products} loading={loading} error={error} fetchProducts={fetchProducts} />
        </DashboardShell>
    )
}

export default ProductsPage;