import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHeader, StepList, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Verlagsbetrieb",
  description: "Spezialisierte Teams für Kundenservice, Finanzen, Anzeigen und weitere Verlagsprozesse.",
  alternates: { canonical: "/operations" }
};

export default function OperationsPage() {
  return (
    <main id="main" lang="de">
      <PageHero
        eyebrow="COVER Verlagsbetrieb"
        title="Eingearbeitete Teams für den laufenden Verlagsbetrieb"
        intro="Lagern Sie ausgewählte kaufmännische Prozesse aus, ohne Software und Betrieb voneinander zu trennen. COVER arbeitet im gleichen Systemkontext wie Ihr Team."
      >
        <Link className="button" href="/kontakt">Service-Modell prüfen</Link>
      </PageHero>

      <section className="section shell">
        <SectionHeader number="01" eyebrow="Leistungsbereiche" title="Definierte Verantwortung statt anonymer Auslagerung" />
        <div className="service-list">
          {[
            ['Kunden- und Aboservice','Aufträge, Anfragen, Vertragsänderungen, Kündigungen und Rückgewinnung mit vollständigem Kundenkontext.'],
            ['Buchhaltung','Unterstützung in Debitoren- und Kreditorenprozessen, abgestimmt auf Ihre Systemlandschaft.'],
            ['Anzeigen und Media','Operative Abwicklung von der Buchung bis zur Faktura, damit Verkaufsteams verkaufen können.'],
            ['Honorarabrechnung','Wiederkehrende, sorgfältige Abrechnung nach den vereinbarten Vertragslogiken.'],
            ['Lettershop und Logistik','Koordination von Versand- und Logistikleistungen mit gebündelten Mengen und etablierten Abläufen.'],
            ['Hosting und technischer Betrieb','Betrieb, Datensicherung, Updates und ein zentraler Ansprechpartner für die COVER Umgebung.']
          ].map(([title,text],index)=><article key={title}><span>{String(index+1).padStart(2,'0')}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="section section-ink">
        <div className="shell split-layout">
          <div><p className="eyebrow light">Der operative Vorteil</p><h2>Service-Erfahrung fließt zurück ins System</h2></div>
          <div className="feature-copy">
            <p className="large-copy">Service-Teams sehen wiederkehrende Engpässe im Alltag. Produktmanagement und Entwicklung können daraus bessere Konfigurationen und Automatisierungen entwickeln.</p>
            <div className="stat-callout"><strong>40+</strong><span>feste Service-Mitarbeitende</span></div>
          </div>
        </div>
      </section>

      <section className="section shell">
        <SectionHeader number="03" eyebrow="Zusammenarbeit" title="Ein klares Betriebsmodell vor dem ersten Vorgang" />
        <StepList items={[
          {title:'Umfang festlegen',text:'Welche Vorgänge, Kanäle und Ausnahmen gehören in den Service?'},
          {title:'Rollen vereinbaren',text:'Verantwortung, Freigaben, Datenzugriff und Eskalation definieren.'},
          {title:'Wissen übergeben',text:'Prozesse, Tonalität, Kundenregeln und Qualitätsfälle trainieren.'},
          {title:'Kontrolliert starten',text:'Volumen stufenweise übergeben und Ergebnisse gemeinsam prüfen.'},
          {title:'Verbessern',text:'Berichte und Fallmuster für Automatisierung und Prozessentwicklung nutzen.'}
        ]}/>
      </section>

      <section className="section paper-cta"><div className="shell split-layout"><div><p className="eyebrow">Kapazität mit System</p><h2>Welcher Prozess bindet heute die falschen Ressourcen?</h2></div><div className="feature-copy"><p>Wir grenzen einen geeigneten Prozess ab und klären, ob Software, Service oder eine Kombination den besseren Einstieg bietet.</p><TextLink href="/kontakt">Servicebedarf prüfen lassen</TextLink></div></div></section>
    </main>
  );
}
