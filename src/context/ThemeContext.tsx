/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * O tema também vai num cookie no domínio `.leoproti.com.br`, porque
 * localStorage não atravessa subdomínios: assim o hub do doutorado
 * (projetos-doutorado.leoproti.com.br) abre no mesmo tema, e o que for
 * escolhido lá vale aqui.
 */
const COOKIE_TEMA = "leoproti-tema";

function lerCookieTema(): Theme | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_TEMA}=(dark|light)`));
  return m ? (m[1] as Theme) : null;
}

function gravarCookieTema(theme: Theme) {
  const dominio = window.location.hostname.endsWith("leoproti.com.br") ? "; domain=.leoproti.com.br" : "";
  const seguro = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_TEMA}=${theme}; path=/; max-age=31536000; SameSite=Lax${dominio}${seguro}`;
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const doCookie = lerCookieTema();
  if (doCookie) return doCookie;

  const stored = window.localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme;
    window.localStorage.setItem("theme", theme);
    gravarCookieTema(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
