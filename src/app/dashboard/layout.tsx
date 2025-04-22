import HeaderDashboard from "@/components/layout/header";
import Sidebar from "@/components/layout/dashboard/sidebar";
import { ReactNode } from 'react';
import { Toaster } from "sonner"
import DashboardSocialFooter from "@/components/layout/dashboardFooter";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <HeaderDashboard />
            <div className="flex flex-1">
                <Sidebar />
                <div className="flex flex-col flex-1">
                    <main className="flex-1 p-4">
                        {children}
                    </main>
                    <DashboardSocialFooter />
                </div>
            </div>
            <Toaster richColors closeButton position="top-right" />
        </div>
    );
}