import HeaderDashboard from "@/components/layout/header";
import Sidebar from "@/components/layout/dashboard/sidebar";
import { ReactNode } from 'react';
import { Toaster } from "sonner"

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
                <Toaster richColors closeButton position="top-right" />
            </div>
        </div>
    );
}