import type { Metadata } from "next";
import NewsCards from "@/components/NewsCards";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Aktuelles", description: "Einblicke von COVER in Verlagssoftware, Hosting, Abo-Zahlungsabwicklung und Kundenbindung.", alternates: { canonical: "/news" } };
export default function NewsPage() { return <main id="main" lang="de"><PageHero eyebrow="Aktuelles" title="Einblicke für den Verlagsalltag." intro="Gedanken und praktische Themen rund um Software, Kunden und Abläufe. Ausgewählte Beiträge von COVER." /><section className="section shell"><NewsCards /><p className="news-archive"><a className="text-link" href="https://covernet.de/aktuelles">Alle Beiträge auf covernet.de ↗</a></p></section></main>; }
