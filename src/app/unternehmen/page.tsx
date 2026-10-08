import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/components/SiteImage";
import { ProofBar } from "@/components/ui";
import { ArrowIcon } from "@/components/CoverIcon";
import StrategyCTA from "@/components/StrategyCTA";

export const metadata: Metadata = { title: "Über COVER", description: "Verlagskompetenz seit 1997. COVER aus Böblingen verbindet Verlagssoftware, spezialisierte Serviceteams und praktische Branchenkenntnis.", alternates: { canonical: "/unternehmen" } };
export default function CompanyPage() {
  return <main id="main" lang="de">
    <section className="premium-hero" aria-labelledby="about-title"><div className="shell premium-hero-grid">
      <div className="premium-hero-copy"><p className="eyebrow">Über COVER</p><h1 id="about-title">Verlagskompetenz.<br /><span>Seit 1997.</span></h1><p className="premium-hero-intro">COVER entwickelt in Böblingen ERP-, CRM- und E-Commerce-Software für Verlage. Spezialisierte Serviceteams unterstützen die Menschen und Prozesse hinter dem Verlagsgeschäft.</p><Link className="button" href="/kontakt">Mit COVER sprechen <ArrowIcon direction="up-right" /></Link></div>
      <div className="services-hero-photo"><Image src="/photos/shared-software-workspace-v6.webp" fill sizes="(max-width: 980px) 90vw, 48vw" alt="Menschen arbeiten gemeinsam mit Laptops an einem Arbeitsplatz" preload /></div>
    </div></section>
    <ProofBar />
    <section className="section service-editorial" aria-labelledby="about-story-title"><div className="shell service-editorial-grid">
      <div className="service-editorial-copy"><p className="eyebrow">Eine Branche. Gemeinsames Wissen.</p><h2 id="about-story-title">Entwickelt für die Art,<br />wie Verlage arbeiten.</h2><p>Bücher, Zeitschriften, Anzeigen, Veranstaltungen und digitale Produkte stellen unterschiedliche kaufmännische Anforderungen. Durch den Fokus auf Verlage verstehen die COVER Teams die Zusammenhänge zwischen Produkten, Kunden und der täglichen Arbeit dahinter.</p><p>Servicefachkräfte arbeiten eng mit Produktmanagement und Entwicklung zusammen. Erfahrungen aus dem Verlagsbetrieb fließen in die Software ein. Zugleich gibt die Software den Teams Werkzeuge für wiederkehrende Aufgaben an die Hand.</p><Link className="text-link" href="/services">Unsere Services kennenlernen <ArrowIcon direction="up-right" /></Link></div>
      <div className="editorial-photo"><Image src="/photos/printing-press-v6.webp" fill sizes="(max-width: 720px) 90vw, 45vw" alt="Papier läuft durch eine Druckmaschine" /></div>
    </div></section>
    <StrategyCTA />
  </main>;
}
