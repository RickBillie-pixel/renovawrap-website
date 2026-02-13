/**
 * SSR-based static pre-renderer.
 *
 * For every route in the sitemap this script:
 *   1. Calls the SSR render() function (React renderToString)
 *   2. Injects the rendered HTML into the client-built template
 *   3. Replaces meta tags with route-specific SEO data
 *   4. Writes the result to dist/{route}/index.html
 *
 * Run after both `vite build` (client) and `vite build --ssr` (server).
 *
 * No Puppeteer, no Chrome — just Node.js + React.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, '..', 'dist');

// ── All routes to pre-render (source of truth) ──────────────────
const ROUTES = [
  '/',
  '/diensten',
  '/diensten/keuken-wrapping',
  '/diensten/keuken-frontjes',
  '/diensten/achterwanden',
  '/diensten/aanrechtbladen',
  '/diensten/kasten',
  '/diensten/deuren',
  '/diensten/kozijnen',
  '/diensten/schadeherstel',
  '/projecten',
  '/contact',
  '/over-ons',
  '/configurator',
  '/catalogus',
  '/privacy-policy',
  '/algemene-voorwaarden',
];
// ─────────────────────────────────────────────────────────────────

/**
 * Escape special regex characters in a string so it can be used literally
 * inside a RegExp constructor.
 */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Replace a <meta> or <link> tag in the template using a regex.
 * Handles multi-line attributes.
 */
function replaceMeta(html, pattern, replacement) {
  const re = new RegExp(pattern, 's');
  return re.test(html) ? html.replace(re, replacement) : html;
}

/**
 * Inject route-specific SEO tags into the HTML template.
 */
function injectSEO(html, seoData) {
  if (!seoData) return html;

  const { title, description, canonical, ogImage, ogType, robots, jsonLd } = seoData;

  // ── Title ──
  html = replaceMeta(html, '<title>[\\s\\S]*?</title>', `<title>${title}</title>`);
  html = replaceMeta(
    html,
    '<meta name="title" content="[^"]*"',
    `<meta name="title" content="${title}"`,
  );

  // ── Description (may span multiple lines) ──
  html = replaceMeta(
    html,
    '<meta name="description"[\\s\\S]*?/>',
    `<meta name="description" content="${description}" />`,
  );

  // ── Canonical ──
  html = replaceMeta(
    html,
    '<link rel="canonical" href="[^"]*"',
    `<link rel="canonical" href="${canonical}"`,
  );

  // ── Robots ──
  if (robots) {
    html = replaceMeta(
      html,
      '<meta name="robots" content="[^"]*"',
      `<meta name="robots" content="${robots}"`,
    );
  }

  // ── Open Graph ──
  html = replaceMeta(
    html,
    '<meta property="og:title" content="[^"]*"',
    `<meta property="og:title" content="${title}"`,
  );
  html = replaceMeta(
    html,
    '<meta property="og:description"[\\s\\S]*?/>',
    `<meta property="og:description" content="${description}" />`,
  );
  html = replaceMeta(
    html,
    '<meta property="og:url" content="[^"]*"',
    `<meta property="og:url" content="${canonical}"`,
  );
  if (ogImage) {
    html = replaceMeta(
      html,
      '<meta property="og:image" content="[^"]*"',
      `<meta property="og:image" content="${ogImage}"`,
    );
  }
  if (ogType) {
    html = replaceMeta(
      html,
      '<meta property="og:type" content="[^"]*"',
      `<meta property="og:type" content="${ogType}"`,
    );
  }

  // ── Twitter Card ──
  html = replaceMeta(
    html,
    '<meta property="twitter:title" content="[^"]*"',
    `<meta property="twitter:title" content="${title}"`,
  );
  html = replaceMeta(
    html,
    '<meta property="twitter:description"[\\s\\S]*?/>',
    `<meta property="twitter:description" content="${description}" />`,
  );
  html = replaceMeta(
    html,
    '<meta property="twitter:url" content="[^"]*"',
    `<meta property="twitter:url" content="${canonical}"`,
  );
  if (ogImage) {
    html = replaceMeta(
      html,
      '<meta property="twitter:image" content="[^"]*"',
      `<meta property="twitter:image" content="${ogImage}"`,
    );
  }

  // ── Route-specific JSON-LD (insert before </head>) ──
  if (jsonLd) {
    const payload = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    // Each item in the array gets its own <script> tag
    const scripts = payload
      .map((item) => `<script type="application/ld+json" data-seo-jsonld="true">${JSON.stringify(item)}</script>`)
      .join('\n  ');
    html = html.replace('</head>', `  ${scripts}\n</head>`);
  }

  return html;
}

// ── Main ─────────────────────────────────────────────────────────
async function prerender() {
  console.log('SSR Pre-render: starting…\n');

  // 1. Read the client-built index.html as template
  const templatePath = path.join(DIST, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Client build not found at ${templatePath}. Run "vite build" first.`);
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  // 2. Import the SSR module (built by vite build --ssr)
  const ssrModulePath = path.join(DIST, 'server', 'entry-server.js');
  if (!fs.existsSync(ssrModulePath)) {
    throw new Error(`SSR build not found at ${ssrModulePath}. Run "vite build --ssr" first.`);
  }
  const { render } = await import(pathToFileURL(ssrModulePath).href);

  // 3. Render each route
  let success = 0;
  let failed = 0;

  for (const route of ROUTES) {
    try {
      const { html: appHtml, seoData } = render(route);

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
      console.log(`  ✓  dist/${relPath}  (${route})`);
      success++;
    } catch (err) {
      console.error(`  ✗  FAILED: ${route}`);
      console.error(`     ${err.message || err}`);
      failed++;
    }
  }

  // 4. Clean up the temporary server build
  fs.rmSync(path.join(DIST, 'server'), { recursive: true, force: true });

  console.log(`\nPre-render complete: ${success} succeeded, ${failed} failed out of ${ROUTES.length} routes.`);

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
