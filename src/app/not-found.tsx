import Link from "next/link";
import { ArrowIcon } from "@/components/CoverIcon";

export default function NotFound() {
  return <main id="main" lang="de" className="premium-home"><section className="section"><div className="shell">
    <p className="eyebrow">404 — Seite nicht gefunden</p>
    <h1>Diese Seite ist nicht verfügbar.</h1>
    <p>Über die Startseite finden Sie die Software und Services von COVER.</p>
    <Link href="/" className="button">Zur Startseite <ArrowIcon direction="right" /></Link>
  </div></section></main>;
}
