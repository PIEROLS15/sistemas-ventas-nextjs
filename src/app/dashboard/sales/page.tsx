'use client'

import DashboardShell from "@/components/layout/dashboardShell";
import SalesHeader from "@/components/layout/sales/salesHeader";
import SalesTable from "@/components/layout/sales/salesTable";
import useSales from "@/hooks/useSales";

const Sales = () => {
    const { sales, loading, error, fetchSales } = useSales();

    return (
        <DashboardShell>
            <SalesHeader fetchSales={fetchSales} />
            <SalesTable sales={sales} loading={loading} error={error} fetchSales={fetchSales} />
        </DashboardShell>
    );
}

export default Sales;