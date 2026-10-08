import Image from "@/components/SiteImage";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer" lang="de">
      <div className="footer-grid shell">
        <div className="footer-brand">
          <Link className="brand-logo" href="/" aria-label="COVER Startseite">
            <Image src="/brand/cover-logo.png" alt="COVER" width={250} height={74} sizes="125px" />
          </Link>
          <p>Verlagssoftware.<br />Spezialisierte Services.<br />Ein erfahrener Partner.</p>
          <small>Cover Softwarelösungen GmbH &amp; Co. KG</small>
        </div>
        <nav aria-label="Software und Services im Footer">
          <h3>Software und Services</h3>
          <Link href="/plattform#erp">ERP</Link>
          <Link href="/plattform#crm">CRM</Link>
          <Link href="/plattform#commerce">E-Commerce</Link>
          <Link href="/services">Spezialisierte Services</Link>
        </nav>
        <nav aria-label="Unternehmen im Footer">
          <h3>Unternehmen</h3>
          <Link href="/unternehmen">Über COVER</Link>
          <Link href="/news">Aktuelles</Link>
          <Link href="/kontakt">Kontakt</Link>
          <a href="https://covernet.de/kundenbereich-login">Kundenbereich</a>
        </nav>
        <address>
          <h3>Kontakt</h3>
          <p>Hanns-Klemm-Straße 1A<br />71034 Böblingen</p>
          <a href="tel:+4970312126300">+49 7031 2126-300</a>
          <a href="mailto:vertrieb@covernet.de">vertrieb@covernet.de</a>
        </address>
      </div>
      <div className="footer-legal shell">
        <p>Software und Services für Verlage.</p>
        <nav aria-label="Rechtliche Informationen">
          <a href="https://covernet.de/impressum">Impressum</a>
          <a href="https://covernet.de/datenschutz">Datenschutz</a>
        </nav>
      </div>
    </footer>
  );
}
