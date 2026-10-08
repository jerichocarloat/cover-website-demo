"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cssTimeMs } from "@/lib/motion";
import { testimonials } from "@/lib/content";
import { ArrowIcon } from "./CoverIcon";
import styles from "./Testimonials.module.css";

export default function Testimonials({ id = "kundenstimmen" }: { id?: string }) {
  const titleId = useId();
  const [active, setActive] = useState(0);
  const [manuallySelected, setManuallySelected] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [announcement, setAnnouncement] = useState<number | null>(null);
  const quote = testimonials[active];
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);
  const animateChange = useRef(false);

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

  const playing = visible && !hidden && !reducedMotion && !manuallySelected && !hovered && !focused;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      animateChange.current = true;
      setActive(index => (index + 1) % testimonials.length);
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [active, playing]);

  useEffect(() => {
    if (!animateChange.current || !stage.current) return;
    animation.current?.cancel();
    const tokens = getComputedStyle(stage.current);
    animation.current = stage.current.animate([{ opacity: .5 }, { opacity: 1 }], { duration: cssTimeMs(tokens.getPropertyValue("--motion-reduced"), 200), easing: tokens.getPropertyValue("--ease-out").trim() });
    animateChange.current = false;
    return () => { animation.current?.cancel(); };
  }, [active]);

  const select = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    const next = (index + testimonials.length) % testimonials.length;
    animation.current?.cancel();
    animateChange.current = event.detail > 0;
    setManuallySelected(true);
    setAnnouncement(next);
    setActive(next);
  };

  return (
    <section
      className={styles.root}
      id={id}
      ref={section}
      aria-labelledby={titleId}
      aria-roledescription="Karussell"
      data-playing={playing}
      onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className={`shell ${styles.layout}`}>
        <div className={styles.intro}>
          <header className={styles.heading}>
            <p className="eyebrow">Kundenstimmen</p>
            <h2 id={titleId}>Was Verlage sagen.</h2>
          </header>
          <div className={styles.tabs} aria-label="Kundenstimme auswählen">
            {testimonials.map((item, index) => <button type="button" key={item.name} aria-pressed={active === index} onClick={event => select(index, event)}>{item.label}</button>)}
          </div>
        </div>
        <div className={styles.statement}>
          <div className={styles.quoteStage} ref={stage} aria-live="off">
            <blockquote lang="de">„{quote.quote}“<footer><strong>{quote.name}</strong><span>{quote.role} · {quote.publisher}</span></footer></blockquote>
          </div>
          <div className={styles.controls}>
            <span>{String(active + 1).padStart(2, "0")} <span className="muted">/ {String(testimonials.length).padStart(2, "0")}</span></span>
            <button type="button" className={`${styles.arrowButton} ${styles.previous}`} aria-label="Vorherige Kundenstimme" onClick={event => select(active - 1, event)}><ArrowIcon /></button>
            <button type="button" className={styles.arrowButton} aria-label="Nächste Kundenstimme" onClick={event => select(active + 1, event)}><ArrowIcon /></button>
          </div>
        </div>
        <div className={styles.liveRegion} aria-live="polite" aria-atomic="true">
          {announcement !== null && <><span>Kundenstimme {announcement + 1} von {testimonials.length}. </span><span lang="de">{testimonials[announcement].quote}</span><span> — {testimonials[announcement].name}, {testimonials[announcement].label}.</span></>}
        </div>
      </div>
    </section>
  );
}
