/**
 * SSR-based static pre-renderer — sitemap-driven.
 *
 * 1. Parses public/sitemap.xml to extract every <loc> URL.
 * 2. Converts absolute URLs to pathname routes.
 * 3. Merges any EXTRA_ROUTES not in the sitemap (e.g. legal pages).
 * 4. Skips routes in SKIP_ROUTES (e.g. /configurator — SPA-only).
 * 5. For each route: renders React → HTML via renderToString,
 *    injects SEO meta tags, writes dist/{route}/index.html.
 *
 * No Puppeteer, no Chrome — just Node.js + React.
 *
 * HOW TO ADD A NEW PAGE:
 *   1. Add a <url><loc>…</loc></url> entry to public/sitemap.xml.
 *   2. Run `npm run build:static`.
 *   That's it — the prerender will pick it up automatically.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

// ── Configuration ────────────────────────────────────────────────

/** Routes NOT in the sitemap that should still be prerendered. */
const EXTRA_ROUTES = [
  '/privacy-policy',
  '/algemene-voorwaarden',
];

/**
 * Routes to SKIP during prerender (remain SPA-only).
 * These still work via the client-side router after hydration,
 * and via the Vercel SPA-fallback rewrite for direct visits.
 */
const SKIP_ROUTES = new Set([
  '/configurator',
]);

// ── Sitemap parser ───────────────────────────────────────────────

/**
 * Parse a sitemap.xml file and return an array of pathname strings.
 * Uses a simple regex — no XML library needed.
 */
function parseSitemap(sitemapPath) {
  const xml = fs.readFileSync(sitemapPath, 'utf-8');
  const locRegex = /<loc>\s*(.*?)\s*<\/loc>/g;
  const routes = [];
  let match;

  while ((match = locRegex.exec(xml)) !== null) {
    try {
      const url = new URL(match[1]);
      // Normalise: strip trailing slash (except root "/")
      let pathname = url.pathname.replace(/\/+$/, '') || '/';
      routes.push(pathname);
    } catch {
      console.warn(`  ⚠  Skipping malformed URL in sitemap: ${match[1]}`);
    }
  }

  return routes;
}

// ── SEO injection ────────────────────────────────────────────────

function replaceMeta(html, pattern, replacement) {
  const re = new RegExp(pattern, 's');
  return re.test(html) ? html.replace(re, replacement) : html;
}

function injectSEO(html, seoData) {
  if (!seoData) return html;

  const { title, description, canonical, ogImage, ogType, robots, jsonLd } = seoData;

  // Title
  html = replaceMeta(html, '<title>[\\s\\S]*?</title>', `<title>${title}</title>`);
  html = replaceMeta(html, '<meta name="title" content="[^"]*"', `<meta name="title" content="${title}"`);

  // Description (may span multiple lines in template)
  html = replaceMeta(html, '<meta name="description"[\\s\\S]*?/>', `<meta name="description" content="${description}" />`);

  // Canonical
  html = replaceMeta(html, '<link rel="canonical" href="[^"]*"', `<link rel="canonical" href="${canonical}"`);

  // Robots
  if (robots) {
    html = replaceMeta(html, '<meta name="robots" content="[^"]*"', `<meta name="robots" content="${robots}"`);
  }

  // Open Graph
  html = replaceMeta(html, '<meta property="og:title" content="[^"]*"', `<meta property="og:title" content="${title}"`);
  html = replaceMeta(html, '<meta property="og:description"[\\s\\S]*?/>', `<meta property="og:description" content="${description}" />`);
  html = replaceMeta(html, '<meta property="og:url" content="[^"]*"', `<meta property="og:url" content="${canonical}"`);
  if (ogImage) {
    html = replaceMeta(html, '<meta property="og:image" content="[^"]*"', `<meta property="og:image" content="${ogImage}"`);
  }
  if (ogType) {
    html = replaceMeta(html, '<meta property="og:type" content="[^"]*"', `<meta property="og:type" content="${ogType}"`);
  }

  // Twitter Card
  html = replaceMeta(html, '<meta property="twitter:title" content="[^"]*"', `<meta property="twitter:title" content="${title}"`);
  html = replaceMeta(html, '<meta property="twitter:description"[\\s\\S]*?/>', `<meta property="twitter:description" content="${description}" />`);
  html = replaceMeta(html, '<meta property="twitter:url" content="[^"]*"', `<meta property="twitter:url" content="${canonical}"`);
  if (ogImage) {
    html = replaceMeta(html, '<meta property="twitter:image" content="[^"]*"', `<meta property="twitter:image" content="${ogImage}"`);
  }

  // Route-specific JSON-LD (insert before </head>)
  if (jsonLd) {
    const payload = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    const scripts = payload
      .map((item) => `<script type="application/ld+json" data-seo-jsonld="true">${JSON.stringify(item)}</script>`)
      .join('\n  ');
    html = html.replace('</head>', `  ${scripts}\n</head>`);
  }

  return html;
}

// ── Main ─────────────────────────────────────────────────────────

async function prerender() {
  console.log('╔══════════════════════════════════════════╗');
  console.log('║   SSR Pre-render (sitemap-driven)        ║');
  console.log('╚══════════════════════════════════════════╝\n');

  // 1. Parse sitemap.xml to discover routes
  const sitemapPath = path.join(ROOT, 'public', 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    throw new Error(`Sitemap not found at ${sitemapPath}. Create public/sitemap.xml first.`);
  }

  const sitemapRoutes = parseSitemap(sitemapPath);
  console.log(`  Sitemap routes found: ${sitemapRoutes.length}`);

  // 2. Merge extra routes, deduplicate, then remove skipped
  const allRoutes = [...new Set([...sitemapRoutes, ...EXTRA_ROUTES])];
  const routes = allRoutes.filter((r) => !SKIP_ROUTES.has(r));

  if (SKIP_ROUTES.size > 0) {
    const skipped = allRoutes.filter((r) => SKIP_ROUTES.has(r));
    if (skipped.length > 0) {
      console.log(`  Skipped (SPA-only): ${skipped.join(', ')}`);
    }
  }
  console.log(`  Routes to prerender: ${routes.length}\n`);

  // 3. Read the client-built index.html as template
  const templatePath = path.join(DIST, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Client build not found at ${templatePath}. Run "vite build" first.`);
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  // 4. Import the SSR module (built by vite build --ssr)
  const ssrModulePath = path.join(DIST, 'server', 'entry-server.js');
  if (!fs.existsSync(ssrModulePath)) {
    throw new Error(`SSR build not found at ${ssrModulePath}. Run "vite build --ssr" first.`);
  }
  const { render } = await import(pathToFileURL(ssrModulePath).href);

  // 5. Render each route
  let success = 0;
  let failed = 0;
  const results = [];

  for (const route of routes) {
    try {
      const { html: appHtml, seoData } = render(route);

      // Quick sanity check: does the rendered HTML contain real content?
      const hasContent = appHtml.length > 200 && /<(h[1-6]|main|section|p|nav)[\s>]/.test(appHtml);

      // Build the full HTML page
      let page = template.replace('<!--ssr-outlet-->', appHtml);
      page = injectSEO(page, seoData);

      // Determine output path
      const outDir = route === '/' ? DIST : path.join(DIST, route);
      if (route !== '/') {
        fs.mkdirSync(outDir, { recursive: true });
      }
      const outFile = route === '/' ? path.join(DIST, 'index.html') : path.join(outDir, 'index.html');
      fs.writeFileSync(outFile, page, 'utf-8');

      const relPath = path.relative(DIST, outFile).replace(/\\/g, '/');
      const sizeKB = (Buffer.byteLength(page, 'utf-8') / 1024).toFixed(1);
      const tag = hasContent ? '✓' : '⚠ (no body content)';
      console.log(`  ${tag}  dist/${relPath}  (${sizeKB} KB)  ${seoData?.title || '(no title)'}`);

      results.push({ route, hasContent, title: seoData?.title, sizeKB });
      success++;
    } catch (err) {
      console.error(`  ✗  FAILED: ${route}`);
      console.error(`     ${err.stack || err.message || err}`);
      results.push({ route, hasContent: false, error: err.message });
      failed++;
    }
  }

  // 6. Clean up the temporary server build
  fs.rmSync(path.join(DIST, 'server'), { recursive: true, force: true });

  // 7. Summary
  console.log('\n── Summary ──────────────────────────────────');
  console.log(`  Total:   ${routes.length}`);
  console.log(`  Success: ${success}`);
  console.log(`  Failed:  ${failed}`);

  const noContent = results.filter((r) => !r.hasContent && !r.error);
  if (noContent.length > 0) {
    console.log(`\n  ⚠  Routes with empty/minimal body content:`);
    noContent.forEach((r) => console.log(`     - ${r.route}`));
  }

  const withContent = results.filter((r) => r.hasContent);
  if (withContent.length > 0) {
    console.log(`\n  Pages with verified body content: ${withContent.length}/${routes.length}`);
  }

  console.log('─────────────────────────────────────────────\n');

  if (failed > 0) {
    process.exit(1);
  }
}

prerender()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('\nPre-render fatal error:', err);
    process.exit(1);
  });
