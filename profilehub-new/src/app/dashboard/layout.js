import DashboardSidebar from "@/components/DashboardSidebar";
import ThemeToggle from "@/components/ThemeToggle";

export default function DashboardLayout({ children }) {
    return (
        <main className="dashboard-page">
            <ThemeToggle />
            <DashboardSidebar />
            {children}
        </main>
    );
}
