import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/CoverIcon";
import { DetailPhoto } from "@/components/DetailElements";
import Reveal from "@/components/Reveal";
import RevealGroup from "@/components/RevealGroup";
import StrategyCTA from "@/components/StrategyCTA";
import { erpModules, erpModuleHref, findErpModule } from "@/lib/erp-modules";
import styles from "./ModulePage.module.css";

type ModulePageProps = { params: Promise<{ module: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return erpModules.map(module => ({ module: module.slug }));
}

export async function generateMetadata({ params }: ModulePageProps): Promise<Metadata> {
  const { module: slug } = await params;
  const module = findErpModule(slug);
  if (!module) notFound();
  return {
    title: `${module.title} für Verlage`,
    description: module.intro,
    alternates: { canonical: erpModuleHref(module.slug) },
    openGraph: { title: `${module.title} | COVER`, description: module.intro, locale: "de_DE" },
  };
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { module: slug } = await params;
  const module = findErpModule(slug);
  if (!module) notFound();
  const related = module.related.map(findErpModule).filter(item => item !== undefined);

  return <main id="main" lang="de" className={styles.page}>
    <nav className={`shell ${styles.breadcrumb}`} aria-label="Brotkrumennavigation"><ol>
      <li><Link href="/plattform">Software</Link></li>
      <li><Link href="/plattform#erp">ERP</Link></li>
      <li aria-current="page">{module.title}</li>
    </ol></nav>

    <section className={styles.hero} aria-labelledby="module-title"><div className={`shell ${styles.heroGrid}`}>
      <Reveal className={styles.heroCopy} group><p className="eyebrow">COVER ERP / {module.category}</p>
        <h1 id="module-title">{module.title}</h1>
        <p className={styles.headline}>{module.headline}</p>
        <p className={styles.intro}>{module.intro}</p>
        <a className="button" href="#functions">Funktionen entdecken <ArrowIcon direction="down" /></a>
      </Reveal>
      <DetailPhoto src={module.photo.src} alt={module.photo.alt} />
    </div></section>

    <section id="functions" className={styles.functions} aria-labelledby="functions-title"><div className="shell">
      <Reveal className={styles.heading} group><div><p className="eyebrow">Das steckt im Modul</p><h2 id="functions-title">Welche Aufgaben<br />das Modul abdeckt.</h2></div><p>{module.sectionIntro}</p></Reveal>
      <RevealGroup className={styles.featureGrid}>{module.features.map((feature, index) => <div className={styles.feature} key={feature.title}>
        <span>{String(index + 1).padStart(2, "0")}</span><h3>{feature.title}</h3><p>{feature.text}</p>
      </div>)}</RevealGroup>
      <h3 className={styles.flowTitle}>Im Ablauf Ihres Verlags</h3>
      <ol className={styles.flow}>{module.steps.map((step, index) => <li key={step.title}>
        <Reveal group delay={index}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></Reveal>
        {index < module.steps.length - 1 && <ArrowIcon />}
      </li>)}</ol>
    </div></section>

    <section className={styles.context} aria-labelledby="context-title"><Reveal className={`shell ${styles.contextGrid}`} group>
      <div><p className="eyebrow">Teil des Ganzen</p><h2 id="context-title">{module.contextTitle}</h2></div>
      <div><p>{module.context}</p><Link className="text-link" href="/plattform#erp">COVER ERP im Überblick <ArrowIcon direction="up-right" /></Link></div>
    </Reveal></section>

    <section className={styles.related} aria-labelledby="related-title"><div className="shell">
      <Reveal className={styles.heading} group><div><p className="eyebrow">Verbundene Arbeitsbereiche</p><h2 id="related-title">Passende Module<br />im Zusammenhang.</h2></div><p>Entdecken Sie weitere Bereiche Ihres Verlagsgeschäfts.</p></Reveal>
      <RevealGroup className={styles.relatedLinks}>{related.map(item => <Link key={item.slug} href={erpModuleHref(item.slug)}>
        <span><small>{item.category}</small><strong>{item.title}</strong><span className={styles.relatedDescription}>{item.headline}</span></span><ArrowIcon />
      </Link>)}</RevealGroup>
      <Link className={styles.backLink} href="/plattform#erp">Zurück zu allen ERP-Modulen <ArrowIcon direction="up-right" /></Link>
    </div></section>
    <StrategyCTA />
  </main>;
}
