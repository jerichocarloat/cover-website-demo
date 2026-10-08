"use client";

import { useEffect, useId, useRef, useState } from "react";
import { assetPath } from "@/lib/site";
import styles from "./CustomerLogos.module.css";

const logos = [
  { name: "Red Bull Media House", file: "redbull-logo.png" },
  { name: "Landwirtschaftsverlag", file: "landwirtschaftsverlag.png" },
  { name: "Carus-Verlag", file: "carus.png" },
  { name: "HEROLD", file: "herold.png" },
  { name: "Kohlhammer", file: "kohlhammer.png" },
  { name: "Herder", file: "herder-1.png" },
  { name: "Narr Francke Attempto Verlag", file: "nfa.png" },
  { name: "Verlag Eugen Ulmer", file: "ulmer.png" },
  { name: "VTH — Verlag für Technik und Handwerk", file: "vth.png" },
] as const;

type CustomerLogosProps = {
  id?: string;
  heading?: string;
};

export default function CustomerLogos({
  id = "customer-logos",
  heading = "In guter Gesellschaft.",
}: CustomerLogosProps) {
  const titleId = useId();
  const logosId = useId();
  const section = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setHidden(document.hidden);
    updateMotion();
    updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    if (section.current) observer.observe(section.current);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  const playing = visible && !hidden && !reducedMotion && !expanded && !hovered && !focused;

  return (
    <section
      id={id}
      ref={section}
      className={styles.section}
      aria-labelledby={titleId}
      data-playing={playing}
      data-reduced-motion={reducedMotion}
      data-expanded={expanded}
      onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className={`shell ${styles.heading}`}>
        <div>
          <p className={styles.eyebrow}>Eine Auswahl unserer Kunden</p>
          <h2 id={titleId}>{heading}</h2>
        </div>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={expanded}
          aria-controls={logosId}
          onClick={() => setExpanded(value => !value)}
        >
          {expanded ? "Weniger anzeigen" : "Alle Verlage ansehen"}
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d={expanded ? "m4 10 4-4 4 4" : "m4 6 4 4 4-4"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
      <div className={styles.viewport} id={logosId}>
        <div className={styles.track}>
          {[false, true].map(duplicate => (
            <ul className={styles.sequence} key={String(duplicate)} aria-hidden={duplicate ? true : undefined}>
              {logos.map(logo => (
                <li key={logo.file}>
                  <img
                    src={assetPath(`/customer-logos/${logo.file}`)}
                    alt={duplicate ? "" : logo.name}
                    width={100}
                    height={50}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
