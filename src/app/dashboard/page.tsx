import CardInfo from "@/components/layout/dashboard/cardInfo";
import DashboardHeader from "@/components/layout/dashboard/dashboardHeader";
import InventoryStatus from "@/components/layout/dashboard/inventoryStatus";
import RecentSales from "@/components/layout/dashboard/recentSales";
import TopProducts from "@/components/layout/dashboard/topProducts";
import DashboardShell from "@/components/layout/dashboardShell";

const Dashboard = () => {
    return (
        <DashboardShell>
            <DashboardHeader heading="Dashboard" text="Visualiza las métricas clave de tu negocio">
            </DashboardHeader>
            <CardInfo />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <RecentSales className="h-full" />
                <InventoryStatus className="h-full" />
            </div>
            <TopProducts />
        </DashboardShell>
    );
}

export default Dashboard;