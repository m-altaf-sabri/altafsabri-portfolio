"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const initialAccounts = [
    { id: "google", name: "Google", description: "Email and Google services", icon: "G" },
    { id: "github", name: "GitHub", description: "Code and repositories", icon: "⌘" },
    { id: "linkedin", name: "LinkedIn", description: "Professional network", icon: "in" },
];

export default function DashboardPage() {
    const [profile, setProfile] = useState({
        name: "Your name",
        username: "@yourusername",
    });

    const [connectedAccounts, setConnectedAccounts] = useState([]);

    useEffect(() => {
        try {
            const savedProfile = localStorage.getItem("profilehub-profile");
            if (savedProfile) {
                const parsed = JSON.parse(savedProfile);
                setProfile({
                    name: parsed.name || "Your name",
                    username: parsed.username
                        ? parsed.username.startsWith("@")
                            ? parsed.username
                            : `@${parsed.username}`
                        : "@yourusername",
                });
            }

            const savedAccounts = localStorage.getItem("profilehub-connected-accounts");
            if (savedAccounts) {
                setConnectedAccounts(JSON.parse(savedAccounts));
            }
        } catch {
            // Ignore invalid local demo data.
        }
    }, []);

    const connectedCount = connectedAccounts.length;

    return (
        <section className="dashboard-main">
            <aside className="dashboard-sidebar">
                <Link href="/dashboard" className="auth-brand dashboard-brand  hover:no-underline">
                    <span className="brand-icon">P</span>
                    <span>ProfileHub</span>
                </Link>
        
                <p className="sidebar-label">WORKSPACE</p>

                <nav className="sidebar-nav">
                    <Link href="/dashboard" className="sidebar-link active">
                        <span>▦</span> Overview
                    </Link>
                    <Link href="/dashboard/profile" className="sidebar-link">
                        <span>♙</span> My profile
                    </Link>
                    <Link href="/dashboard/accounts" className="sidebar-link">
                        <span>◎</span> Linked accounts
                    </Link>
                    <Link href="/dashboard/settings" className="sidebar-link ">
                        <span>⚙</span> Settings
                    </Link>
                </nav>

                <div className="sidebar-bottom">
                    <div className="user-avatar">PH</div>
                    <div className="user-info">
                        <strong>My workspace</strong>
                        <span>Personal settings</span>
                    </div>
                </div>
            </aside>
            <header className="dashboard-header">
                <div>
                    <p className="eyebrow">WORKSPACE OVERVIEW</p>
                    <h1>Welcome back, {profile.name}!</h1>
                    <p>Manage your digital identity from one place.</p>
                </div>
                <Link className="primary-button dashboard-action" href="/dashboard/profile">
                    Edit profile
                </Link>
            </header>

            <div className="overview-stats">
                <article className="overview-stat-card">
                    <span className="stat-icon">◎</span>
                    <p>Connected accounts</p>
                    <strong>{connectedCount}</strong>
                    <span className="stat-note">of {initialAccounts.length} available</span>
                </article>

                <article className="overview-stat-card">
                    <span className="stat-icon">♙</span>
                    <p>Profile status</p>
                    <strong>Active</strong>
                    <span className="stat-note">Local preview</span>
                </article>

                <article className="overview-stat-card">
                    <span className="stat-icon">↗</span>
                    <p>Available services</p>
                    <strong>{initialAccounts.length}</strong>
                    <span className="stat-note">Ready to configure</span>
                </article>
            </div>

            <div className="dashboard-section-heading">
                <div>
                    <h2>Your connected accounts</h2>
                    <p>View and manage your linked services.</p>
                </div>
                <Link className="text-link" href="/dashboard/accounts">
                    Manage accounts →
                </Link>
            </div>

            <div className="overview-account-list">
                {initialAccounts.map((account) => {
                    const connected = connectedAccounts.includes(account.id);

                    return (
                        <article className="overview-account-card" key={account.id}>
                            <div className={`overview-service-icon service-${account.id}`}>
                                {account.icon}
                            </div>
                            <div className="overview-account-info">
                                <h3>{account.name}</h3>
                                <p>{account.description}</p>
                            </div>
                            <span className={`connection-status ${connected ? "connected" : ""}`}>
                                <span className="status-dot" />
                                {connected ? "Connected (demo)" : "Not connected"}
                            </span>
                        </article>
                    );
                })}
            </div>

            <div className="dashboard-section-heading quick-actions-heading">
                <div>
                    <h2>Quick actions</h2>
                    <p>Keep your profile up to date.</p>
                </div>
            </div>

            <div className="quick-actions-grid">
                <Link href="/dashboard/profile" className="quick-action-card">
                    <span className="quick-action-icon">♙</span>
                    <span>
                        <strong>Update your profile</strong>
                        <small>Edit your name, bio, and website.</small>
                    </span>
                    <span className="quick-action-arrow">→</span>
                </Link>

                <Link href="/dashboard/accounts" className="quick-action-card">
                    <span className="quick-action-icon">◎</span>
                    <span>
                        <strong>Manage linked accounts</strong>
                        <small>Review account connection previews.</small>
                    </span>
                    <span className="quick-action-arrow">→</span>
                </Link>

                <Link href="/dashboard/settings" className="quick-action-card">
                    <span className="quick-action-icon">⚙</span>
                    <span>
                        <strong>Review settings</strong>
                        <small>Manage your local preferences.</small>
                    </span>
                    <span className="quick-action-arrow">→</span>
                </Link>
            </div>
        </section>
    );
}
