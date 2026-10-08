"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "@/components/SiteImage";
import Link from "next/link";
import { bindScrollReveal } from "@/lib/scroll-reveal";
import Reveal from "./Reveal";
import styles from "./WhyCover.module.css";

const comparison = [
  {
    topic: "Für Verlage gemacht",
    general: "Branchenübergreifende Software",
    generalDetail: "Verlagsspezifische Abläufe müssen zusätzlich eingerichtet werden.",
    cover: "Speziell für Verlage entwickelt",
    coverDetail: "Abonnements, Bücher, Anzeigen und digitale Produkte."
  },
  {
    topic: "Verbundene Abläufe",
    general: "Einzellösungen, die verbunden werden müssen",
    generalDetail: "Werkzeuge und Schnittstellen werden separat zusammengestellt.",
    cover: "ERP, CRM und E-Commerce, verbunden",
    coverDetail: "Kunden-, Produkt- und Transaktionsdaten greifen ineinander."
  },
  {
    topic: "Die tägliche Arbeit",
    general: "Software, mit der Ihr Team selbst arbeitet",
    generalDetail: "Die täglichen Aufgaben bleiben bei Ihrem Team.",
    cover: "Fachkundige Menschen für die Aufgaben",
    coverDetail: "Unterstützung für Kunden, Abonnements und kaufmännische Prozesse."
  },
  {
    topic: "Flexible Kapazitäten",
    general: "Zusätzliche Kapazitäten selbst organisieren",
    generalDetail: "Personal einstellen oder zusätzliche Unterstützung koordinieren.",
    cover: "Kostengünstige und flexible Dienstleistungen",
    coverDetail: "Ein erfahrener Personalpool passt sich dem Arbeitsaufkommen Ihres Verlags an."
  }
];

function ComparisonIcon({ check }: { check: boolean }) {
  return (
    <span className={check ? styles.check : styles.cross} aria-hidden="true">
      {check ? (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="m5.5 12 4.2 4.2 8.8-9" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="m8 8 8 8M16 8l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}

export default function WhyCover() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rows = Array.from(section.querySelectorAll<HTMLTableRowElement>("tbody tr"));
    const cleanups = rows.map((row, delay) => bindScrollReveal(row, {
      targets: Array.from(row.querySelectorAll<HTMLElement>("[data-comparison-content]")),
      group: true,
      delay,
      onReveal: () => {
        row.dataset.revealed = "true";
        section.dataset.progress = String(rows.filter(candidate => candidate.dataset.revealed === "true").length);
      }
    }));
    return () => cleanups.forEach(cleanup => cleanup());
  }, []);

  return (
    <section id="warum-cover" ref={sectionRef} className={styles.section} aria-labelledby="why-cover-title">
      <div className={styles.shell}>
        <Reveal className={styles.intro} group>
          <p className={styles.eyebrow}><span aria-hidden="true" /> Warum COVER</p>
          <h2 id="why-cover-title">Warum Verlage sich für COVER entscheiden</h2>
          <p className={styles.support}>Ein Partner für die Software und die Arbeit dahinter.</p>
        </Reveal>

        <table className={styles.comparison} role="table" aria-colcount={3}>
          <caption className={styles.srOnly}>
            Branchenübergreifende Software und Einzellösungen im Vergleich zu vernetzter Software und spezialisierten Services von COVER.
          </caption>
          <thead role="rowgroup">
            <tr role="row">
              <th scope="col" className={styles.axisHeader} role="columnheader" aria-colindex={1}><span>Worauf es ankommt</span></th>
              <th scope="col" role="columnheader" aria-colindex={2}>
                <div className={styles.generalHeader}>
                  <span className={styles.generalTitle}>Nur Software<br /> und Einzellösungen</span>
                </div>
              </th>
              <th scope="col" role="columnheader" aria-colindex={3}>
                <div className={styles.coverHeader}>
                  <Image className={styles.coverLogo} src="/brand/cover-logo.png" alt="COVER" width={250} height={74} sizes="125px" />
                  <span className={styles.coverSubtitle}>Software + fachkundige Unterstützung</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            {comparison.map((row) => (
              <tr key={row.topic} role="row">
                <th scope="row" className={styles.rowHeading} role="rowheader" aria-colindex={1}><span data-comparison-content>{row.topic}</span></th>
                <td className={styles.generalCell} role="cell" aria-colindex={2}>
                  <div className={styles.cell}>
                    <div data-comparison-content>
                      <span className={styles.mobileLabel}>Nur Software / Einzellösungen</span>
                      <div className={styles.statement}><ComparisonIcon check={false} /><div><p>{row.general}</p><p className={styles.detail}>{row.generalDetail}</p></div></div>
                    </div>
                  </div>
                </td>
                <td className={styles.coverCell} role="cell" aria-colindex={3}>
                  <div className={styles.cell}>
                    <div data-comparison-content>
                      <span className={styles.mobileLabel}>Mit COVER</span>
                      <div className={styles.statement}><ComparisonIcon check /><div><p>{row.cover}</p><p className={styles.detail}>{row.coverDetail}</p></div></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Reveal className={styles.closing} group>
          <p>Wählen Sie die Software. Ergänzen Sie die Unterstützung, die Sie brauchen.</p>
          <Link href="/kontakt" className={styles.contact}>Mit COVER sprechen <svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
        </Reveal>
      </div>
    </section>
  );
}
