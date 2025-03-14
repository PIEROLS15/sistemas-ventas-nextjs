import ProductsHeader from "@/components/layout/products/productsHeader"
import ProductsGrid from "@/components/layout/products/productsGrid"
import DashboardShell from "@/components/layout/dashboardShell";

const ProductsGridPage = () => {
    return (
        <DashboardShell>
            <ProductsHeader />
            <ProductsGrid />
        </DashboardShell>
    )
}

export default ProductsGridPage;

