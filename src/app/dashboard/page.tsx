import CardInfo from "@/components/layout/dashboard/cardInfo";
import DashboardHeader from "@/components/layout/dashboard/dashboardHeader";
import DateRangePicker from "@/components/layout/dashboard/dateRangePicker";
import InventoryStatus from "@/components/layout/dashboard/inventoryStatus";
import RecentSales from "@/components/layout/dashboard/recentSales";
import TopProducts from "@/components/layout/dashboard/topProducts";

const Dashboard = () => {
    return (
        <section className="flex-1 space-y-4 p-4 pt-6 md:p-8">
            <DashboardHeader heading="Dashboard" text="Visualiza las métricas clave de tu negocio">
                <DateRangePicker />
            </DashboardHeader>
            <CardInfo />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <RecentSales className="h-full" />
                <InventoryStatus className="h-full" />
            </div>
            <TopProducts />
        </section>
    );
}

export default Dashboard;