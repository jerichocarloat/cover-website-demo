# COVER Website Demo

Deutschsprachiges Präsentationskonzept für COVER: Verlagssoftware und spezialisierte Services. Die ERP-Module haben eigene Detailseiten innerhalb des Konzepts.

## Lokal entwickeln

Node.js 22 oder neuer verwenden.

```sh
npm ci
npm run dev -- --port 3001
```

## Demo für GitHub Pages bauen

```sh
COVER_STATIC_EXPORT=1 \
NEXT_PUBLIC_BASE_PATH=/cover-website-demo \
NEXT_PUBLIC_SITE_URL=https://jerichocarloat.github.io/cover-website-demo \
npm run build
node qa/check-german-demo.mjs
node qa/serve-demo.mjs
```

Die Vorschau läuft unter `http://localhost:3002/cover-website-demo/`.

Der Workflow `.github/workflows/deploy-pages.yml` baut und veröffentlicht den Stand des Branches `main`. In den Repository-Einstellungen muss GitHub Pages mit GitHub Actions als Quelle aktiviert sein.

## Hinweise zum Konzept

- Das Konzept ersetzt nicht die offizielle Website von COVER und ist für Suchmaschinen auf `noindex` gesetzt.
- Das Kontaktformular demonstriert den Ablauf, versendet aber keine Nachricht. Es ist kein produktiver Anfragekanal.
- Offizielle Rechtsinformationen, Kundenbereich und Nachrichtenquellen bleiben mit covernet.de verlinkt.
- Marken und Kundenlogos bleiben Eigentum ihrer jeweiligen Rechteinhaber. Die Schrift Manrope wird unter der beigefügten SIL Open Font License verwendet.
- Interne Recherche, Strategieunterlagen, kommerzielle Angebote und Umgebungsdateien sind nicht Bestandteil dieses öffentlichen Repositorys.
