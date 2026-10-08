import type { Metadata } from "next";
import Image from "@/components/SiteImage";
import Link from "next/link";
import { erpModuleHref } from "@/lib/erp-modules";
import { ArrowIcon } from "@/components/CoverIcon";
import { DetailPhoto, DisclosureIcon, ProcessBand, TaskList } from "@/components/DetailElements";
import ExperienceBenefits from "@/components/ExperienceBenefits";
import CustomerLogos from "@/components/CustomerLogos";
import StrategyCTA from "@/components/StrategyCTA";
import Reveal from "@/components/Reveal";
import { coverImageSizes } from "@/lib/image-sizes";
import styles from "../DetailExperience.module.css";

export const metadata: Metadata = {
  title: "ERP, CRM und E-Commerce für Verlage",
  description: "Verlagssoftware für Produkte, Abonnements, Bestellungen, Kunden und Onlinevertrieb. Entdecken Sie COVER ERP, CRM, E-Commerce und ihre verbundenen Abläufe.",
  alternates: { canonical: "/plattform" },
};

const products = [
  { name: "ERP", meaning: "Produkte, Bestellungen und Finanzen", text: "Ihre Verlagsprodukte planen, verkaufen und abrechnen.", href: "erp" },
  { name: "CRM", meaning: "Kunden und Kommunikation", text: "Kunden verstehen und relevante Kontakte gestalten.", href: "crm" },
  { name: "E-Commerce", meaning: "Shops und Kundenportale", text: "Bücher, Abonnements und digitale Produkte online verkaufen.", href: "commerce" },
];

type Module = { title: string; text: string; href?: string };
const erpGroups: Array<{ title: string; summary: string; modules: Module[] }> = [
  { title: "Kunden und Produkte", summary: "Kontaktdaten, Verlagsprodukte und Wechselversand.", modules: [
    { title: "Kontaktmanagement", text: "Kunden- und Geschäftspartnerdaten, die in den kaufmännischen Abläufen gemeinsam genutzt werden.", href: "kontaktmanagement" },
    { title: "Produktmanagement", text: "Ihre Verlagsprodukte und die zugehörigen Daten verwalten.", href: "produktmanagement" },
    { title: "Wechselversand", text: "Kostenfreie Exemplare gezielt an qualifizierte Empfängergruppen versenden.", href: "wechselversand" },
  ] },
  { title: "Vertrieb und Publikationsformen", summary: "Abonnements, Bücher, Anzeigen und Veranstaltungen.", modules: [
    { title: "Abonnements und Zeitschriften", text: "Abonnements verwalten, versenden und abrechnen.", href: "abonnement" },
    { title: "Bücher und Warenwirtschaft", text: "Titel, Bestellungen, Bestände und Retouren.", href: "buch" },
    { title: "Anzeigen", text: "Kaufmännische Anzeigenprozesse planen und verwalten.", href: "anzeigen" },
    { title: "Veranstaltungen", text: "Veranstaltungen und die zugehörigen kaufmännischen Prozesse verwalten.", href: "veranstaltungen" },
  ] },
  { title: "Finanzen und Vergütung", summary: "Forderungen, Buchhaltung, Honorare und Provisionen.", modules: [
    { title: "Debitorenmanagement", text: "Kundensalden, Forderungen und Prozesse rund um Zahlungen.", href: "debitorenmanagement" },
    { title: "Finanzbuchhaltung", text: "Integrierte Finanzbuchhaltung mit gypsilon Software.", href: "finanzbuchhaltung" },
    { title: "Honorare, Tantiemen und Provisionen", text: "Honorare, Tantiemen und Vertriebsprovisionen verwalten.", href: "honorare-und-provisionen" },
    { title: "Kostenrechnung", text: "Die Kosten Ihres Verlags analysieren.", href: "kostenrechnung" },
  ] },
  { title: "Rechte und Redaktion", summary: "Lizenzen und die Verwaltung hinter der redaktionellen Arbeit.", modules: [
    { title: "Rechte und Lizenzen", text: "Verlagsrechte und Lizenzdaten verwalten.", href: "rechte-und-lizenzen" },
    { title: "Redaktionsverwaltung", text: "Die Verwaltung rund um Mitwirkende und redaktionelle Aufgaben organisieren.", href: "redaktionsverwaltung" },
  ] },
];

function ModuleGroup({ group }: { group: typeof erpGroups[number] }) {
  return <details className={styles.disclosure}>
    <summary><span><strong>{group.title}</strong><small>{group.summary}</small></span><DisclosureIcon /></summary>
    <ul className={styles.moduleList}>{group.modules.map(module => <li key={module.title}>{module.href ? <Link href={erpModuleHref(module.href)}><strong>{module.title}</strong><ArrowIcon direction="right" /></Link> : <strong>{module.title}</strong>}<p>{module.text}</p></li>)}</ul>
  </details>;
}

export default function PlatformPage() {
  return <main id="main" lang="de" className={styles.page}>
    <section className={styles.hero} aria-labelledby="software-hero-title">
      <div className={`shell ${styles.heroGrid}`}>
        <div className={styles.heroCopy}><p className="eyebrow">COVER Software für Verlage</p><h1 id="software-hero-title">Verlage arbeiten anders.<br /><span>Ihre Software sollte es auch.</span></h1><p>Verwalten Sie Produkte, Abonnements, Kunden und Onlineverkäufe mit Software, die für Verlage entwickelt wurde. ERP, CRM und E-Commerce verbinden die Arbeit hinter Ihrem Geschäft.</p><a href="#products" className="button">Den passenden Einstieg finden <ArrowIcon direction="down" /></a></div>
        <div className={styles.heroVisual}><div className={styles.heroPhoto}><Image src="/photos/shared-software-workspace-v6.webp" alt="Ein Softwareentwicklungsteam arbeitet gemeinsam an Laptops" fill sizes={coverImageSizes({ width: 3200, height: 2134, mobileHeight: 464, desktopHeight: 512, breakpoint: 980 })} preload /></div></div>
      </div>
    </section>

    <section id="products" className={styles.overview} aria-labelledby="products-title"><div className="shell">
      <header className={styles.heading}><div><p className="eyebrow">Drei Produkte. Ein vernetztes Verlagsgeschäft.</p><h2 id="products-title">Die passende Software<br />für Ihre Aufgaben.</h2></div><p>ERP steuert die kaufmännischen Prozesse. CRM führt Kundenwissen zusammen. E-Commerce verbindet Ihre Produkte mit den Menschen, die sie kaufen.</p></header>
      <nav className={styles.navigator} aria-label="COVER Softwareprodukte entdecken">{products.map((product, index) => <a className={styles.navItem} key={product.href} href={`#${product.href}`}><div className={styles.navTop}><span>{String(index + 1).padStart(2, "0")}</span><ArrowIcon direction="down" /></div><h3>{product.name}</h3><p className={styles.navRole}>{product.meaning}</p><p>{product.text}</p></a>)}</nav>
    </div></section>

    <section id="erp" className={styles.chapter} aria-labelledby="erp-title"><div className="shell">
      <div className={styles.chapterGrid}>
        <Reveal className={styles.copy} group><p className="eyebrow">01 / ERP — Unternehmensressourcen planen</p><h2 id="erp-title">Von der Planung<br />bis zur Rechnung.</h2><p className={styles.lead}>Ein klarer Prozess für die Produkte, die Sie veröffentlichen.</p><p>COVER ERP verbindet Planung, Angebote, Bestellungen und Rechnungsstellung. Es unterstützt Zeitschriften, Bücher, Anzeigen, Veranstaltungen, Artikel und Fortsetzungen – ebenso wie E-Paper, E-Books und digitale Zugänge.</p><TaskList items={["Produkte und Abonnements verwalten", "Bestellungen und Anzeigenbuchungen bearbeiten", "Rechnungsstellung, Finanzen und Auswertungen verbinden"]} /><Link href="/kontakt" className="text-link">Ihren ERP-Bedarf besprechen <ArrowIcon direction="up-right" /></Link></Reveal>
        <DetailPhoto src="/photos/cover-erp-v6.jpg" alt="Eine Person prüft Rechnungen und Finanzunterlagen" />
      </div>
      <ProcessBand label="Kaufmännischer ERP-Prozess" steps={[{ title: "Planen", text: "Produkte und kaufmännische Aufgaben anlegen." }, { title: "Anbieten", text: "Das Angebot vorbereiten." }, { title: "Bearbeiten", text: "Die Bestellung abwickeln." }, { title: "Abrechnen", text: "Den Verkauf mit den Finanzen verbinden." }]} />
      <div className={styles.detailsHeading}><h3>Die ERP-Module entdecken</h3><p>Wählen Sie ein Thema und sehen Sie, welche Abläufe es abdeckt.</p></div>
      <div className={styles.disclosures}>{[0, 1].map(column => <div className={styles.disclosureStack} key={column}>{erpGroups.filter((_, index) => index % 2 === column).map(group => <ModuleGroup key={group.title} group={group} />)}</div>)}</div>
      <div className={styles.note}><h3>Aus Daten wird Überblick.</h3><p>Filterbasierte Statistiken und Berichte unterstützen Entscheidungen im Alltag. Die integrierte Business Intelligence ergänzt Planung, Analyse und Berichtswesen für Ihren gesamten Verlag.</p></div>
    </div></section>

    <section id="crm" className={`${styles.chapter} ${styles.tinted}`} aria-labelledby="crm-title"><div className="shell">
      <div className={`${styles.chapterGrid} ${styles.reverse}`}>
        <Reveal className={styles.copy} group><p className="eyebrow">02 / CRM — Kundenbeziehungen verwalten</p><h2 id="crm-title">Kunden kennen.<br />Kontakte relevant gestalten.</h2><p className={styles.lead}>Kundendaten, Historie und Kommunikation im Zusammenhang.</p><p>COVER CRM hilft Ihnen, direkte Kundenbeziehungen zu verwalten – von der Erfassung des Kundenverhaltens und der Verbesserung von Kontaktdaten bis zur Auswahl von Zielgruppen und der Organisation von Kampagnen.</p><TaskList items={["Ein klareres Bild jedes Kunden gewinnen", "Relevante Zielgruppen für die Kommunikation auswählen", "Kampagnen steuern und die Resonanz auswerten"]} /><Link href="/kontakt" className="text-link">Ihren CRM-Bedarf besprechen <ArrowIcon direction="up-right" /></Link></Reveal>
        <DetailPhoto src="/photos/technology-workspace-v6.jpg" alt="Eine Fachkraft arbeitet mit Software an einem Desktopcomputer" />
      </div>
      <div className={styles.featureGrid}>
        <div className={styles.feature}><span>01 / Verstehen</span><h3>Kontakte mit Kontext.</h3><p>Führen Sie die Kundenhistorie zusammen. Prüfen und ergänzen Sie Kontaktdaten, um ein aussagekräftigeres Kundenbild zu erhalten.</p></div>
        <div className={styles.feature}><span>02 / Kommunizieren</span><h3>Werkzeuge für relevante Kontakte.</h3><p>Kampagnenmanagement, E-Mail-Marketing, Online-Marketing-Automatisierung und Telefonmarketing unterstützen die Kundenansprache.</p></div>
        <div className={styles.feature}><span>03 / Daten nutzbar halten</span><h3>Eine bessere Datengrundlage.</h3><p>Importieren und exportieren Sie Kontaktdaten. Prüfen Sie Dubletten und Postanschriften, um die Datenqualität zu verbessern.</p></div>
      </div>
    </div></section>

    <section id="commerce" className={styles.chapter} aria-labelledby="commerce-title"><div className="shell">
      <div className={styles.chapterGrid}>
        <Reveal className={styles.copy} group><p className="eyebrow">03 / E-Commerce</p><h2 id="commerce-title">Kaufen und abonnieren.<br />Einfacher gemacht.</h2><p className={styles.lead}>Ein Onlineshop, der Verlage versteht.</p><p>Verkaufen Sie Bücher, Abonnements und digitale Produkte über eine verlagsspezifische Plattform. Geben Sie Ihren Kunden einen Ort zum Kaufen, zum Abrufen digitaler Dokumente und zur Verwaltung ihrer Kundenbeziehung.</p><TaskList items={["Gedruckte und digitale Produkte online verkaufen", "Shops, Landingpages und Kundenportale erstellen", "Hosting, Updates und Betrieb COVER überlassen"]} /><Link href="/kontakt" className="text-link">Ihren Onlinevertrieb besprechen <ArrowIcon direction="up-right" /></Link></Reveal>
        <DetailPhoto src="/photos/cover-commerce-v6.jpg" alt="Eine Person kauft online mit einem Laptop und einer Zahlungskarte ein" />
      </div>
      <div className={styles.featureGrid}>
        {[
          ["Aboshops", "Abonnements mit verlagsspezifischen Shopfunktionen anbieten."],
          ["Buchshops", "Buchkatalog und Onlinebestellung zusammenbringen."],
          ["Digitale Dokumente", "Digitale Verlagsprodukte an Kunden ausliefern."],
          ["Kundenportale", "Ein Onlinebereich für Ihre Kunden und Abonnenten."],
          ["Landingpages", "Gezielte Seiten für Produkte, Angebote und Kampagnen erstellen."],
          ["CMS-Seiten", "Inhalte rund um Ihre Shops und Websites verwalten."],
        ].map(([title, text]) => <div className={styles.feature} key={title}><h3>{title}</h3><p>{text}</p></div>)}
      </div>
      <div className={styles.detailsHeading}><h3>Die Plattform hinter dem Shop</h3><p>Für Verlage entwickelt. Von COVER betrieben.</p></div>
      <div className={styles.disclosures}>
        <details className={styles.disclosure}><summary><span><strong>Mehrere Shops und Websites verwalten</strong><small>Eine verlagsspezifische Plattform auf Magento-Basis.</small></span><DisclosureIcon /></summary><ul className={styles.moduleList}><li><p>Ein Mandantenbereich auf einer zentral betriebenen Instanz ermöglicht Ihnen, mehrere Shops und Websites zu verwalten und zu konfigurieren. Verlagsspezifische Funktionen bauen auf dem Magento-Framework auf.</p></li></ul></details>
        <details className={styles.disclosure}><summary><span><strong>Verbundene Systeme. Betreuter Betrieb.</strong><small>Hosting, Updates, Support und ERP-Anbindungen.</small></span><DisclosureIcon /></summary><ul className={styles.moduleList}><li><p>COVER übernimmt Betrieb, Hosting, Updates und Support. Die Plattform ist in andere COVER Systeme integriert und kann über Middleware an andere ERP-Systeme angebunden werden.</p></li></ul></details>
      </div>
    </div></section>

    <section id="integrations" className={`${styles.chapter} ${styles.tinted}`} aria-labelledby="integrations-title"><div className="shell">
      <header className={styles.heading}><div><p className="eyebrow">Mit dem gesamten Ablauf verbunden</p><h2 id="integrations-title">Verlagsarbeit findet nicht<br />in einem einzigen System statt.</h2></div><p>Auslieferungspartner, Buchhaltungssysteme und Onlineshops gehören zum selben Geschäft. COVER bietet Schnittstellen und Datenwerkzeuge, um diese Abläufe zu verbinden.</p></header>
      <div className={styles.integrationGrid}>
        <div className={styles.integration}><h3>Auslieferungs- und Abopartner</h3><p>Schnittstellen verbinden Verlagsprozesse mit Auslieferungsdiensten und Abonnementvertriebspartnern (WBZ).</p><div className={styles.tags}><span>Prolit</span><span>KNV</span><span>Herold</span><span>VVA</span><span>WBZ</span></div></div>
        <div className={styles.integration}><h3>Finanzen und Onlineshops</h3><p>Verbinden Sie die Software entlang Ihrer kaufmännischen Abläufe – von der Buchhaltung bis zum E-Commerce.</p><div className={styles.tags}><span>DATEV</span><span>Syska</span><span>Sage</span><span>Magento</span><span>Shopware</span><span>OXID</span></div></div>
        <div className={styles.integration}><h3>Produktdaten und Auswertungen</h3><p>ONIX-Import und -Export unterstützen den Austausch von Verlagsproduktdaten. Statistiken und Business Intelligence ermöglichen Analysen und Berichte.</p></div>
        <div className={styles.integration}><h3>Technischer Betrieb</h3><p>COVER bietet Hosting und Unterstützung beim technischen Betrieb. Für die E-Commerce-Plattform übernimmt COVER Hosting, Updates, Betrieb und Support.</p></div>
      </div>
      <Link href="/kontakt" className="text-link">Ihre Systeme und Anbindungen besprechen <ArrowIcon direction="up-right" /></Link>
    </div></section>

    <ExperienceBenefits id="software-benefits-title" eyebrow="Warum COVER Software" title="Verlagskompetenz. Im System verankert." intro="Der Mehrwert liegt nicht allein in der Technologie. Entscheidend ist, wie gut die Software zu Ihrem Verlag passt." photo={{ src: "/photos/print-review-collaboration-v6.webp", alt: "Kolleginnen und Kollegen im Verlag besprechen gemeinsam eine Publikation" }} benefits={[
      { label: "Verlagsspezifisch", title: "Ihre Geschäftsmodelle, verstanden.", text: "Abonnements, Bücher, Anzeigen, Veranstaltungen und digitale Zugänge gehören in ein gemeinsames kaufmännisches Gesamtbild." },
      { label: "Verbundene Produkte", title: "Weniger Aufwand zwischen Systemen.", text: "ERP, CRM und E-Commerce verbinden Kunden-, Produkt- und Transaktionsdaten in den COVER Abläufen." },
      { label: "Nah am Arbeitsalltag", title: "Software, geprägt von Erfahrung.", text: "Serviceteams, Produktmanagement und Entwicklung arbeiten zusammen. Das Wissen über Verlagsprozesse bleibt eng mit der Entwicklung verbunden." },
      { label: "Software + Services", title: "Menschen, wenn Sie sie brauchen.", text: "Ergänzen Sie spezialisierte Unterstützung für Kundenservice, Buchhaltung, Verlagsprozesse und Kundenmarketing." },
    ]} />
    <section className={styles.foundation} aria-labelledby="software-services-title"><div className="shell">
      <header className={styles.heading}><div><p className="eyebrow">Mehr als die Werkzeuge</p><h2 id="software-services-title">Brauchen Sie auch Menschen,<br />die die Arbeit übernehmen?</h2></div><p>Ihr Team kann die COVER Software selbst nutzen. Wenn Sie zusätzliche Unterstützung brauchen, übernehmen die spezialisierten Serviceteams von COVER ausgewählte Verlagsprozesse.</p></header>
      <Link href="/services" className="button">COVER Services entdecken <ArrowIcon direction="up-right" /></Link>
    </div></section>
    <CustomerLogos /><StrategyCTA />
  </main>;
}
