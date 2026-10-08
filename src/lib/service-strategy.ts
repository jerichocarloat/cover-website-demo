// Business functions, not software products. See research/run-serve-grow-evidence.md.
export const servicePillars = [
  { id: "run", word: "BETREIBEN", title: "Verlagsprozesse", headline: "Halten Sie Ihr Geschäft in Bewegung.", text: "Unterstützung für die kaufmännische Arbeit hinter dem Verlagsgeschäft. Von Aufträgen bis zur Buchhaltung kann COVER ausgewählte Aufgaben übernehmen, die Ihr Team beschäftigen.", capabilities: ["Auftragsbearbeitung", "Unterstützung in der Buchhaltung", "Anzeigenverwaltung", "Tantiemenabrechnung", "Lettershop und Logistik"] },
  { id: "serve", word: "BETREUEN", title: "Kunden- und Aboservice", headline: "Sorgen Sie für gut betreute Kunden.", text: "Erfahrene Teams für Kundenanfragen, Bestellungen und Abonnements. Praktische Unterstützung von Menschen, die das Verlagsgeschäft verstehen.", capabilities: ["Kundenanfragen", "Unterstützung bei Bestellungen", "Aboservice", "Kundenkommunikation", "Kundenrückgewinnung"] },
  { id: "grow", word: "WACHSEN", title: "Marketing und Kundenentwicklung", headline: "Lassen Sie Kundenbeziehungen wachsen.", text: "Verbinden Sie Kundenwissen mit relevanter Kommunikation. Marketingunterstützung, Automatisierungswerkzeuge und Maßnahmen zur Kundenbindung schaffen eine Grundlage für die Kundenentwicklung.", capabilities: ["Marketingunterstützung", "Kampagnenwerkzeuge", "E-Mail-Automatisierung", "Kundensegmentierung", "Kundenbindung und Reaktivierung"] },
] as const;

export const technologyProducts = [
  { name: "ERP", role: "Das Rückgrat der Verlagsprozesse.", text: "Verlagsspezifische Produkte, Aufträge, Abonnements und Finanzabläufe." },
  { name: "CRM", role: "Die Grundlage für Ihr Kundenwissen.", text: "Kontakthistorien, Kundengruppen, Kampagnenmanagement und Kommunikation." },
  { name: "E-Commerce", role: "Die Ebene für Ihre Transaktionen.", text: "Vernetzte Shops, Abonnementverkauf, Landingpages und Kundenportale." },
] as const;
