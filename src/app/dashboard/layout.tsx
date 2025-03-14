import HeaderDashboard from "@/components/layout/dashboard/header";
import Sidebar from "@/components/layout/dashboard/sidebar";
import { ReactNode } from 'react';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div>
            <HeaderDashboard />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <main style={{ flex: 1 }}>
                    {children}
                </main>
            </div>
        </div>
    );
}