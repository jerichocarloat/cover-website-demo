import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHeader, StepList, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Kundenentwicklung",
  description: "Kommunikation entlang der Kundenbeziehung, Kundenbindung und ergänzende Angebote aus verbundenen Verlagsdaten.",
  alternates: { canonical: "/kundenentwicklung" }
};

export default function GrowthPage() {
  return (
    <main id="main" lang="de">
      <PageHero
        eyebrow="COVER Kundenentwicklung"
        title="Aus Kundendaten werden relevante nächste Schritte"
        intro="COVER verbindet Vertrags-, Kauf- und Service-Daten mit Marketingautomatisierung. So entstehen Kommunikationsabläufe, die zu einem konkreten Ereignis passen."
      >
        <Link className="button" href="/kontakt">90-Tage-Pilot besprechen</Link>
      </PageHero>

      <section className="section shell">
        <SectionHeader number="01" eyebrow="Kommunikationsabläufe" title="Kommunikation beginnt mit einem echten Signal" />
        <div className="journey-lines">
          {[
            ['Erstkauf','Begleitung beim Einstieg, passende Inhalte und nächster sinnvoller Schritt'],
            ['Abo-Abschluss','Willkommen, Nutzung, Service und Verlängerung'],
            ['Einzelkauf','Relevantes Abo oder thematisch passende Ergänzung'],
            ['Inaktivität','Reaktivierung anhand von Interesse und Historie'],
            ['Kündigung','Schnelle, wertschätzende Rückgewinnung'],
            ['Servicekontakt','Kontextbezogene Information statt Serienmail']
          ].map(([signal,outcome],index)=><div key={signal}><span>{String(index+1).padStart(2,'0')}</span><strong>{signal}</strong><i aria-hidden="true"/><p>{outcome}</p></div>)}
        </div>
      </section>

      <section className="section section-citrus">
        <div className="shell">
          <SectionHeader number="02" eyebrow="Erste Pilotversion" title="Der 90-Tage-Pilot für Kundenbeziehungen" text="Klein genug, um sauber zu lernen. Relevant genug, um eine echte Entscheidung zu treffen." />
          <StepList items={[
            {title:'Datenbasis und Einwilligung',text:'Saubere Quellen, klare Segmente und relevante Signale für jeden Kommunikationsablauf.'},
            {title:'Ein Ziel festlegen',text:'Zum Beispiel Aktivierung, Rückgewinnung, ergänzende Angebote oder Reaktivierung.'},
            {title:'Zwei Kommunikationsabläufe umsetzen',text:'Logik, Inhalte, Technik, Tests und Verantwortlichkeiten verbinden.'},
            {title:'Messen und verbessern',text:'Ergebnisse auswerten und den Kommunikationsablauf gezielt weiterentwickeln.'}
          ]}/>
        </div>
      </section>

      <section className="section shell split-layout">
        <div><p className="eyebrow">Was dazugehört</p><h2>System, Inhalt und Betrieb müssen zusammenspielen</h2></div>
        <div className="feature-copy">
          <ul className="check-list"><li>Daten- und Kommunikationskonzept</li><li>Segmente und Auslöser</li><li>Automatisierung und Integration</li><li>Texte, Landingpage und Qualitätssicherung</li><li>Berichtswesen und Optimierung</li></ul>
        </div>
      </section>

      <section className="section section-ink"><div className="shell split-layout"><div><p className="eyebrow light">Besser werden</p><h2>Wachstum wird gemessen und verbessert</h2></div><div className="feature-copy"><p className="large-copy">Mit einer klaren Ausgangsbasis lernen Sie aus jedem Kommunikationsablauf und bauen die Maßnahmen aus, die Kundenbeziehungen stärken.</p><TextLink href="/kontakt">Pilotpotenzial prüfen</TextLink></div></div></section>
    </main>
  );
}
