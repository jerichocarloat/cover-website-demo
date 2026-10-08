import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteUrl } from "@/lib/site";
import "./globals.css";
import "./v1.css";
import "./premium.css";

const manrope = localFont({ src: "../fonts/Manrope-Variable.ttf", weight: "200 800", display: "swap", variable: "--font-manrope" });
export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: { default: "COVER | Software und Menschen. Für Ihren Verlag.", template: "%s | COVER" },
  description: "COVER verbindet Verlagssoftware mit erfahrenen Service-Teams. Für Kunden, Abonnements, Onlineverkauf und die tägliche Arbeit dahinter.",
  openGraph: { type: "website", locale: "de_DE", siteName: "COVER", title: "COVER | Software und Menschen. Für Ihren Verlag.", description: "Software und Service für den Verlagsalltag." },
  robots: { index: false, follow: false }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = { "@context": "https://schema.org", "@type": "Organization", name: "Cover Softwarelösungen GmbH & Co. KG", url: "https://covernet.de", address: { "@type": "PostalAddress", streetAddress: "Hanns-Klemm-Str. 1A", postalCode: "71034", addressLocality: "Böblingen", addressCountry: "DE" }, telephone: "+49 7031 2126-300", email: "vertrieb@covernet.de" };
  return <html lang="de" data-scroll-behavior="smooth" className={manrope.variable}><body><Header />{children}<Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /></body></html>;
}
