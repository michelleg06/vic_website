"use client";

import { Logo } from "./Logo";
import { useLang } from "./LangProvider";
import { useContact } from "./ContactProvider";
import type { ResolvedPartner } from "@/lib/posters";

export function SiteFooter({ partners }: { partners: ResolvedPartner[] }) {
  const { t } = useLang();
  const { open: openContact } = useContact();

  return (
    <footer id="contact" className="mt-8 bg-brand-navy text-white">
      <div className="mx-auto max-w-[1320px] px-5 py-16 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <Logo variant="text" className="h-24 w-24 bg-white shadow-lg" />
            <p className="mt-5 text-sm text-white/75">{t.footer.tagline}</p>
            <button
              onClick={openContact}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-coral px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-coral-dark"
            >
              <i className="bi bi-envelope" aria-hidden />
              {t.contact.title}
            </button>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-white/60">
              {t.footer.partners}
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {partners.map((p) => (
                <a
                  key={p.label}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={p.label}
                  title={p.label}
                  className="flex h-16 w-36 items-center justify-center rounded-xl bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  {p.logo ? (
                    <img src={p.logo} alt={p.label} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-sm font-extrabold text-brand-navy">{p.label}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-xs text-white/55">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
