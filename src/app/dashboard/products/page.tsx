import ProductsHeader from "@/components/layout/products/productsHeader"
import ProductsTable from "@/components/layout/products/productsTable"
import DashboardShell from "@/components/layout/dashboardShell";

const ProductsPage = () => {
    return (
        <DashboardShell>
            <ProductsHeader />
            <ProductsTable />
        </DashboardShell>
    )
}

export default ProductsPage;