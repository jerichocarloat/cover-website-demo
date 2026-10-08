import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  intro,
  note,
  children
}: {
  eyebrow: string;
  title: string;
  intro: string;
  note?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero paper-grid">
      <div className="shell page-hero-grid">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="hero-intro">{intro}</p>
          {children}
        </div>
        {note && (
          <aside className="margin-note">
            <span>Randnotiz</span>
            <p>{note}</p>
          </aside>
        )}
      </div>
    </section>
  );
}

export function SectionHeader({
  number,
  eyebrow,
  title,
  text
}: {
  number?: string;
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <header className="section-header">
      {(number || eyebrow) && (
        <div className="section-kicker">
          {number && <span>{number}</span>}
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        </div>
      )}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </header>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className="text-link" href={href}>
      {children} <span aria-hidden="true">↗</span>
    </Link>
  );
}

export function ProofBar(_props: { english?: boolean } = {}) {
  return (
    <section className="proof-bar" aria-label="COVER in Zahlen">
      <div className="shell proof-grid">
        <div><strong>1997</strong><span>gegründet</span></div>
        <div><strong>70</strong><span>Mitarbeitende</span></div>
        <div><strong>150</strong><span>Verlagskunden</span></div>
        <div><strong>2.600+</strong><span>COVER Nutzer</span></div>
      </div>
    </section>
  );
}

export function StepList({ items }: { items: Array<{ title: string; text: string }> }) {
  return (
    <ol className="step-list">
      {items.map((item, index) => (
        <li key={item.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div><h3>{item.title}</h3><p>{item.text}</p></div>
        </li>
      ))}
    </ol>
  );
}

export function CTAGroup({ secondary = true }: { secondary?: boolean }) {
  return (
    <div className="cta-group">
      <Link className="button" href="/kontakt">Erstgespräch vereinbaren</Link>
      {secondary && <a className="text-link" href="#modell">Das COVER Modell ansehen <span aria-hidden="true">↓</span></a>}
    </div>
  );
}
