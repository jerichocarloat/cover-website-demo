// Serve the exact GitHub Pages export locally, including its project path.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "/cover-website-demo";
const port = Number(process.env.PORT || 3002);
const types = { ".html": "text/html; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".woff2": "font/woff2", ".ttf": "font/ttf", ".svg": "image/svg+xml" };
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (pathname === prefix) { response.writeHead(302, { Location: `${prefix}/` }).end(); return; }
    if (!pathname.startsWith(`${prefix}/`)) { response.writeHead(404).end(); return; }
    let filename = path.resolve(root, `.${pathname.slice(prefix.length)}`);
    if (!filename.startsWith(`${root}${path.sep}`) && filename !== root) { response.writeHead(403).end(); return; }
    if ((await stat(filename)).isDirectory()) filename = path.join(filename, "index.html");
    const body = await readFile(filename);
    response.writeHead(200, { "Content-Type": types[path.extname(filename)] || "application/octet-stream" }).end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" }).end(await readFile(path.join(root, "404.html")));
  }
}).listen(port, "127.0.0.1", () => console.log(`Demo preview: http://localhost:${port}${prefix}/`));
