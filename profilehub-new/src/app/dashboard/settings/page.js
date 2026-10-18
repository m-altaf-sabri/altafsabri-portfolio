"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function SettingsPage() {
    const { theme, toggleTheme, ready } = useTheme();

    const [preferences, setPreferences] = useState({
        publicProfile: true,
        accountUpdates: true,
        productTips: false,
    });

    const [message, setMessage] = useState("");

    function togglePreference(key) {
        setPreferences((current) => ({
            ...current,
            [key]: !current[key],
        }));
        setMessage("Preference updated in this session.");
    }

    function resetLocalData() {
        localStorage.removeItem("profilehub-profile");
        localStorage.removeItem("profilehub-theme");
        setMessage("Local profile and theme preferences cleared. Refresh to apply the default theme.");
    }

    return (
        <section>
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
                    <Link href="/dashboard/profile" className="sidebar-link">
                        <span>♙</span> My profile
                    </Link>
                    <Link href="/dashboard/accounts" className="sidebar-link">
                        <span>◎</span> Linked accounts
                    </Link>
                    <Link href="/dashboard/settings" className="sidebar-link active">
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

            <section className="dashboard-main">
                <header className="dashboard-header">
                    <div>
                        <p className="eyebrow">PREFERENCES</p>
                        <h1>Settings</h1>
                        <p className="dashboard-subtitle">
                            Customize your ProfileHub experience.
                        </p>
                    </div>

                    <Link href="/dashboard" className="outline-button">
                        ← Dashboard
                    </Link>
                </header>

                <section className="settings-section">
                    <div className="settings-section-heading">
                        <div className="settings-section-icon">◐</div>
                        <div>
                            <h2>Appearance</h2>
                            <p>Choose how ProfileHub looks on your device.</p>
                        </div>
                    </div>

                    <div className="settings-row">
                        <div>
                            <strong>Dark mode</strong>
                            <p>Use a darker color scheme across supported pages.</p>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={theme === "dark"}
                            className={`settings-switch ${theme === "dark" ? "on" : ""}`}
                            onClick={toggleTheme}
                            disabled={!ready}
                        >
                            <span />
                        </button>
                    </div>

                    <div className="settings-row">
                        <div>
                            <strong>Current theme</strong>
                            <p>Your selected theme is {theme}.</p>
                        </div>
                        <span className="settings-value">
                            {ready ? theme === "dark" ? "Dark" : "Light" : "Loading"}
                        </span>
                    </div>
                </section>

                <section className="settings-section">
                    <div className="settings-section-heading">
                        <div className="settings-section-icon">◎</div>
                        <div>
                            <h2>Profile preferences</h2>
                            <p>Preview your preferred profile options.</p>
                        </div>
                    </div>

                    <div className="settings-row">
                        <div>
                            <strong>Public profile</strong>
                            <p>Allow your profile to be presented as public.</p>
                        </div>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={preferences.publicProfile}
                            className={`settings-switch ${preferences.publicProfile ? "on" : ""}`}
                            onClick={() => togglePreference("publicProfile")}
                        >
                            <span />
                        </button>
                    </div>

                    <div className="settings-row">
                        <div>
                            <strong>Account updates</strong>
                            <p>Receive account-related update preferences.</p>
                        </div>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={preferences.accountUpdates}
                            className={`settings-switch ${preferences.accountUpdates ? "on" : ""}`}
                            onClick={() => togglePreference("accountUpdates")}
                        >
                            <span />
                        </button>
                    </div>

                    <div className="settings-row">
                        <div>
                            <strong>Product tips</strong>
                            <p>Show tips for using ProfileHub features.</p>
                        </div>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={preferences.productTips}
                            className={`settings-switch ${preferences.productTips ? "on" : ""}`}
                            onClick={() => togglePreference("productTips")}
                        >
                            <span />
                        </button>
                    </div>
                </section>

                <section className="settings-section danger-section">
                    <div className="settings-section-heading">
                        <div className="settings-section-icon">!</div>
                        <div>
                            <h2>Local data</h2>
                            <p>Clear the profile and theme values stored by this frontend.</p>
                        </div>
                    </div>

                    <div className="settings-row">
                        <div>
                            <strong>Reset local profile data</strong>
                            <p>This does not delete a server account or database records.</p>
                        </div>
                        <button
                            type="button"
                            className="reset-button"
                            onClick={resetLocalData}
                        >
                            Clear local data
                        </button>
                    </div>
                </section>

                {message && (
                    <p className="settings-message" role="status">
                        {message}
                    </p>
                )}

                <footer className="dashboard-footer">
                    ProfileHub · Settings
                </footer>
            </section>
        </section>
    );
}
