'use client'

import DashboardShell from "@/components/layout/dashboardShell";
import SalesGrid from "@/components/layout/sales/salesGrid";
import SalesHeader from "@/components/layout/sales/salesHeader";
import useSales from "@/hooks/useSales";

const Sales = () => {
    const { sales, loading, error, fetchSales } = useSales();

    return (
        <DashboardShell>
            <SalesHeader fetchSales={fetchSales} />
            <SalesGrid sales={sales} loading={loading} error={error} fetchSales={fetchSales} />
        </DashboardShell>
    );
}

export default Sales;