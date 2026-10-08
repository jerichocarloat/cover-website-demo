import { CoverIcon } from "./CoverIcon";

export default function PublishingBridge({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`publishing-bridge${compact ? " bridge-compact" : ""}`} aria-label="Software und Service verbinden Kunden, Abonnements und tägliche Abläufe">
      <div className="bridge-heading"><span>Software</span><span>Menschen</span></div>
      <div className="bridge-path" aria-hidden="true">
        <div className="bridge-page"><CoverIcon name="customers" /></div>
        <div className="bridge-connection"><span /><span /></div>
        <div className="bridge-page bridge-page-primary"><CoverIcon name="subscriptions" /></div>
        <div className="bridge-connection"><span /><span /></div>
        <div className="bridge-page"><CoverIcon name="finance" /></div>
      </div>
      <div className="bridge-labels"><span>Kunden</span><span>Abonnements</span><span>Abläufe</span></div>
      <p>Eine Verbindung, die im Alltag hilft.</p>
    </div>
  );
}
