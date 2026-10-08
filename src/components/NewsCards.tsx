import Image from "@/components/SiteImage";
import { news } from "@/lib/content";
import { ArrowIcon } from "./CoverIcon";

export default function NewsCards() {
  return <div className="news-grid">{news.map(item => <a className="news-card" href={item.href} key={item.href}>
    <div className="news-image"><Image src={item.image} fill sizes="(max-width: 720px) 100vw, (max-width: 980px) 45vw, 30vw" alt={item.alt} /></div>
    <div className="news-card-copy"><div className="news-meta"><span>{item.category}</span><time dateTime={item.date}>{item.displayDate}</time></div><h3>{item.title}</h3><p>{item.text}</p><span className="news-arrow" aria-hidden="true"><ArrowIcon direction="up-right" /></span></div>
  </a>)}</div>;
}
