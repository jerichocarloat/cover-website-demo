import Image from "@/components/SiteImage";
import Link from "next/link";
import { ArrowIcon } from "./CoverIcon";
import Reveal from "./Reveal";
import RevealGroup from "./RevealGroup";

const products = [
  { name: "ERP", label: "Das Verlagsgeschäft steuern", image: "/photos/cover-erp-v6.jpg", alt: "Rechnungen, ein Taschenrechner und kaufmännische Unterlagen", text: "Verwalten Sie Produkte, Abonnements, Aufträge und Finanzen – vom ersten Angebot bis zur Rechnung.", href: "/plattform#erp", detail: "Verlagsprozesse" },
  { name: "CRM", label: "Ihre Kunden verstehen", image: "/photos/cover-service-2-v6.jpg", alt: "Diagramme und eine Lupe veranschaulichen die Analyse von Kundendaten", text: "Führen Sie Kundendaten, Kontakthistorien und Kampagnenaktivitäten zusammen. Nutzen Sie Ihr Wissen für eine relevantere Kundenansprache.", href: "/plattform#crm", detail: "Kunden und Kampagnen" },
  { name: "E-Commerce", label: "Print und Digitales verkaufen", image: "/photos/cover-commerce-v6.jpg", alt: "Ein Onlineshop und eine Karte für einen Onlinekauf", text: "Verkaufen Sie Bücher, Abonnements und digitale Produkte. Bieten Sie Ihren Lesern ein Kundenportal. Hosting und Updates übernimmt COVER.", href: "/plattform#commerce", detail: "Shops und Kundenportale" },
] as const;

export default function SoftwareOverview() {
  return <section id="software" className="section software-overview" aria-labelledby="software-title"><div className="shell">
    <Reveal className="premium-section-heading" group><div><p className="eyebrow">COVER Software</p><h2 id="software-title">Die Systeme hinter<br />Ihrem Verlagsgeschäft.</h2></div><p>Drei Produkte, entwickelt für die Arbeitsweise von Verlagen. Nutzen Sie die Systeme, die Sie brauchen – miteinander verbunden.</p></Reveal>
    <RevealGroup className="software-product-grid">{products.map(product => <Link href={product.href} key={product.name} className="software-product">
      <Reveal className="software-product-photo" image><Image src={product.image} alt={product.alt} fill sizes="(max-width: 720px) 90vw, 30vw" /></Reveal>
      <div className="software-product-title"><h3>{product.name}</h3><ArrowIcon direction="up-right" /></div><span className="software-product-label">{product.label}</span><p>{product.text}</p><span className="software-product-detail">{product.detail}</span>
    </Link>)}</RevealGroup>
    <Link href="/plattform" className="text-link software-all">Software entdecken <ArrowIcon direction="up-right" /></Link>
  </div></section>;
}
