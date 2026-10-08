import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Lösungen", description: "COVER Lösungen entlang zentraler Verlagsabläufe.", alternates: { canonical: "/loesungen" } };

const solutions = [
  {n:'01',title:'Vom Abo bis zum Zahlungseingang',for:'Abo, Finanzen, IT',problem:'Digitale und gedruckte Abos, Zahlungen, Versand, Zugang und Service durchgängig steuern.',parts:['Abonnement','Zahlungsabwicklung','E-Commerce','Digitaler Zugang','Debitoren','Kundenservice']},
  {n:'02',title:'Vom Produkt bis zum Markt',for:'Produkt, Redaktion, Rechte',problem:'Von der Idee über Herstellung und Metadaten bis zu Vertrieb und Abrechnung.',parts:['Produktmanagement','Redaktion','Rechte & Lizenzen','Honorare','ONIX','E-Commerce']},
  {n:'03',title:'Vom Anzeigenauftrag bis zur Rechnung',for:'Anzeigenvertrieb, Betrieb, Finanzen',problem:'Crossmediale Angebote, Prognosen, Disposition, Material, Provision und Faktura verbinden.',parts:['CRM','Anzeigen','Prognosen','Heftplanung','Provision','Finanzen']},
  {n:'04',title:'Der Lebenszyklus der Kundenbeziehung',for:'Marketing, Abo, Service',problem:'Kunden-, Kauf- und Service-Signale für relevante Kommunikation und Bindung nutzen.',parts:['CRM','Segmente','Automatisierung','Begleitung beim Einstieg','Kundenbindung','Berichtswesen']}
];

export default function SolutionsPage(){return <main id="main" lang="de"><PageHero eyebrow="Lösungen" title="Beginnen Sie mit dem Ablauf, nicht mit der Modulliste" intro="COVER verbindet Software und Services entlang der Abläufe, die für Ihr Geschäftsergebnis zählen." />
<section className="section shell"><SectionHeader number="01" eyebrow="Vier Ausgangspunkte" title="Ein Ziel. Mehrere verbundene Bausteine"/><div className="solution-stack">{solutions.map(s=><article key={s.n}><div className="solution-meta"><span>{s.n}</span><small>{s.for}</small></div><div><h2>{s.title}</h2><p>{s.problem}</p><ul>{s.parts.map(p=><li key={p}>{p}</li>)}</ul></div><Link className="text-link" href="/kontakt">Lösung besprechen <span aria-hidden="true">↗</span></Link></article>)}</div></section></main>}
