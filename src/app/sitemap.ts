import type { MetadataRoute } from "next";
import { erpModules, erpModuleHref } from "@/lib/erp-modules";
import { pageUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/services", "/news", "/plattform", "/operations", "/kundenentwicklung", "/loesungen", "/unternehmen", "/kontakt", ...erpModules.map(module => erpModuleHref(module.slug))];
  return paths.map(path => ({ url: pageUrl(path), lastModified: new Date("2026-10-08"), changeFrequency: path ? "monthly" : "weekly", priority: path ? 0.8 : 1 }));
}
