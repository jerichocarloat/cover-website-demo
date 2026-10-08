"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "@/components/SiteImage";
import Link from "next/link";
import { cssTimeMs } from "@/lib/motion";
import { ArrowIcon } from "./CoverIcon";
import Reveal from "./Reveal";
import styles from "./ServiceExperience.module.css";

const services = [
  {
    title: "Kunden- und Aboservice",
    text: "Erfahrene Menschen für Ihre Kunden und Abonnenten.",
    capabilities: ["Kundenanfragen", "Bestellungen und Aboänderungen", "Kundendaten"],
    href: "/services#customer-service",
    image: "/photos/customer-support-editorial-v3.webp",
    alt: "Fachkräfte im Kundenservice arbeiten mit vernetzten Verlagssystemen.",
    width: 1122,
    height: 1402,
    position: .48,
    vertical: .15,
  },
  {
    title: "Buchhaltung und Verwaltung",
    text: "Fachkundige Unterstützung für Finanz- und Verwaltungsprozesse.",
    capabilities: ["Unterstützung in der Buchhaltung", "Finanzverwaltung", "Honorarabrechnungen"],
    href: "/services#accounting",
    image: "/photos/cover-erp-v6.jpg",
    alt: "Ein Taschenrechner und Unterlagen für die Finanzverwaltung.",
    width: 3200,
    height: 2134,
    position: .5,
    vertical: .5,
  },
  {
    title: "Verlagsprozesse",
    text: "Spezialisierte Unterstützung für die täglichen Aufgaben im Verlag.",
    capabilities: ["Anzeigenverwaltung", "Verlagsspezifische Abläufe", "Lettershop und Logistik"],
    href: "/services#publishing-operations",
    image: "/photos/printing-press-v6.webp",
    alt: "Bedruckte Papierbahnen durchlaufen eine Druckmaschine.",
    width: 3200,
    height: 2136,
    position: .5,
    vertical: .5,
  },
  {
    title: "Marketing und Kundenentwicklung",
    text: "Nutzen Sie Kundendaten und Kampagnen, um Kundenbindung und Wachstum zu stärken.",
    capabilities: ["Bestandskundenmarketing", "Kundenbindung und Reaktivierung", "Unterstützung bei der Interessentengewinnung"],
    href: "/services#marketing-growth",
    image: "/photos/cover-service-2-v6.jpg",
    alt: "Ein blaues Diagramm veranschaulicht Kunden- und Marketingdaten.",
    width: 1920,
    height: 1357,
    position: .5,
    vertical: .5,
  },
] as const;

type VisualSnapshot = {
  element: HTMLElement;
  bounds: DOMRect;
  kind: string | undefined;
  radius: string;
  image?: { element: HTMLImageElement; bounds: DOMRect };
};

function captureLayer(element: HTMLElement): VisualSnapshot {
  const rect = element.getBoundingClientRect();
  const style = getComputedStyle(element);
  let bounds = rect;
  let radius = style.borderRadius || "0px";

  // An interrupted photo reveal must resume from its visible crop, not from
  // the larger rectangle hidden behind the mask.
  const mask = style.clipPath.match(/^inset\((.*?)\s+round\s+(.*?)\)$/);
  if (mask) {
    const edges = mask[1].split(/\s+/).map((edge) => Number.parseFloat(edge) || 0);
    const [top, right = top, bottom = top, left = right] = edges;
    bounds = new DOMRect(
      rect.left + left,
      rect.top + top,
      rect.width - left - right,
      rect.height - top - bottom,
    );
    radius = mask[2];
  }

  const image = element.dataset.motionLayer === "photo" ? element.querySelector("img") : null;
  return { element, bounds, kind: element.dataset.motionLayer, radius, image: image ? { element: image, bounds: image.getBoundingClientRect() } : undefined };
}

export default function ServiceExperience() {
  const rowsRef = useRef<Array<HTMLDivElement | null>>([]);
  const animationsRef = useRef(new Map<HTMLDivElement, Animation[]>());
  const expansionEnabledRef = useRef(false);
  const pointerPositionsRef = useRef(new WeakMap<HTMLDivElement, { x: number; y: number }>());

  const cancelRow = (row: HTMLDivElement) => {
    animationsRef.current.get(row)?.forEach((animation) => animation.cancel());
    animationsRef.current.delete(row);
  };

  const changeRow = (row: HTMLDivElement, expanded: number | null, animated: boolean) => {
    const next = expanded === null ? "none" : String(expanded);
    if (row.dataset.expanded === next) {
      if (!animated) cancelRow(row);
      return;
    }
    const before = Array.from(row.querySelectorAll<HTMLElement>("[data-motion-layer]")).map(captureLayer);

    // Capture current visual bounds before cancelling an interrupted animation.
    cancelRow(row);
    row.dataset.expanded = next;
    row.querySelectorAll<HTMLElement>("[data-service-card]").forEach((card, index) => {
      card.dataset.state = expanded === null ? "preview" : index === expanded ? "active" : "quiet";
    });
    if (!animated || !("animate" in row)) return;

    // Commit the grid once. Move the surface, copy, CTA and image independently:
    // the text is never scaled or stretched by the resizing background.
    const after = before.map((snapshot) => ({
      ...snapshot,
      finalBounds: snapshot.element.getBoundingClientRect(),
      finalImageBounds: snapshot.image?.element.getBoundingClientRect(),
    }));
    const tokens = getComputedStyle(row);
    const duration = cssTimeMs(tokens.getPropertyValue("--service-flip"), 560);
    const easing = tokens.getPropertyValue("--service-easing").trim() || "cubic-bezier(.32,.72,0,1)";
    const running: Animation[] = [];

    after.forEach(({ element, bounds, finalBounds, kind, radius, image, finalImageBounds }) => {
      if (!finalBounds.width || !finalBounds.height) return;
      const x = bounds.left - finalBounds.left;
      const y = bounds.top - finalBounds.top;

      if (kind === "photo") {
        // The crop translates but never scales. Its full, uncropped image is
        // a separate uniform-scale layer, so reversing cannot change the zoom
        // abruptly when the destination has a different aspect ratio.
        running.push(element.animate([
          {
            transform: `translate(${x}px, ${y}px)`,
            clipPath: `inset(0px ${finalBounds.width - bounds.width}px ${finalBounds.height - bounds.height}px 0px round ${radius})`,
          },
          { transform: "translate(0, 0)", clipPath: getComputedStyle(element).clipPath },
        ], { duration, easing }));
        if (image && finalImageBounds?.width) {
          const scale = image.bounds.width / finalImageBounds.width;
          running.push(image.element.animate([
            { transform: `translate(${image.bounds.left - finalImageBounds.left - x}px, ${image.bounds.top - finalImageBounds.top - y}px) scale(${scale})` },
            { transform: "translate(0, 0) scale(1)" },
          ], { duration, easing }));
        }
      } else {
        const scale = kind === "surface" ? ` scale(${bounds.width / finalBounds.width}, ${bounds.height / finalBounds.height})` : "";
        running.push(element.animate([
          { transform: `translate(${x}px, ${y}px)${scale}` },
          { transform: "translate(0, 0)" },
        ], { duration, easing }));
      }
    });

    animationsRef.current.set(row, running);
    void Promise.allSettled(running.map((animation) => animation.finished)).then(() => {
      if (animationsRef.current.get(row) === running) animationsRef.current.delete(row);
    });
  };

  useEffect(() => {
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const desktop = window.matchMedia("(min-width: 1101px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const resetRows = () => {
      rowsRef.current.forEach((row) => {
        if (!row) return;
        cancelRow(row);
        row.dataset.expanded = "none";
        pointerPositionsRef.current.delete(row);
        row.querySelectorAll<HTMLElement>("[data-service-card]").forEach((card) => { card.dataset.state = "preview"; });
      });
    };
    const handleEnvironment = () => {
      expansionEnabledRef.current = pointer.matches && desktop.matches && !reduced.matches;
      resetRows();
    };
    handleEnvironment();
    pointer.addEventListener("change", handleEnvironment);
    desktop.addEventListener("change", handleEnvironment);
    reduced.addEventListener("change", handleEnvironment);
    window.addEventListener("resize", resetRows, { passive: true });
    return () => {
      pointer.removeEventListener("change", handleEnvironment);
      desktop.removeEventListener("change", handleEnvironment);
      reduced.removeEventListener("change", handleEnvironment);
      window.removeEventListener("resize", resetRows);
      animationsRef.current.forEach((animations) => animations.forEach((animation) => animation.cancel()));
      animationsRef.current.clear();
    };
  }, []);

  return (
    <section id="services" className={`${styles.section} section`} aria-labelledby="services-title">
      <div className="shell">
        <Reveal className={styles.heading} group>
          <p className="eyebrow">COVER Services</p>
          <h2 id="services-title">Spezialisierte Services.<br />Mehr Kapazität für Ihr Team.</h2>
          <p className={styles.intro}>Erfahrene Teams für Kundenservice, Finanzen, Verlagsprozesse und Marketing. Wählen Sie die Unterstützung, die Ihr Unternehmen braucht.</p>
        </Reveal>
        <div className={styles.rows}>
          {[services.slice(0, 2), services.slice(2, 4)].map((pair, rowIndex) => (
            <div
              className={styles.row}
              key={rowIndex}
              ref={(element) => { rowsRef.current[rowIndex] = element; }}
              data-expanded="none"
              onPointerMove={(event) => {
                const row = event.currentTarget;
                if (!expansionEnabledRef.current || event.pointerType !== "mouse" || row.querySelector(":focus-visible")) return;
                const previous = pointerPositionsRef.current.get(row);
                if (previous?.x === event.clientX && previous?.y === event.clientY) return;
                pointerPositionsRef.current.set(row, { x: event.clientX, y: event.clientY });
                // Test the moving visual surface from a stable row listener.
                // A small edge deadband prevents toggling at the shared seam.
                const surfaces = Array.from(row.querySelectorAll<HTMLElement>('[data-motion-layer="surface"]'));
                const hovered = surfaces.findIndex((surface) => {
                  const bounds = surface.getBoundingClientRect();
                  return event.clientX > bounds.left + 3 && event.clientX < bounds.right - 3;
                });
                if (hovered !== -1) changeRow(row, hovered, true);
              }}
              onPointerLeave={(event) => {
                pointerPositionsRef.current.delete(event.currentTarget);
                if (expansionEnabledRef.current && event.pointerType === "mouse") changeRow(event.currentTarget, null, true);
              }}
              onFocusCapture={(event) => {
                // Keyboard focus is instant. Pointer focus must not move a link
                // out from under the click while the card is expanded.
                if (event.target instanceof HTMLElement && event.target.matches(":focus-visible")) changeRow(event.currentTarget, null, false);
              }}
            >
              {pair.map((service, cardIndex) => (
                <Link
                  className={styles.card}
                  key={service.title}
                  href={service.href}
                  data-service-card
                  data-state="preview"
                >
                  <span className={styles.surface} data-motion-layer="surface" aria-hidden="true" />
                  <div className={styles.copy} data-motion-layer="copy">
                    <span className={styles.index} aria-hidden="true">0{rowIndex * 2 + cardIndex + 1}</span>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <ul className={styles.capabilities}>
                      {service.capabilities.map((capability) => <li key={capability}>
                        <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 7 2.5 2.5L11 4" /></svg>
                        <span>{capability}</span>
                      </li>)}
                    </ul>
                  </div>
                  <span className={styles.link} data-motion-layer="cta">
                    <span className={styles.ctaLabel}>Service kennenlernen</span>
                    <span className={styles.ctaArrow}><ArrowIcon /></span>
                  </span>
                  <div className={styles.photo} data-motion-layer="photo" style={{ "--image-ratio": service.width / service.height, "--image-position": service.position, "--image-position-y": service.vertical } as CSSProperties}>
                    <Image src={service.image} alt={service.alt} width={service.width} height={service.height} sizes={`(max-width: 740px) 90vw, (max-width: 1100px) 600px, ${Math.ceil(500 * service.width / service.height)}px`} />
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
