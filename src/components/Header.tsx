"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "@/components/SiteImage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cssTimeMs } from "@/lib/motion";

const navigation = [
  { label: "Software", href: "/plattform" },
  { label: "Services", href: "/services" },
  { label: "Unternehmen", href: "/unternehmen" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    animationRef.current?.cancel();
    dialogRef.current?.close();
  };

  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    setIsOpen(true);
    animationRef.current?.cancel();

    // Native dialog owns focus/inert/Escape; keyboard activation stays instant.
    if (event.detail === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tokens = getComputedStyle(dialog);
    const duration = cssTimeMs(tokens.getPropertyValue("--speed"), 220);
    const easing = tokens.getPropertyValue("--ease-out").trim() || "cubic-bezier(.23,1,.32,1)";
    animationRef.current = dialog.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration, easing },
    );
  };

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 981px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleDesktop = () => {
      if (desktop.matches) {
        animationRef.current?.cancel();
        dialogRef.current?.close();
      }
    };
    const handleMotion = () => {
      if (reducedMotion.matches) animationRef.current?.cancel();
    };
    desktop.addEventListener("change", handleDesktop);
    reducedMotion.addEventListener("change", handleMotion);
    return () => {
      desktop.removeEventListener("change", handleDesktop);
      reducedMotion.removeEventListener("change", handleMotion);
      animationRef.current?.cancel();
    };
  }, []);

  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  const current = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <header className="site-header" lang="de">
      <a className="skip-link" href="#main">Zum Inhalt springen</a>
      <div className="header-inner">
        <Link className="brand-logo" href="/" aria-label="COVER Startseite">
          <Image src="/brand/cover-logo.png" alt="COVER" width={250} height={74} sizes="125px" />
        </Link>
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          {navigation.map(({ label, href }) => (
            <Link key={href} href={href} aria-current={current(href) ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
        <button
          className="menu-trigger"
          type="button"
          onClick={openMenu}
          aria-haspopup="dialog"
          aria-controls="cover-mobile-menu"
          aria-expanded={isOpen}
        >
          <span>Menü</span>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 8h16M4 16h16" />
          </svg>
        </button>
      </div>
      <dialog
        ref={dialogRef}
        id="cover-mobile-menu"
        className="mobile-menu"
        aria-label="Hauptnavigation"
        onClose={() => {
          animationRef.current?.cancel();
          setIsOpen(false);
        }}
      >
        <div className="menu-panel">
          <div className="menu-top">
            <Image src="/brand/cover-logo.png" alt="COVER" width={250} height={74} sizes="125px" className="brand-logo" />
            <button className="menu-close" type="button" onClick={closeMenu} aria-label="Menü schließen" autoFocus>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <nav className="menu-links" aria-label="Mobile Hauptnavigation">
            {navigation.map(({ label, href }, index) => (
              <Link className="menu-link" key={href} href={href} onClick={closeMenu} aria-current={current(href) ? "page" : undefined}>
                <span aria-hidden="true">0{index + 1}</span>
                {label}
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            ))}
          </nav>
          <p className="menu-foot">Verlagssoftware. Spezialisierte Services.</p>
        </div>
      </dialog>
    </header>
  );
}
