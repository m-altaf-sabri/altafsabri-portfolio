"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("profilehub-theme");
        const initialTheme = savedTheme === "dark" ? "dark" : "light";

        setTheme(initialTheme);
        document.documentElement.dataset.theme = initialTheme;
        setReady(true);
    }, []);

    function toggleTheme() {
        const nextTheme = theme === "light" ? "dark" : "light";

        document.documentElement.dataset.theme = nextTheme;
        localStorage.setItem("profilehub-theme", nextTheme);
        setTheme(nextTheme);
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, ready }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }

    return context;
}
