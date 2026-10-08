import Image from "@/components/SiteImage";
import { ArrowIcon } from "./CoverIcon";
import Reveal from "./Reveal";
import { coverImageSizes } from "@/lib/image-sizes";
import styles from "@/app/DetailExperience.module.css";

export function TaskList({ items }: { items: string[] }) {
  return <ul className={styles.tasks}>{items.map(item => <li key={item}>
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>{item}
  </li>)}</ul>;
}

export function DetailPhoto({ src, alt }: { src: string; alt: string }) {
  // All chapter photographs use the same 3:2 source ratio and responsive crop.
  return <Reveal className={styles.photo} image><Image src={src} alt={alt} fill sizes={coverImageSizes({ width: 3, height: 2, mobileHeight: 384, desktopHeight: 480 })} /></Reveal>;
}

export function DisclosureIcon() {
  return <span className={styles.disclosureIcon} aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none"><path d="M6 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /><path className={styles.disclosureVertical} d="M12 6v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
  </span>;
}

export function ProcessBand({ steps, label }: { steps: Array<{ title: string; text: string }>; label: string }) {
  return <ol className={styles.process} aria-label={label}>{steps.map((step, index) => <li key={step.title}>
    <span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p>{index < steps.length - 1 && <ArrowIcon />}
  </li>)}</ol>;
}
