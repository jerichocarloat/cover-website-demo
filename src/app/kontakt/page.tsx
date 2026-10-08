import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Kontakt zu COVER", description: "Sprechen Sie mit COVER über Verlagssoftware, spezialisierte Services und die Unterstützung, die Ihr Unternehmen braucht.", alternates: { canonical: "/kontakt" } };
export default function ContactPage() {
  return <main id="main" lang="de"><PageHero eyebrow="Kontakt" title="Mit COVER sprechen." intro="Erzählen Sie uns von Ihrem Verlag, Ihren Systemen und den Aufgaben, bei denen Sie Unterstützung brauchen. Beginnen Sie mit Software, spezialisierten Services oder beidem zusammen." /><section className="section shell contact-layout"><div><p className="eyebrow">Ihre Anfrage</p><ContactForm /></div><aside className="contact-aside"><h2>Kontaktieren Sie uns direkt.</h2><p>COVER Softwarelösungen GmbH &amp; Co. KG<br />Hanns-Klemm-Str. 1A<br />71034 Böblingen</p><a href="tel:+4970312126300">+49 7031 2126-300</a><a href="mailto:vertrieb@covernet.de">vertrieb@covernet.de</a><hr /><h3>Wo fangen wir an?</h3><p>Bei Ihren Prioritäten, Ihren bestehenden Systemen und der Unterstützung, die Ihr Team braucht.</p></aside></section></main>;
}
