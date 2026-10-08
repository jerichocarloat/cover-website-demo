"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./RunServeGrow.module.css";

const functions = [
  {
    name: "BETREIBEN",
    purpose: "Verlagsprozesse",
    terms: ["Aufträge", "Buchhaltung", "Tantiemen", "Anzeigen", "Logistik"],
  },
  {
    name: "BETREUEN",
    purpose: "Kunden- und Aboservice",
    terms: ["Anfragen", "Abonnements", "Kommunikation", "Kundendaten", "Aufträge"],
  },
  {
    name: "WACHSEN",
    purpose: "Marketing und Kundenentwicklung",
    terms: ["Kampagnen", "Segmentierung", "Automatisierung", "Kundenbindung", "E-Mail-Marketing", "Analysen"],
  },
] as const;

export type RunServeGrowProps = {
  tone?: "dark" | "light";
  className?: string;
};

export default function RunServeGrow({ tone = "light", className }: RunServeGrowProps) {
  const figureRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handlePreference = () => setReducedMotion(preference.matches);
    const handleVisibility = () => setTabHidden(document.hidden);
    handlePreference();
    handleVisibility();
    setReady(true);

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .12 })
      : null;
    if (observer) observer.observe(figure);
    else setVisible(true);

    preference.addEventListener("change", handlePreference);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", handlePreference);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <figure
      ref={figureRef}
      className={`${styles.figure}${className ? ` ${className}` : ""}`}
      data-tone={tone}
      data-ready={ready}
      data-reduced={reducedMotion}
      data-paused={paused || !visible || tabHidden || reducedMotion}
    >
      <figcaption className={styles.srOnly}>
        Drei miteinander verbundene Bereiche der Unterstützung für Verlage. BETREIBEN umfasst die Verlagsprozesse.
        BETREUEN steht für den Kunden- und Aboservice. WACHSEN verbindet Kundendaten,
        Kommunikation und Marketingfunktionen. Die Bereiche greifen ineinander; der Leistungsumfang
        wird mit jedem Verlag vereinbart.
      </figcaption>

      <div className={styles.stage} aria-hidden="true">
        <svg className={styles.connections} viewBox="0 0 650 460" preserveAspectRatio="none" fill="none">
          <path d="M154 183c78-70 203-63 309 8" />
          <path d="M470 207c-9 74-56 111-131 110" />
          <path d="M299 308c-78-6-137-46-143-109" />
          <path d="M148 163v16h16M465 174v16h-16M351 308h-16v16" />
        </svg>

        {functions.map((area, index) => (
          <div className={`${styles.word} ${styles[`word${index}`]}`} key={area.name}>
            <span>{area.name}</span>
            <small>{area.purpose}</small>
          </div>
        ))}

        {functions.map((area, index) => (
          <div className={`${styles.cloud} ${styles[`cloud${index}`]}`} key={area.name}>
            {area.terms.map((term, termIndex) => (
              <span className={`${styles.term} ${styles[`term${termIndex}`]}`} key={term}>{term}</span>
            ))}
          </div>
        ))}
        <span className={styles.systemLabel}>Ein vernetztes Verlagsgeschäft</span>
      </div>

      <div className={styles.staticComposition} aria-hidden="true">
        {functions.map((area) => (
          <div className={styles.staticArea} key={area.name}>
            <strong>{area.name}</strong>
            <div>
              <span>{area.purpose}</span>
              <p>{area.terms.slice(0, 4).join(" · ")}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className={styles.control}
        type="button"
        onClick={() => setPaused((previous) => !previous)}
        aria-pressed={paused}
        aria-label={`Animation BETREIBEN, BETREUEN und WACHSEN ${paused ? "fortsetzen" : "anhalten"}`}
        disabled={reducedMotion}
        title={reducedMotion ? "Ihre Einstellung für reduzierte Bewegung hält diese Grafik statisch." : undefined}
      >
        <svg viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {paused ? <path d="m6 4 7 5-7 5V4Z" /> : <path d="M6 4v10M12 4v10" />}
        </svg>
        {reducedMotion ? "Bewegung aus" : paused ? "Fortsetzen" : "Anhalten"}
      </button>
    </figure>
  );
}
