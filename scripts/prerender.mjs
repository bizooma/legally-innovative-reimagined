// Post-build: load each public sitemap route in headless Chromium and save the rendered HTML into dist.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const started = Date.now();

const EXCLUDE = [
  (p) => p === "/portal" || p.startsWith("/portal/"),
  (p) => (p === "/accessibility" || p.startsWith("/accessibility/")) && p !== "/accessibility-layer",
  (p) => p.startsWith("/proposals/"),
  (p) => p.startsWith("/status-ticker"),
  (p) => p.startsWith("/embed/"),
  (p) => p.startsWith("/incident-history"),
  (p) => p.startsWith("/privacy/"),
  (p) => ["/install", "/lcr", "/donuts", "/michael", "/this-is-our-jax"].includes(p),
];

const sitemap = fs.readFileSync(path.join(root, "public", "sitemap.xml"), "utf8");
const routes = [...sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
  .map((m) => new URL(m[1]).pathname.replace(/\/+$/, "") || "/")
  .filter((p, i, a) => a.indexOf(p) === i)
  .filter((p) => !EXCLUDE.some((x) => x(p)));

// Shell is read once up front so prerendered files never get served back as the shell.
const shell = fs.readFileSync(path.join(dist, "index.html"));
const TYPES = { ".js": "text/javascript", ".css": "text/css", ".html": "text/html", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon", ".woff2": "font/woff2", ".webmanifest": "application/manifest+json", ".txt": "text/plain", ".xml": "application/xml" };

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = path.join(dist, urlPath);
  if (file.startsWith(dist) && fs.existsSync(file) && fs.statSync(file).isFile() && !file.endsWith("index.html")) {
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
    return fs.createReadStream(file).pipe(res);
  }
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(shell);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const origin = `http://127.0.0.1:${server.address().port}`;

let browser;
let failed = null;
try {
  browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  for (const route of routes) {
    const page = await browser.newPage();
    try {
      await page.goto(origin + route, { waitUntil: "networkidle0", timeout: 30000 });
      try {
        await page.waitForSelector("h1, main", { timeout: 15000 });
      } catch {
        throw new Error(`no <h1> or <main> rendered on ${route}`);
      }
      await new Promise((r) => setTimeout(r, 500));
      const html = "<!DOCTYPE html>\n" + (await page.evaluate(() => document.documentElement.outerHTML));
      const out = route === "/" ? path.join(dist, "index.html") : path.join(dist, route.slice(1), "index.html");
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, html);
      console.log(`prerendered ${route} ${Buffer.byteLength(html)} bytes`);
    } finally {
      await page.close();
    }
  }
} catch (e) {
  failed = e;
} finally {
  if (browser) await browser.close();
  server.close();
}

if (failed) {
  console.error(`prerender FAILED: ${failed.message}`);
  process.exit(1);
}
console.log(`prerendered ${routes.length} routes in ${((Date.now() - started) / 1000).toFixed(1)}s`);
