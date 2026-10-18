import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="auth-page">
      <ThemeToggle />
      <section className="auth-card">
        <div className="auth-brand">
          <div className="brand-icon">P</div>
          <span>ProfileHub</span>
        </div>

        <div className="auth-heading">
          <p className="eyebrow">YOUR DIGITAL IDENTITY</p>
          <h1>Welcome back.</h1>
          <p className="auth-description">
            Sign in to manage your profile and connected accounts in one place.
          </p>
        </div>

        <form className="auth-form">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
          />

          <div className="password-label">
            <label htmlFor="password">Password</label>
            <Link href="/forgot-password">Forgot password?</Link>
          </div>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
          />

          <button type="button" className="primary-button">
            Sign in
            <span aria-hidden="true">→</span>
          </button>
        </form>

        <div className="auth-divider">
          <span>OR CONTINUE WITH</span>
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
          New to ProfileHub? <Link href="/signup">Create an account</Link>
        </p>

        <p className="security-note">
          <span aria-hidden="true">◇</span> Your identity, organized securely.
        </p>
      </section>

      <aside className="auth-aside">
        <div className="aside-orb orb-one" />
        <div className="aside-orb orb-two" />

        <div className="aside-content">
          <span className="aside-tag">ONE PLACE. YOUR WHOLE PROFILE.</span>
          <h2>Your digital life, beautifully connected.</h2>
          <p>
            Keep your identity organized, manage your connected accounts,
            and stay in control of your online presence.
          </p>

          <div className="preview-card">
            <div className="preview-avatar">PH</div>
            <div className="preview-details">
              <strong>Your profile, your way</strong>
              <span>One hub for your online identity</span>
            </div>
            <span className="preview-check">✓</span>
          </div>

          <div className="aside-footer">
            <span className="status-dot" />
            One home for your digital identity
          </div>
        </div>
      </aside>
    </main>
  );
}
