"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [ready, setReady] = useState(false);
  const successRef = useRef<HTMLElement>(null);

  useEffect(() => { setReady(true); }, []);

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <section ref={successRef} className="form-success" aria-live="polite" tabIndex={-1}>
        <p className="eyebrow">Anfrage vorbereitet</p>
        <h2>Gehen wir den nächsten Schritt.</h2>
        <p>Ihre Prioritäten bilden die Grundlage für ein gezieltes Gespräch über Software, Services und Verlagsprozesse.</p>
        <p>In dieser Demo wird keine Nachricht versendet.</p>
        <button className="button button-secondary" onClick={() => setSent(false)}>
          Zurück zum Formular
        </button>
      </section>
    );
  }

  return (
    <form className="contact-form" method="post" onSubmit={submit}>
      <div className="field span-2">
        <label htmlFor="reason">Worüber möchten Sie sprechen?</label>
        <select id="reason" name="reason" required defaultValue="">
          <option value="" disabled>Bitte auswählen</option>
          <option>Verlagssoftware und E-Commerce</option>
          <option>Kunden- und Aboservice</option>
          <option>Buchhaltung und Verwaltung</option>
          <option>Verlagsprozesse</option>
          <option>Marketing und Kundenentwicklung</option>
          <option>Migration oder Hosting</option>
          <option>Eine bestehende COVER Installation</option>
          <option>Eine andere Frage</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="company">Unternehmen</label>
        <input id="company" name="company" autoComplete="organization" required />
      </div>
      <div className="field">
        <label htmlFor="email">Geschäftliche E-Mail-Adresse</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="phone">Telefon <span>optional</span></label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="field span-2">
        <label htmlFor="message">Was möchten Sie verbessern?</label>
        <textarea id="message" name="message" rows={6} required />
      </div>
      <label className="check span-2">
        <input type="checkbox" required />
        <span>Ich habe die <a href="https://covernet.de/datenschutz">Datenschutzhinweise</a> gelesen.</span>
      </label>
      <div className="form-action span-2">
        <button className="button" type="submit" disabled={!ready}>Anfrage vorbereiten</button>
        <p>Beginnen Sie mit Ihren Prioritäten und den Systemen, die Ihr Team bereits nutzt.</p>
      </div>
    </form>
  );
}
