import Link from "next/link";
import { ArrowIcon } from "./CoverIcon";
import RevealGroup from "./RevealGroup";

export default function StrategyCTA() {
  return <section className="premium-contact" aria-labelledby="closing-title"><RevealGroup className="shell premium-contact-layout"><div><p className="eyebrow">Lassen Sie uns sprechen</p><h2 id="closing-title">Was braucht<br />Ihr Verlagsgeschäft?</h2></div><div><p>Ein besseres System. Mehr Unterstützung. Oder einen klareren Weg, beides zu verbinden. Sagen Sie uns, wo Sie beginnen möchten.</p><Link className="button button-white" href="/kontakt">Mit COVER sprechen <ArrowIcon direction="up-right" /></Link><a href="tel:+4970312126300" className="contact-phone">+49 7031 2126-300</a></div></RevealGroup></section>;
}
