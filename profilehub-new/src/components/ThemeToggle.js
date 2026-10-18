"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
    const { theme, toggleTheme, ready } = useTheme();

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={
                theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
            title={theme === "light" ? "Dark mode" : "Light mode"}
            disabled={!ready}
        >
            <span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span>
            <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
        </button>
    );
}
