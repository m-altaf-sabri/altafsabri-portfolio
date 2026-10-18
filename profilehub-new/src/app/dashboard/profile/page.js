"use client";

import { useState } from "react";
import Link from "next/link";


export default function ProfilePage() {
    const [profile, setProfile] = useState({
        name: "",
        username: "",
        email: "",
        bio: "",
        location: "",
        website: "",
    });

    const [saved, setSaved] = useState(false);

    function updateField(event) {
        const { name, value } = event.target;

        setProfile((current) => ({
            ...current,
            [name]: value,
        }));

        setSaved(false);
    }

    function saveProfile(event) {
        event.preventDefault();
        localStorage.setItem("profilehub-profile", JSON.stringify(profile));
        setSaved(true);
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
                    <Link href="/dashboard/profile" className="sidebar-link active">
                        <span>♙</span> My profile
                    </Link>
                    <Link href="/dashboard/accounts" className="sidebar-link">
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

            <section className="dashboard-main">
                <header className="dashboard-header">
                    <div>
                        <p className="eyebrow">YOUR IDENTITY</p>
                        <h1>My profile</h1>
                        <p className="dashboard-subtitle">
                            Manage the details that represent you online.
                        </p>
                    </div>

                    <Link href="/dashboard" className="outline-button">
                        ← Dashboard
                    </Link>
                </header>

                <div className="profile-layout">
                    <form className="profile-form-card" onSubmit={saveProfile}>
                        <div className="profile-card-heading">
                            <h2>Personal information</h2>
                            <p>Update your profile details below.</p>
                        </div>

                        <div className="profile-avatar-row">
                            <div className="large-avatar">
                                {profile.name.trim()
                                    ? profile.name.trim().charAt(0).toUpperCase()
                                    : "P"}
                            </div>
                            <div>
                                <strong>Profile picture</strong>
                                <p>Your initials are displayed for now.</p>
                            </div>
                        </div>

                        <div className="profile-fields">
                            <div className="profile-field">
                                <label htmlFor="name">Full name</label>
                                <input
                                    id="name"
                                    name="name"
                                    value={profile.name}
                                    onChange={updateField}
                                    placeholder="Enter your full name"
                                    maxLength={80}
                                />
                            </div>

                            <div className="profile-field">
                                <label htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    name="username"
                                    value={profile.username}
                                    onChange={updateField}
                                    placeholder="yourusername"
                                    maxLength={30}
                                />
                            </div>

                            <div className="profile-field profile-field-full">
                                <label htmlFor="email">Email address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={profile.email}
                                    onChange={updateField}
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div className="profile-field profile-field-full">
                                <label htmlFor="bio">About you</label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={profile.bio}
                                    onChange={updateField}
                                    placeholder="Write a short introduction..."
                                    rows={4}
                                    maxLength={240}
                                />
                                <span className="field-hint">
                                    {profile.bio.length}/240 characters
                                </span>
                            </div>

                            <div className="profile-field">
                                <label htmlFor="location">Location</label>
                                <input
                                    id="location"
                                    name="location"
                                    value={profile.location}
                                    onChange={updateField}
                                    placeholder="City, country"
                                    maxLength={100}
                                />
                            </div>

                            <div className="profile-field">
                                <label htmlFor="website">Website</label>
                                <input
                                    id="website"
                                    name="website"
                                    type="url"
                                    value={profile.website}
                                    onChange={updateField}
                                    placeholder="https://example.com"
                                    maxLength={200}
                                />
                            </div>
                        </div>

                        <div className="profile-form-footer">
                            {saved && (
                                <span className="saved-message" role="status">
                                    Profile saved in this browser.
                                </span>
                            )}

                            <button type="submit" className="profile-save-button">
                                Save changes →
                            </button>
                        </div>
                    </form>

                    <aside className="profile-preview-card">
                        <p className="preview-eyebrow">LIVE PREVIEW</p>
                        <div className="preview-large-avatar">
                            {profile.name.trim()
                                ? profile.name.trim().charAt(0).toUpperCase()
                                : "P"}
                        </div>

                        <h2>{profile.name || "Your name"}</h2>
                        <p className="preview-username">
                            {profile.username ? `@${profile.username}` : "@yourusername"}
                        </p>

                        <p className="preview-bio">
                            {profile.bio || "Your introduction will appear here."}
                        </p>

                        {profile.location && (
                            <p className="preview-detail">⌖ {profile.location}</p>
                        )}

                        {profile.website && (
                            <p className="preview-detail">
                                ↗ {profile.website}
                            </p>
                        )}

                        <div className="preview-bottom-note">
                            This is a preview of your profile.
                        </div>
                    </aside>
                </div>
            </section>
        </section>
    );
}
