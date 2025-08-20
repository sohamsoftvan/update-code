import React, {useEffect, useMemo, useState, useContext, createContext} from "react";
import {createTheme, ThemeProvider, CssBaseline} from "@mui/material";

// Simple context to expose current color mode and toggle function across the app
const ThemeModeContext = createContext({ mode: "light", toggle: () => {}, setMode: () => {} });

export function useThemeMode() {
    return useContext(ThemeModeContext);
}

export function MaterialThemeProvider(props) {
    const {children} = props;

    const [mode, setMode] = useState(() => {
        try {
            const stored = typeof window !== "undefined" ? window.localStorage.getItem("themeMode") : null;
            return stored === "dark" || stored === "light" ? stored : "light";
        } catch (e) {
            return "light";
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem("themeMode", mode);
        } catch (e) {}
        const root = document.documentElement;
        root.classList.remove("theme-light", "theme-dark");
        root.classList.add(mode === "dark" ? "theme-dark" : "theme-light");
        if (mode === "dark") {
            root.style.colorScheme = "dark";
        } else {
            root.style.colorScheme = "light";
        }
    }, [mode]);

    const theme = useMemo(() => createTheme({
        typography: {
            fontFamily: ["Poppins"].join(",")
        },
        palette: {
            mode,
            primary: {
                main: '#147d82'
            },
            secondary: {
                main: "#e4e6ef"
            },
            error: {
                main: "#ff3333"
            },
            text: mode === "dark" ? {
                primary: "#e6e6e6",
                secondary: "rgba(230,230,230,0.7)"
            } : {
                primary: "#1f1f1f",
                secondary: "#6c757d"
            },
            divider: mode === "dark" ? "#333333" : "#e2e2e2",
            background: mode === "dark" ? {
                default: "#121212",
                paper: "#1e1e1e"
            } : {}
        },
        props: {
            MuiButtonBase: {
                disableRipple: false
            },
            MuiPopover: {
                elevation: 1
            }
        }
    }), [mode]);

    const ctxValue = useMemo(() => ({
        mode,
        setMode,
        toggle: () => setMode(prev => prev === "dark" ? "light" : "dark")
    }), [mode]);

    return (
        <ThemeModeContext.Provider value={ctxValue}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    );
}

export { ThemeModeContext };
