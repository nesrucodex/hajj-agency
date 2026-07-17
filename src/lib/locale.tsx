"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LOCALE,
  getContent,
  type Locale,
  type SiteContent,
} from "./content";

export type Theme = "light" | "dark";

interface LocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  t: SiteContent;
}

const Ctx = createContext<LocaleCtx | null>(null);
const LOCALE_KEY = "gb-locale";
const THEME_KEY = "gb-theme";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [theme, setThemeState] = useState<Theme>("light");

  // restore persisted choices after mount
  useEffect(() => {
    const savedLocale = window.localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (savedLocale === "am" || savedLocale === "en") setLocaleState(savedLocale);
    const savedTheme = window.localStorage.getItem(THEME_KEY) as Theme | null;
    if (savedTheme === "light" || savedTheme === "dark") setThemeState(savedTheme);
  }, []);

  // reflect the locale onto <html> so CSS can swap the Ethiopic/Latin fonts
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  // reflect the theme onto <html> so the token overrides apply
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(LOCALE_KEY, l);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next: Locale = prev === "am" ? "en" : "am";
      window.localStorage.setItem(LOCALE_KEY, next);
      return next;
    });
  }, []);

  const setTheme = useCallback((th: Theme) => {
    setThemeState(th);
    window.localStorage.setItem(THEME_KEY, th);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      window.localStorage.setItem(THEME_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo<LocaleCtx>(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      theme,
      setTheme,
      toggleTheme,
      t: getContent(locale),
    }),
    [locale, setLocale, toggleLocale, theme, setTheme, toggleTheme],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSite(): LocaleCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSite must be used within <LocaleProvider>");
  return ctx;
}
