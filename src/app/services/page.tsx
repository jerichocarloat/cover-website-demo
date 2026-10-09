import type { Metadata } from "next";
import Image from "@/components/SiteImage";
import Link from "next/link";
import { ArrowIcon } from "@/components/CoverIcon";
import { DetailPhoto, TaskList } from "@/components/DetailElements";
import ExperienceBenefits from "@/components/ExperienceBenefits";
import CustomerLogos from "@/components/CustomerLogos";
import Testimonials from "@/components/Testimonials";
import StrategyCTA from "@/components/StrategyCTA";
import Reveal from "@/components/Reveal";
import { coverImageSizes } from "@/lib/image-sizes";
import styles from "../DetailExperience.module.css";

export const metadata: Metadata = {
  title: "Spezialisierte Services für Verlage",
  description: "Kundenservice, Buchhaltung, Verlagsprozesse und Kundenmarketing. Erfahrene COVER Teams und flexible Kapazitäten für die Arbeit hinter Ihren Publikationen.",
  alternates: { canonical: "/services" },
};

const serviceAreas = [
  { title: "Kunden- und Aboservice", text: "Kunden und Abonnenten gut betreuen.", href: "customer-service", image: "customer-support-editorial-v3.webp", width: 1122, height: 1402, alt: "Fachkräfte bei der Kundenbetreuung" },
  { title: "Buchhaltung und Verwaltung", text: "Finanzielle Aufgaben geordnet abwickeln.", href: "accounting", image: "cover-erp-v6.jpg", width: 3200, height: 2134, alt: "Rechnungen und ein Taschenrechner" },
  { title: "Verlagsprozesse", text: "Die spezialisierten Aufgaben im Verlag übernehmen.", href: "publishing-operations", image: "printing-press-v6.webp", width: 3200, height: 2136, alt: "Gedruckte Publikationen laufen durch eine Druckmaschine" },
  { title: "Marketing und Kundenentwicklung", text: "Ihre Kundenbeziehungen weiterentwickeln.", href: "marketing-growth", image: "cover-service-2-v6.jpg", width: 1920, height: 1357, alt: "Auswertung von Kunden- und Kampagnendaten" },
];

export default function ServicesPage() {
  return <main id="main" lang="de" className={styles.page}>
    <section className={styles.hero} aria-labelledby="services-hero-title">
      <div className={`shell ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">COVER Services für Verlage</p>
          <h1 id="services-hero-title">Ihr Kerngeschäft.<br /><span>Unsere spezialisierte Unterstützung.</span></h1>
          <p>Kundenservice, Buchhaltung, Verlagsprozesse und Kundenmarketing. Erfahrene Teams übernehmen die tägliche Arbeit, damit Sie sich auf Ihre Publikationen und Ihr Geschäft konzentrieren können.</p>
          <a className="button" href="#service-areas">Die passende Unterstützung finden <ArrowIcon direction="down" /></a>
        </div>
        <div className={styles.heroVisual}>
          <div className={`${styles.heroPhoto} ${styles.customerHero}`}><Image src="/photos/customer-support-editorial-v3.webp" alt="Fachkräfte im Kundenservice besprechen ihre Arbeit am Computer" fill sizes="(max-width: 980px) calc(100vw - 3rem), (max-width: 1400px) 44vw, 584px" preload /></div>
        </div>
      </div>
    </section>

    <section id="service-areas" className={styles.overview} aria-labelledby="service-areas-title">
      <div className="shell">
        <header className={styles.heading}><div><p className="eyebrow">Vier Bereiche, die Ihr Team entlasten</p><h2 id="service-areas-title">Die richtige Fachkompetenz.<br />Dort, wo Sie sie brauchen.</h2></div><p>Sie müssen nicht jede Funktion selbst aufbauen. Entscheiden Sie, welche Aufgaben COVER übernehmen soll. Die Unterstützung lässt sich anpassen, wenn sich Ihr Arbeitsaufkommen verändert.</p></header>
        <nav className={`${styles.navigator} ${styles.four}`} aria-label="Die vier Servicebereiche entdecken">
          {serviceAreas.map((area, index) => <a key={area.href} href={`#${area.href}`} className={styles.navItem}>
            <div className={styles.navImage}><Image src={`/photos/${area.image}`} alt={area.alt} fill sizes={coverImageSizes({ width: area.width, height: area.height, mobileHeight: 240, desktopHeight: 400, mobileSlot: "110px", desktopSlot: "max(17vw, 228px)" })} /></div>
            <div className={styles.navTop}><span>{String(index + 1).padStart(2, "0")}</span><ArrowIcon direction="down" /></div><h3>{area.title}</h3><p>{area.text}</p>
          </a>)}
        </nav>
      </div>
    </section>

    <section id="customer-service" className={styles.chapter} aria-labelledby="customer-service-title">
      <div className="shell">
        <div className={styles.chapterGrid}>
          <Reveal className={styles.copy} group><p className="eyebrow">01 / Kunden- und Aboservice</p><h2 id="customer-service-title">Für Ihre Kunden<br />da sein.</h2><p className={styles.lead}>Ein erfahrenes Team für die Anfragen, die jeden Tag eingehen.</p><p>Von der Frage zu einer Bestellung bis zur Aboänderung übernimmt COVER die Betreuung Ihrer Kunden und Abonnenten. Die Ihrem Verlag zugeordneten Mitarbeitenden lernen Ihre Produkte, Prozesse und Kunden kennen.</p><TaskList items={["Kunden- und Aboanfragen", "Bestellbearbeitung und Aboänderungen", "Kundenverwaltung und Datenpflege", "Kundenkommunikation"]} /><Link href="/kontakt" className="text-link">Kundenbetreuung besprechen <ArrowIcon direction="up-right" /></Link></Reveal>
          <DetailPhoto src="/photos/shared-software-workspace-v6.webp" alt="Kolleginnen und Kollegen arbeiten gemeinsam an Laptops" />
        </div>
      </div>
    </section>

    <section id="accounting" className={`${styles.chapter} ${styles.tinted}`} aria-labelledby="accounting-title">
      <div className="shell"><div className={`${styles.chapterGrid} ${styles.reverse}`}>
        <Reveal className={styles.copy} group><p className="eyebrow">02 / Buchhaltung und Verwaltung</p><h2 id="accounting-title">Finanzielle Aufgaben<br />zuverlässig abwickeln.</h2><p className={styles.lead}>Spezialisierte Kapazitäten für Ihre kaufmännische Verwaltung.</p><p>Rechnungen, Zahlungen und Honorare verlangen Sorgfalt. COVER unterstützt die Buchhaltungs- und Verwaltungsaufgaben Ihres Verlags mit verbundenen Systemen und Verlagskompetenz.</p><TaskList items={["Debitoren- und Kreditorenprozesse", "Buchhaltung und Finanzverwaltung", "Honorarabrechnungen", "Prozesse rund um die Abrechnung"]} /><Link href="/kontakt" className="text-link">Unterstützung in der Buchhaltung besprechen <ArrowIcon direction="up-right" /></Link></Reveal>
        <DetailPhoto src="/photos/cover-erp-v6.jpg" alt="Eine Person prüft Rechnungen mit einem Taschenrechner" />
      </div></div>
    </section>

    <section id="publishing-operations" className={styles.chapter} aria-labelledby="publishing-operations-title">
      <div className="shell">
        <div className={styles.chapterGrid}>
          <Reveal className={styles.copy} group><p className="eyebrow">03 / Verlagsprozesse</p><h2 id="publishing-operations-title">Verlagswissen.<br />Im täglichen Einsatz.</h2><p className={styles.lead}>Unterstützung für die Prozesse, die Verlage besonders machen.</p><p>Anzeigenverwaltung, Mailings und Versand müssen sorgfältig koordiniert werden. COVER bringt verlagsspezifische Erfahrung in die kaufmännische Arbeit hinter Ihren Publikationen ein.</p><TaskList items={["Anzeigen- und Mediaverwaltung", "Verlagsspezifische kaufmännische Abläufe", "Lettershop- und Mailingservices", "Versand- und Logistikkoordination"]} /><Link href="/kontakt" className="text-link">Ihre Verlagsprozesse besprechen <ArrowIcon direction="up-right" /></Link></Reveal>
          <DetailPhoto src="/photos/printing-press-v6.webp" alt="Druckbogen einer Publikation laufen durch eine Druckmaschine" />
        </div>
      </div>
    </section>

    <section id="marketing-growth" className={`${styles.chapter} ${styles.tinted}`} aria-labelledby="marketing-growth-title">
      <div className="shell">
        <div className={`${styles.chapterGrid} ${styles.reverse}`}>
          <Reveal className={styles.copy} group><p className="eyebrow">04 / Marketing und Kundenentwicklung</p><h2 id="marketing-growth-title">Mehr aus Ihren<br />Kundenbeziehungen machen.</h2><p className={styles.lead}>Unterstützung, die bei den Kunden ansetzt, die Sie bereits kennen.</p><p>COVER unterstützt Bestandskundenmarketing, die Rückgewinnung von Abonnenten und die Gewinnung von Interessenten. Kundenwissen und verbundene Software helfen Ihrem Team, die richtigen Menschen mit relevanterer Kommunikation zu erreichen.</p><TaskList items={["Bestandskundenmarketing und Kundenpflege", "Abonnentenbindung und Reaktivierung", "Unterstützung bei der Interessentengewinnung"]} /><Link href="/kontakt" className="text-link">Kundenentwicklung besprechen <ArrowIcon direction="up-right" /></Link></Reveal>
          <DetailPhoto src="/photos/publisher-bookshop.webp" alt="Ein Onlineshop für Bücher und Magazine auf einem Laptop, daneben gedruckte Publikationen" />
        </div>
        <div className={styles.growthPath} aria-label="Wie Technologie das Kundenmarketing unterstützt">
          <div><span>01 / Verstehen</span><h3>Ihre Kunden kennen.</h3><p>Die Kontakthistorie im CRM und die Kundensegmentierung helfen, relevante Zielgruppen zu erkennen.</p></div>
          <div><span>02 / Verbinden</span><h3>Kontakte relevant gestalten.</h3><p>Kampagnenmanagement, E-Mail-Marketing, Automatisierung und Werkzeuge für Landingpages unterstützen die Kommunikation.</p></div>
          <div><span>03 / Lernen</span><h3>Die Resonanz verstehen.</h3><p>Kampagnenauswertung und Business Intelligence helfen Ihrem Team, Aktivitäten einzuordnen und den nächsten Schritt zu planen.</p></div>
        </div>
      </div>
    </section>

    <ExperienceBenefits id="service-team-title" eyebrow="Warum COVER Services" title="Mehr Kapazität. Weniger Aufwand." intro="Kosteneffiziente und flexible Services, die erfahrene Menschen und Verlagstechnologie zusammenbringen." photo={{ src: "/photos/customer-support-editorial-v3.webp", alt: "Fachkräfte im Kundenservice besprechen ihre Arbeit am Computer" }} benefits={[
      { label: "40+ festangestellte Servicemitarbeitende", title: "Ein Fachteam, das bereitsteht.", text: "Nutzen Sie erfahrene Unterstützung für Ihren Verlag, ohne jede spezialisierte Funktion selbst aufbauen zu müssen." },
      { label: "15 zusätzliche Mitarbeitende bei Bedarf", title: "Kapazität, die sich anpasst.", text: "Erweitern Sie die Unterstützung, wenn sich Ihr Arbeitsaufkommen verändert. Der Personalpool von COVER schafft Flexibilität, wenn Ihr internes Team sie braucht." },
      { label: "Ihrem Verlag zugeordnet", title: "Menschen, die Ihr Geschäft kennen.", text: "Langfristige Zusammenarbeit schafft Wissen über Ihre Produkte, Kunden und täglichen Abläufe." },
      { label: "Menschen + Technologie", title: "Weniger Routinearbeit.", text: "Serviceteams arbeiten mit Produktmanagement und Entwicklung zusammen. Automatisierung und Prozesswissen unterstützen gemeinsam die tägliche Arbeit." },
    ]} />

    <section id="technology" className={styles.foundation} aria-labelledby="technology-title"><div className="shell">
      <header className={styles.heading}><div><p className="eyebrow">Die Technologie hinter dem Service</p><h2 id="technology-title">Erfahrene Menschen.<br />Verbundene Software.</h2></div><p>ERP, CRM und E-Commerce sind die Softwareprodukte von COVER. Sie unterstützen die Aufgaben Ihres Serviceteams – und die Prozesse, die Sie selbst übernehmen.</p></header>
      <div className={styles.navigator}>
        <Link href="/plattform#erp" className={styles.foundationCard}><div><h3>ERP</h3><ArrowIcon direction="up-right" /></div><p>Produkte, Bestellungen, Abonnements und Finanzprozesse.</p></Link>
        <Link href="/plattform#crm" className={styles.foundationCard}><div><h3>CRM</h3><ArrowIcon direction="up-right" /></div><p>Kundendaten, Kontakthistorie und Kampagnenwerkzeuge.</p></Link>
        <Link href="/plattform#commerce" className={styles.foundationCard}><div><h3>E-Commerce</h3><ArrowIcon direction="up-right" /></div><p>Onlineshops, digitale Auslieferung und Kundenportale.</p></Link>
      </div>
      <div className={styles.crossLink}><p>Beginnen Sie mit einem Prozess oder verbinden Sie mehrere Bereiche. Sprechen Sie mit COVER über Ihr Arbeitsaufkommen, Ihre bestehenden Systeme und die Unterstützung, die Ihr Team braucht.</p><Link href="/kontakt" className="text-link">Den passenden Einstieg finden <ArrowIcon direction="up-right" /></Link></div>
    </div></section>
    <Testimonials /><CustomerLogos /><StrategyCTA />
  </main>;
}
