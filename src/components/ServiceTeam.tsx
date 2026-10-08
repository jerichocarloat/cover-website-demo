import ExperienceBenefits from "./ExperienceBenefits";

export default function ServiceTeam() {
  return <ExperienceBenefits
    sectionId="service-team"
    id="team-title"
    eyebrow="Konzentrieren Sie sich auf Ihr Kerngeschäft"
    title="Mehr Kapazität. Weniger Organisationsaufwand."
    intro="Kostengünstige und flexible Dienstleistungen, damit sich Ihr Team auf das Verlagsgeschäft konzentrieren kann. COVER übernimmt spezialisierte Aufgaben und passt die Unterstützung an Ihren Bedarf an."
    benefits={[
      { label: "Über 40 festangestellte Servicekräfte", title: "Fachkräfte, die bereitstehen.", text: "Nutzen Sie erfahrene Unterstützung für Ihren Verlag, ohne jede spezialisierte Funktion im eigenen Unternehmen aufzubauen." },
      { label: "15 zusätzliche Kräfte bei Bedarf", title: "Kapazität, die sich anpasst.", text: "Ergänzen Sie Unterstützung, wenn sich das Arbeitsaufkommen verändert. Der COVER Personalpool bietet Flexibilität, wenn Ihr internes Team sie braucht." },
      { label: "Ihrem Verlag fest zugeordnet", title: "Menschen, die Ihr Geschäft kennen.", text: "Langjährige Zusammenarbeit schafft ein tiefes Verständnis für Ihre Kunden, Produkte und täglichen Verlagsprozesse." },
      { label: "Menschen + Technologie", title: "Weniger Routinearbeit.", text: "Serviceteams, Produktmanager und Entwickler arbeiten eng zusammen. Prozesswissen und Automatisierung unterstützen die tägliche Arbeit." },
    ]}
    photo={{ src: "/photos/customer-support-editorial-v3.webp", alt: "Fachkräfte im Kundenservice arbeiten gemeinsam am Computer; daneben liegen Verlagsprodukte" }}
    cta={{ href: "/kontakt", label: "Über Ihren Unterstützungsbedarf sprechen" }}
  />;
}
