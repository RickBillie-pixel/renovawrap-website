/**
 * Sitelinks readiness validation — run after prerender (npm run build:static).
 * Verifies: header/footer nav links, non-empty title.
 * H1 check: warning only (SSR may not render route content when using lazy/Suspense).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "..", "dist");

const MAIN_NAV_HREFS = ["/", "/diensten", "/over-ons", "/projecten", "/configurator", "/contact"];

function extractPathFromFile(filePath) {
  const relative = path.relative(DIST, path.dirname(filePath));
  if (relative === ".") return "/";
  return "/" + relative.replace(/\\/g, "/");
}

function loadHtmlFiles(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) loadHtmlFiles(full, list);
    else if (e.name === "index.html") list.push(full);
  }
  return list;
}

function hasLink(html, href) {
  if (href === "/") {
    return /href="\/"/.test(html) || /href="https:\/\/renovawrap\.nl\/"/.test(html);
  }
  const escaped = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`href="${escaped}"`).test(html);
}

function countH1(html) {
  const matches = html.match(/<h1[\s>]/gi);
  return matches ? matches.length : 0;
}

function getTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  return m ? m[1].trim() : "";
}

function main() {
  console.log("Sitelinks readiness check (dist/)\n");

  const htmlFiles = loadHtmlFiles(DIST);
  if (htmlFiles.length === 0) {
    console.error("No index.html files found in dist/. Run build:static first.");
    process.exit(1);
  }

  let failed = false;

  for (const filePath of htmlFiles) {
    const route = extractPathFromFile(filePath);
    const html = fs.readFileSync(filePath, "utf-8");

    for (const href of MAIN_NAV_HREFS) {
      if (!hasLink(html, href)) {
        console.error(`[FAIL] ${route}: page missing link to ${href}`);
        failed = true;
      }
    }

    const h1Count = countH1(html);
    if (h1Count !== 1) {
      console.warn(`[WARN] ${route}: expected 1 H1 in HTML, found ${h1Count} (OK if using lazy routes)`);
    }

    const title = getTitle(html);
    if (!title) {
      console.error(`[FAIL] ${route}: empty <title>`);
      failed = true;
    }
  }

  if (failed) {
    console.error("\nSitelinks readiness check failed.");
    process.exit(1);
  }
  console.log(`Checked ${htmlFiles.length} pages. All required checks passed.`);
}

main();
