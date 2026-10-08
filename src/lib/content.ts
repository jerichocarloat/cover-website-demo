import type { IconName } from "@/components/CoverIcon";

export const services: Array<{ id: IconName; icon: IconName; title: string; text: string; longText: string; detailHref: string }> = [
  { id: "software", icon: "software", title: "Verlagssoftware", text: "Produkte, Abonnements, Anzeigen und Bestellungen im Blick behalten.", longText: "Planen, verkaufen und abrechnen: COVER bildet wichtige kaufmännische Schritte Ihres Verlags ab. Die Software ist für Bücher, Zeitschriften, Veranstaltungen und digitale Angebote entwickelt.", detailHref: "/plattform" },
  { id: "customers", icon: "customers", title: "Kunden verstehen", text: "Kontakte und Kundendaten zusammenführen und gezielt nutzen.", longText: "Eine gemeinsame Sicht auf Kontakte hilft Service, Vertrieb und Marketing bei ihrer Arbeit. Kundenhistorie, Kontaktverwaltung und passende Kommunikation gehören zusammen.", detailHref: "/plattform" },
  { id: "commerce", icon: "commerce", title: "Online verkaufen", text: "Bücher, Abos und digitale Angebote über Ihren Shop verkaufen.", longText: "Verlagsprodukte im Web anbieten, Bestellungen bearbeiten und Kunden ein Portal zur Verfügung stellen. COVER verbindet den Onlineverkauf mit den kaufmännischen Abläufen dahinter.", detailHref: "/plattform" },
  { id: "subscriptions", icon: "subscriptions", title: "Kunden- und Aboservice", text: "Erfahrene Teams unterstützen bei Kundenanfragen, Bestellungen und Abos.", longText: "Lassen Sie ausgewählte Aufgaben von Teams übernehmen, die den Verlagsalltag kennen. Von der Bestellung bis zur Aboänderung erhalten Ihre Kunden Unterstützung.", detailHref: "/operations" },
  { id: "finance", icon: "finance", title: "Finanzen und Abläufe", text: "Unterstützung bei Buchhaltung, Anzeigen und Honorarabrechnungen.", longText: "Holen Sie sich Unterstützung für wiederkehrende kaufmännische Aufgaben. Die Leistungen reichen von Buchhaltung und Anzeigenabwicklung bis zu Honoraren und Versand.", detailHref: "/operations" },
  { id: "marketing", icon: "marketing", title: "Marketing und Kundenbindung", text: "Kundendaten für passende Kommunikation und Rückgewinnung nutzen.", longText: "Verwenden Sie Kauf- und Abosignale für passende E-Mails und vereinbarte Rückgewinnungsmaßnahmen. Software und Service können dabei helfen, Kundenbeziehungen gezielt weiterzuentwickeln.", detailHref: "/kundenentwicklung" }
];

export const testimonials = [
  { quote: "Wir haben mit COVER einen Partner für unsere digitale Transformation im Bereich Musik, Buch und Musikalien, dem wir jederzeit vertrauen.", name: "Dr. Johannes Graulich", role: "Geschäftsführer", publisher: "Carus-Verlag, Leinfelden-Echterdingen", label: "Carus-Verlag" },
  { quote: "Der Erfolg des Landwirtschaftsverlags hängt unter anderem mit der Leistungsfähigkeit von COVER zusammen.", name: "Paul Pankoke", role: "Leiter Vertriebsmanagement", publisher: "Landwirtschaftsverlag, Münster", label: "Landwirtschaftsverlag" },
  { quote: "Wir arbeiten extrem gerne mit COVER aufgrund der hohen Kompetenz der Mitarbeiter und der Innovationsfreude.", name: "Robert Narr", role: "Geschäftsführer", publisher: "Narr Francke Attempto Verlag, Tübingen", label: "Narr Francke Attempto" }
];

export const news = [
  { title: "Abos bezahlen. Einfacher abwickeln.", text: "Wie der COVER Payment Service die Zahlungsabwicklung für Verlage unterstützt.", date: "2026-04-16", displayDate: "16. April 2026", category: "Einblicke", href: "https://covernet.de/cover-payment-service-effizientes-abo-payment-fuer-verlage", image: "/photos/printing-press-v6.webp", alt: "Papier läuft durch eine Druckmaschine" },
  { title: "Hosting für Ihr COVER System.", text: "Software im eigenen Haus betreiben oder den technischen Betrieb abgeben?", date: "2026-03-04", displayDate: "4. März 2026", category: "Einblicke", href: "https://covernet.de/hosting-im-haus-vs-hosting-ueber-cover", image: "/photos/shared-software-workspace-v6.webp", alt: "Menschen arbeiten gemeinsam an Laptops" },
  { title: "Kunden halten beginnt beim Gespräch.", text: "Persönlicher Kontakt und passende E-Mails können bei der Rückgewinnung helfen.", date: "2026-02-11", displayDate: "11. Februar 2026", category: "Einblicke", href: "https://covernet.de/effektive-rueckgewinnung-von-abokuendigern", image: "/photos/print-review-collaboration-v6.webp", alt: "Zwei Personen besprechen eine gedruckte Zeitschrift" }
];
