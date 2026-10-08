import Image from "@/components/SiteImage";
import Link from "next/link";
import { ArrowIcon } from "./CoverIcon";
import Reveal from "./Reveal";
import styles from "./ExperienceBenefits.module.css";

type Benefit = { label: string; title: string; text: string };
type Props = {
  id: string;
  sectionId?: string;
  eyebrow: string;
  title: string;
  intro: string;
  benefits: [Benefit, Benefit, Benefit, Benefit];
  photo?: { src: string; alt: string };
  cta?: { href: string; label: string };
};

export default function ExperienceBenefits({ id, sectionId, eyebrow, title, intro, benefits, photo, cta }: Props) {
  const portrait = photo ?? {
    src: "/photos/publishing-team-editorial-v3.webp",
    alt: "Verlagsfachleute besprechen ihre Arbeit gemeinsam am Laptop",
  };

  return <section id={sectionId} className={styles.section} aria-labelledby={id}>
    <div className="shell">
      <Reveal className={styles.heading} group>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
        <p>{intro}</p>
      </Reveal>
      <div className={styles.mosaic}>
        {benefits.map((benefit, index) => <Reveal key={benefit.title} className={`${styles.benefit} ${styles[`benefit${index}`]}`} delay={index}>
          <span className={styles.label}>{benefit.label}</span>
          <div><h3>{benefit.title}</h3><p>{benefit.text}</p></div>
        </Reveal>)}
        <Reveal className={styles.photo} image>
          <Image src={portrait.src} alt={portrait.alt} fill sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 980px) calc((100vw - 48px) / 2), (max-width: 1050px) calc((100vw - 96px) / 2), (max-width: 1344px) calc((100vw - 96px) / 3), 421px" />
        </Reveal>
      </div>
      {cta && <div className={styles.action}>
        <Link className="text-link" href={cta.href}>{cta.label} <ArrowIcon direction="up-right" /></Link>
      </div>}
    </div>
  </section>;
}
