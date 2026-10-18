import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";


export default function SignupPage() {
    return (
        <main className="auth-page">
            <ThemeToggle />
            <section className="auth-card">
                <Link href="/" className="auth-brand">
                    <div className="brand-icon">P</div>
                    <span>ProfileHub</span>
                </Link>

                <div className="auth-heading">
                    <p className="eyebrow">YOUR DIGITAL IDENTITY</p>
                    <h1>Create your account.</h1>
                    <p className="auth-description">
                        Start organizing your online identity in one simple, secure place.
                    </p>
                </div>

                <form className="auth-form">
                    <label htmlFor="name">Full name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        autoComplete="name"
                        required
                    />

                    <label htmlFor="email">Email address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                    />

                    <label htmlFor="password">Create password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="At least 8 characters"
                        autoComplete="new-password"
                        minLength={8}
                        required
                    />

                    <button type="button" className="primary-button">
                        Create account
                        <span aria-hidden="true">→</span>
                    </button>
                </form>

                <div className="auth-divider">
                    <span>OR SIGN UP WITH</span>
                </div>

                <div className="social-buttons">
                    <button type="button" className="social-button">
                        <span className="social-letter">G</span>
                        Google
                    </button>
                    <button type="button" className="social-button">
                        <span className="social-letter">⌘</span>
                        GitHub
                    </button>
                </div>

                <p className="signup-prompt">
                    Already have an account? <Link href="/">Sign in</Link>
                </p>

                <p className="security-note">
                    <span aria-hidden="true">◇</span> Your identity, organized securely.
                </p>
            </section>

            <aside className="auth-aside">
                <div className="aside-orb orb-one" />
                <div className="aside-orb orb-two" />

                <div className="aside-content">
                    <span className="aside-tag">WELCOME TO PROFILEHUB</span>
                    <h2>Everything about you. All in one place.</h2>
                    <p>
                        Create your personal hub to organize your profile and bring
                        your connected online accounts together.
                    </p>

                    <div className="preview-card">
                        <div className="preview-avatar">PH</div>
                        <div className="preview-details">
                            <strong>Your new beginning</strong>
                            <span>One account. A clearer digital identity.</span>
                        </div>
                        <span className="preview-check">✓</span>
                    </div>

                    <div className="aside-footer">
                        <span className="status-dot" />
                        Simple, organized, and built around you
                    </div>
                </div>
            </aside>
        </main>
    );
}
