'use client'

import DashboardShell from "@/components/layout/dashboardShell";
import { ReportsHeader } from "@/components/layout/sales-report/reportsHeader";
import { SalesReportGenerator } from "@/components/layout/sales-report/salesReportGenerator";

const SalesReport = () => {
    return (
        <DashboardShell>
            <ReportsHeader />
            <SalesReportGenerator />
        </DashboardShell>
    );
}

export default SalesReport;