// Read-only release checks for the exported German presentation website.
// Run after `npm run build` with the same public URL/base-path variables.
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const exportRoot = path.resolve(process.env.EXPORT_DIR || "out");
const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://jerichocarloat.github.io/cover-website-demo");
const trimPath = value => value === "/" ? "/" : value.replace(/\/+$/, "") || "/";
const basePath = trimPath(process.env.NEXT_PUBLIC_BASE_PATH ?? siteUrl.pathname).replace(/^\/$/, "");
assert.equal(trimPath(siteUrl.pathname).replace(/^\/$/, ""), basePath, "Public site URL and base path must describe the same demo");
const mainRoutes = ["/", "/services", "/news", "/unternehmen", "/kontakt", "/plattform", "/operations", "/kundenentwicklung", "/loesungen"];
const moduleSlugs = [
  "kontaktmanagement", "produktmanagement", "wechselversand", "abonnement", "buch", "anzeigen", "veranstaltungen",
  "debitorenmanagement", "finanzbuchhaltung", "honorare-und-provisionen", "kostenrechnung", "rechte-und-lizenzen", "redaktionsverwaltung",
];
const routes = [...mainRoutes, ...moduleSlugs.map(slug => `/plattform/${slug}`)];

function decodeEntities(value) {
  return value.replace(/&#(x[\da-f]+|\d+);|&(amp|quot|apos|lt|gt|nbsp);/gi, (match, code, name) => {
    if (code) return String.fromCodePoint(code[0].toLowerCase() === "x" ? parseInt(code.slice(1), 16) : Number(code));
    return { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " }[name.toLowerCase()] || match;
  });
}

function attributes(tag) {
  const values = {};
  for (const [, name, double, single, unquoted] of tag.matchAll(/\b([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    values[name.toLowerCase()] = decodeEntities(double ?? single ?? unquoted);
  }
  return values;
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(match => attributes(match[0]));
}

function publicUrl(route) {
  return new URL(`${basePath}${route === "/" ? "/" : `${route}/`}`, siteUrl.origin);
}

function localPath(url, context) {
  const pathname = decodeURIComponent(url.pathname);
  assert(pathname === basePath || pathname.startsWith(`${basePath}/`), `${context}: local URL escapes the configured demo base path (${url.href})`);
  return pathname.slice(basePath.length) || "/";
}

function readableText(html) {
  return decodeEntities(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

const pages = new Map();
for (const route of routes) {
  const filename = route === "/" ? "index.html" : `${route.slice(1)}/index.html`;
  const html = await readFile(path.join(exportRoot, filename), "utf8");
  assert.equal((html.match(/<h1\b/gi) || []).length, 1, `${route}: exactly one H1`);
  assert.equal(tags(html, "html")[0]?.lang, "de", `${route}: German document language`);
  assert.equal(tags(html, "main")[0]?.lang, "de", `${route}: German main content language`);
  const robots = tags(html, "meta").find(meta => meta.name?.toLowerCase() === "robots");
  assert(robots?.content?.toLowerCase().split(/[,\s]+/).includes("noindex"), `${route}: demo must remain noindex`);
  const canonicals = tags(html, "link").filter(link => link.rel?.toLowerCase() === "canonical");
  assert.equal(canonicals.length, 1, `${route}: exactly one canonical URL`);
  const canonical = new URL(canonicals[0].href);
  const expected = publicUrl(route);
  assert.equal(canonical.origin, expected.origin, `${route}: canonical uses the actual demo host`);
  assert.equal(trimPath(canonical.pathname), trimPath(expected.pathname), `${route}: canonical uses the actual demo path`);
  assert(!canonical.search && !canonical.hash, `${route}: canonical contains no query or fragment`);
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => decodeEntities(match[1])));
  pages.set(route, { html, ids, text: readableText(html) });
}

let localLinks = 0;
let fragments = 0;
const checkedAssets = new Set();

async function verifyAsset(raw, baseUrl, context) {
  if (!raw || raw.startsWith("data:") || raw.startsWith("blob:")) return;
  const url = new URL(raw, baseUrl);
  if (url.origin !== siteUrl.origin || !["http:", "https:"].includes(url.protocol)) return;
  const asset = localPath(url, context);
  const filename = path.resolve(exportRoot, `.${asset}`);
  assert(filename.startsWith(`${exportRoot}${path.sep}`), `${context}: asset stays inside export`);
  if (checkedAssets.has(filename)) return;
  const info = await stat(filename).catch(() => null);
  assert(info?.isFile() && info.size > 0, `${context}: missing or empty local asset ${asset}`);
  checkedAssets.add(filename);
  if (filename.endsWith(".css")) {
    const css = await readFile(filename, "utf8");
    for (const [, reference] of css.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) {
      await verifyAsset(reference, url, `${context}: CSS resource`);
    }
  }
}

for (const [route, page] of pages) {
  const baseUrl = publicUrl(route);
  for (const anchor of tags(page.html, "a")) {
    if (!anchor.href) continue;
    const targetUrl = new URL(anchor.href, baseUrl);
    if (!["http:", "https:"].includes(targetUrl.protocol) || targetUrl.origin !== siteUrl.origin) continue;
    const target = trimPath(localPath(targetUrl, `${route}: link`));
    if (/\.[a-z\d]{2,8}$/i.test(target)) {
      await verifyAsset(anchor.href, baseUrl, `${route}: linked file`);
      continue;
    }
    assert(pages.has(target), `${route}: missing local page ${anchor.href}`);
    localLinks++;
    if (targetUrl.hash) {
      const fragment = decodeURIComponent(targetUrl.hash.slice(1));
      assert(pages.get(target).ids.has(fragment), `${route}: missing local fragment ${anchor.href}`);
      fragments++;
    }
  }
  for (const image of [...tags(page.html, "img"), ...tags(page.html, "source")]) {
    await verifyAsset(image.src, baseUrl, `${route}: image`);
    for (const item of (image.srcset || "").split(",")) {
      const reference = item.trim().split(/\s+/)[0];
      if (reference) await verifyAsset(reference, baseUrl, `${route}: image candidate`);
    }
  }
  for (const script of tags(page.html, "script")) await verifyAsset(script.src, baseUrl, `${route}: script`);
  for (const link of tags(page.html, "link")) {
    if (link.rel !== "canonical" && ["stylesheet", "preload", "modulepreload", "icon", "shortcut icon", "apple-touch-icon"].includes(link.rel)) {
      await verifyAsset(link.href, baseUrl, `${route}: ${link.rel}`);
      for (const item of (link.imagesrcset || "").split(",")) {
        const reference = item.trim().split(/\s+/)[0];
        if (reference) await verifyAsset(reference, baseUrl, `${route}: preloaded image candidate`);
      }
    }
  }
  for (const label of ["Unternehmen", "Kontakt", "Zum Inhalt springen", "Verlagssoftware", "Spezialisierte Services"]) {
    assert(page.text.includes(label), `${route}: German shared label ${label}`);
  }
  const accessibilityText = [...tags(page.html, "img"), ...tags(page.html, "a"), ...tags(page.html, "button"), ...tags(page.html, "nav"), ...tags(page.html, "dialog"), ...tags(page.html, "section")].flatMap(tag => [tag.alt || "", tag["aria-label"] || "", tag.title || ""]).join(" ");
  for (const phrase of [
    "Software and services.", "Built for publishers.", "Explore the software", "Discover our services", "Talk to COVER",
    "What publishers say.", "Customer stories", "Why publishers choose COVER", "One partner for the software",
    "Software-only", "Specialist services.", "More capacity for your team.", "The systems behind", "Publishing technology.",
    "In good company.", "Some of our customers", "View all publishers", "Show less", "Please select", "What would you like to discuss?",
    "What would you like to improve?", "Prepare enquiry", "Let’s take the next step.", "Back to the form", "Customer area",
    "Skip to content", "Main navigation", "Mobile main navigation", "Close menu", "Previous customer statement", "Next customer statement",
    "Publishing professionals", "Customer support professionals", "Invoices, a calculator", "An online shop and a card",
  ]) {
    assert(!`${page.text} ${accessibilityText}`.includes(phrase), `${route}: retired English UI remains: ${phrase}`);
  }
  assert(!page.html.includes('lang="en"'), `${route}: no English-language wrapper remains`);
}

const platformLinks = tags(pages.get("/plattform").html, "a").map(anchor => anchor.href).filter(Boolean);
for (const slug of moduleSlugs) {
  assert(platformLinks.some(href => {
    const url = new URL(href, publicUrl("/plattform"));
    return url.origin === siteUrl.origin && trimPath(localPath(url, "Platform module link")) === `/plattform/${slug}`;
  }), `Platform: ${slug} links to its designated local page`);
}
const legacyModulePaths = new Set(moduleSlugs.map(slug => `/${slug}`));
for (const href of platformLinks) {
  const url = new URL(href, publicUrl("/plattform"));
  assert(!(url.hostname.replace(/^www\./, "") === "covernet.de" && legacyModulePaths.has(trimPath(url.pathname))), `Platform: ERP module still points to the main website: ${href}`);
}

for (const label of ["Software und Services.", "Für Verlage entwickelt.", "Kunden- und Aboservice", "Buchhaltung und Verwaltung", "Verlagsprozesse", "Marketing und Kundenentwicklung", "Warum Verlage sich für COVER entscheiden", "Mit COVER sprechen", "2.600+"]) {
  assert(pages.get("/").text.includes(label), `Homepage: German message ${label}`);
}
for (const route of ["/", "/services"]) {
  assert(/Kosten(?:günstige|effiziente) und flexible (?:Dienstleistungen|Services)/.test(pages.get(route).text), `${route}: flexible, cost-effective service proposition retained`);
}
for (const id of ["erp", "crm", "commerce", "integrations"]) assert(pages.get("/plattform").ids.has(id), `Platform: product anchor ${id}`);
for (const id of ["customer-service", "accounting", "publishing-operations", "marketing-growth", "technology"]) assert(pages.get("/services").ids.has(id), `Services: architecture anchor ${id}`);

console.log(JSON.stringify({ result: "pass", routes: pages.size, designatedModulePages: moduleSlugs.length, localLinks, fragments, assets: checkedAssets.size, language: "de", canonicalHost: siteUrl.origin, basePath: basePath || "/", noindex: true }, null, 2));
