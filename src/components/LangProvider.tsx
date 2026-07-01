"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DICT, type Content, type Lang } from "@/lib/i18n";

interface LangContextValue {
  lang: Lang;
  t: Content;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "vic-lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  // Restore persisted choice after mount (avoids hydration mismatch).
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") setLangState(saved);
  }, []);

  // Keep <html lang> and storage in sync.
  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = (next: Lang) => setLangState(next);
  const toggle = () => setLangState((l) => (l === "es" ? "en" : "es"));

  return (
    <LangContext.Provider value={{ lang, t: DICT[lang], setLang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within <LangProvider>");
  return ctx;
}
