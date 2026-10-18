
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
    { label: "Overview", href: "/dashboard", icon: "▦" },
    { label: "My profile", href: "/dashboard/profile", icon: "♙" },
    { label: "Linked accounts", href: "/dashboard/accounts", icon: "◎" },
    { label: "Settings", href: "/dashboard/settings", icon: "⚙" },
];

export default function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <aside className="dashboard-sidebar">
            <Link href="/dashboard" className="auth-brand dashboard-brand">
                <span className="brand-icon">P</span>
                <span>ProfileHub</span>
            </Link>

            <p className="sidebar-label">WORKSPACE</p>

            <nav className="sidebar-nav" aria-label="Dashboard navigation">
                {navigation.map((item) => {
                    const active =
                        item.href === "/dashboard"
                            ? pathname === "/dashboard"
                            : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`sidebar-link${active ? " active" : ""}`}
                            aria-current={active ? "page" : undefined}
                            title={item.label}
                        >
                            <span aria-hidden="true">{item.icon}</span>
                            <span className="sidebar-link-label">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="sidebar-bottom">
                <div className="user-avatar">PH</div>
                <div className="user-info">
                    <strong>My workspace</strong>
                    <span>Personal profile</span>
                </div>
            </div>
        </aside>
    );
}
