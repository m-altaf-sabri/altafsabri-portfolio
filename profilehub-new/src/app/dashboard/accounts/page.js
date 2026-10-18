"use client";

import { useState } from "react";
import Link from "next/link";


const availableAccounts = [
    {
        id: "google",
        name: "Google",
        icon: "G",
        description: "Connect your Google identity and services.",
        color: "google",
    },
    {
        id: "github",
        name: "GitHub",
        icon: "⌘",
        description: "Show your developer profile and repositories.",
        color: "github",
    },
    {
        id: "linkedin",
        name: "LinkedIn",
        icon: "in",
        description: "Bring your professional identity into ProfileHub.",
        color: "linkedin",
    },
];

export default function AccountsPage() {
    const [connected, setConnected] = useState([]);

    function toggleDemoConnection(id) {
        setConnected((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    }

    return (
        <section className="dashboard-main">
            <aside className="dashboard-sidebar">
                <Link href="/dashboard" className="auth-brand dashboard-brand">
                    <span className="brand-icon">P</span>
                    <span>ProfileHub</span>
                </Link>

                <p className="sidebar-label">WORKSPACE</p>

                <nav className="sidebar-nav">
                    <Link href="/dashboard" className="sidebar-link">
                        <span>▦</span> Overview
                    </Link>
                    <Link href="/dashboard/profile" className="sidebar-link ">
                        <span>♙</span> My profile
                    </Link>
                    <Link href="/dashboard/accounts" className="sidebar-link active">
                        <span>◎</span> Linked accounts
                    </Link>
                    <Link href="/dashboard/settings" className="sidebar-link">
                        <span>⚙</span> Settings
                    </Link>
                </nav>

                <div className="sidebar-bottom">
                    <div className="user-avatar">PH</div>
                    <div className="user-info">
                        <strong>My Profile</strong>
                        <span>Personal workspace</span>
                    </div>
                </div>
            </aside>
            <section>
                <header className="dashboard-header">
                    <div>
                        <p className="eyebrow">CONNECTED SERVICES</p>
                        <h1>Linked accounts</h1>
                        <p className="dashboard-subtitle">
                            Manage the online services associated with your identity.
                        </p>
                    </div>

                    <Link href="/dashboard" className="outline-button">
                        ← Dashboard
                    </Link>
                </header>

                <section className="accounts-summary">
                    <div>
                        <span className="summary-label">AVAILABLE SERVICES</span>
                        <strong>{availableAccounts.length}</strong>
                        <p>Services you can connect</p>
                    </div>
                    <div>
                        <span className="summary-label">DEMO STATUS</span>
                        <strong>{connected.length} / {availableAccounts.length}</strong>
                        <p>Local preview selections</p>
                    </div>
                </section>

                <section className="dashboard-section">
                    <div className="section-heading">
                        <div>
                            <h2>Your services</h2>
                            <p>Choose a service to preview its connected state.</p>
                        </div>
                    </div>

                    <div className="linked-account-list">
                        {availableAccounts.map((account) => {
                            const isConnected = connected.includes(account.id);

                            return (
                                <article className="linked-account-card" key={account.id}>
                                    <div className={`account-icon ${account.color}`}>
                                        {account.icon}
                                    </div>

                                    <div className="linked-account-info">
                                        <h3>{account.name}</h3>
                                        <p>{account.description}</p>
                                        <span
                                            className={`connection-status ${isConnected ? "is-connected" : ""
                                                }`}
                                        >
                                            <span className="connection-dot" />
                                            {isConnected ? "Demo connected" : "Not connected"}
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        className={
                                            isConnected
                                                ? "disconnect-demo-button"
                                                : "connect-demo-button"
                                        }
                                        onClick={() => toggleDemoConnection(account.id)}
                                    >
                                        {isConnected ? "Disconnect demo" : "Connect"}
                                    </button>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <div className="accounts-notice">
                    <strong>About account connections</strong>
                    <p>
                        These buttons only preview the interface. They do not sign in
                        to Google, GitHub, or LinkedIn or grant access to your accounts.
                        Real OAuth integration will be added after the frontend is ready.
                    </p>
                </div>
            </section>
            </section>
    );
}
