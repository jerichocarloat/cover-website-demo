import Image from "@/components/SiteImage";
import Link from "next/link";
import { ArrowIcon } from "./CoverIcon";
import Reveal from "./Reveal";
import styles from "./HomeHero.module.css";

export default function HomeHero() {
  return <section className={styles.hero} aria-labelledby="hero-title">
    <div className="shell">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Verlagstechnologie. Fachkundige Unterstützung.</p>
        <h1 id="hero-title">Software und Services.<br /><span>Für Verlage entwickelt.</span></h1>
        <p className={styles.intro}>ERP, CRM und E-Commerce für Ihr Verlagsgeschäft. Erfahrene Teams für Abonnements, Kundenservice, Buchhaltung und Marketing.</p>
        <div className={styles.actions}>
          <Link className="button" href="/plattform">Software entdecken <ArrowIcon direction="up-right" /></Link>
          <Link className="text-link" href="/services">Services kennenlernen <ArrowIcon direction="up-right" /></Link>
        </div>
        <p className={styles.proof}>An der Seite von Verlagen. Seit 1997.</p>
      </div>
      <figure className={styles.visual}>
        <Reveal className={styles.photo} image>
          <Image src="/photos/publishing-team-editorial-v3.webp" alt="Verlagsfachleute besprechen ihre Arbeit am Laptop; auf dem Tisch liegen Bücher und Zeitschriften" fill sizes="(max-width: 720px) calc(100vw - 40px), (max-width: 980px) calc(100vw - 48px), (max-width: 1344px) calc(100vw - 96px), 1248px" preload />
        </Reveal>
      </figure>
    </div>
  </section>;
}
