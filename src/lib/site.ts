/** Build-time URLs for the standalone presentation demo, not the official COVER site. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001").replace(/\/$/, "");
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

export function assetPath(path: string): string {
  return path.startsWith("/") && !path.startsWith("//") ? `${basePath}${path}` : path;
}

export function pageUrl(path: string): string {
  return `${siteUrl}${path === "/" ? "/" : path}`;
}
