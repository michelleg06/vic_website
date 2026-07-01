"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { useLang } from "./LangProvider";
import { useContact } from "./ContactProvider";
import { MenuIcon, CloseIcon } from "./icons";
import { cn } from "@/lib/utils";

export function Header() {
  const { t, lang, toggle } = useLang();
  const { open: openContact } = useContact();
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = [
    { label: t.nav.about, href: "/#about", icon: "bi-info-circle", route: false },
    { label: t.nav.temas, href: "/#temas", icon: "bi-bar-chart-line", route: false },
    { label: t.nav.mapa, href: "/#explora", icon: "bi-compass", route: false },
    { label: t.nav.posters, href: "/posters", icon: "bi-images", route: true },
    { label: t.nav.prensa, href: "/#prensa", icon: "bi-newspaper", route: false },
    { label: t.nav.participa, href: "/convocatorias", icon: "bi-megaphone", route: true },
  ];

  const linkCls = "flex items-center gap-1.5 text-brand-navy transition-colors hover:text-brand-coral";

  const NavItem = ({ item, onClick }: { item: (typeof nav)[number]; onClick?: () => void }) => {
    const inner = (
      <>
        <i className={`bi ${item.icon} text-[15px]`} aria-hidden />
        {item.label}
      </>
    );
    return item.route ? (
      <Link href={item.href} className={linkCls} onClick={onClick}>
        {inner}
      </Link>
    ) : (
      <a href={item.href} className={linkCls} onClick={onClick}>
        {inner}
      </a>
    );
  };

  const LangToggle = ({ className }: { className?: string }) => (
    <button
      onClick={toggle}
      aria-label="Switch language"
      className={cn(
        "flex items-center gap-1 rounded-full border border-brand-navy/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-navy transition hover:border-brand-coral hover:text-brand-coral",
        className
      )}
    >
      <span className={cn(lang === "es" && "text-brand-coral")}>ES</span>
      <span className="opacity-40">/</span>
      <span className={cn(lang === "en" && "text-brand-coral")}>EN</span>
    </button>
  );

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-brand-cream/80">
      <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-brand-navy" aria-label="Verano Internacional de la Ciencia">
          <Logo className="h-10 w-10 ring-2 ring-brand-navy/10" />
          <span className="text-xl font-extrabold tracking-tight">VIC</span>
        </Link>

        <nav className="hidden items-center gap-5 text-[13px] font-semibold tracking-wide lg:flex">
          {nav.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
          <button onClick={openContact} className={cn(linkCls, "font-semibold")}>
            <i className="bi bi-envelope text-[15px]" aria-hidden />
            {t.nav.contacto}
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <LangToggle className="hidden sm:flex" />
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-coral text-white transition hover:bg-brand-coral-dark lg:hidden"
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-black/5 bg-white px-5 py-6 shadow-lg lg:hidden">
          <nav className="flex flex-col gap-4 text-sm font-semibold">
            {nav.map((item) => (
              <NavItem key={item.href} item={item} onClick={() => setMenuOpen(false)} />
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                openContact();
              }}
              className={cn(linkCls, "font-semibold")}
            >
              <i className="bi bi-envelope text-[15px]" aria-hidden />
              {t.nav.contacto}
            </button>
            <LangToggle className="mt-2 w-fit" />
          </nav>
        </div>
      )}
    </header>
  );
}
