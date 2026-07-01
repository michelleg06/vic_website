"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useLang } from "./LangProvider";
import { PARTICIPA_EMAIL } from "@/lib/i18n";
import { MailIcon, CloseIcon } from "./icons";

interface ContactContextValue {
  open: () => void;
}

const ContactContext = createContext<ContactContextValue | null>(null);

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const { t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Contacto VIC — ${form.name || form.email}`;
    const body = `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`;
    window.location.href = `mailto:${PARTICIPA_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setIsOpen(false);
  };

  return (
    <ContactContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-navy/70 p-4 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 bg-brand-navy p-6 text-white">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-coral">
                  <MailIcon className="h-5 w-5 text-white" />
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-white">{t.contact.title}</h3>
                  <p className="text-sm text-white/70">{t.contact.lead}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label={t.contact.close}
                className="shrink-0 rounded-full bg-white/10 p-2 transition hover:bg-white/20"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={submit} className="space-y-4 p-6">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-brand-navy">
                  {t.contact.name}
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-xl border border-brand-navy/15 bg-brand-cream/40 px-4 py-2.5 text-brand-ink outline-none transition focus:border-brand-coral focus:ring-2 focus:ring-brand-coral/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-brand-navy">
                  {t.contact.email}
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-xl border border-brand-navy/15 bg-brand-cream/40 px-4 py-2.5 text-brand-ink outline-none transition focus:border-brand-coral focus:ring-2 focus:ring-brand-coral/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-brand-navy">
                  {t.contact.message}
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full resize-none rounded-xl border border-brand-navy/15 bg-brand-cream/40 px-4 py-2.5 text-brand-ink outline-none transition focus:border-brand-coral focus:ring-2 focus:ring-brand-coral/20"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-brand-coral py-3 font-bold text-white transition hover:bg-brand-coral-dark"
              >
                {t.contact.send}
              </button>
            </form>
          </div>
        </div>
      )}
    </ContactContext.Provider>
  );
}

export function useContact(): ContactContextValue {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used within <ContactProvider>");
  return ctx;
}
