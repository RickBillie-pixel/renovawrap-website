/**
 * Post-build prerender: genereert per route een aparte HTML-pagina.
 * Zo kan Google elke pagina apart indexeren (geen SPA).
 * Draait na: npm run build
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const PORT = 4321;
const BASE = `http://localhost:${PORT}`;

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

function serveStatic(req, res) {
  let urlPath = req.url?.split('?')[0] || '/';
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(DIST, urlPath.replace(/^\//, ''));
  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      fs.readFile(path.join(DIST, 'index.html'), (e, data) => {
        if (e) {
          res.writeHead(500);
          res.end('index.html not found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
      return;
    }
    const stream = fs.createReadStream(filePath);
    const ext = path.extname(filePath);
    const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.ico': 'image/x-icon', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    stream.pipe(res);
  });
}

async function getBrowser() {
  if (process.env.VERCEL) {
    try {
      const puppeteer = require('puppeteer-core');
      const chromium = require('@sparticuz/chromium');
      const executablePath = await chromium.executablePath();
      return await puppeteer.launch({
        executablePath,
        args: chromium.args,
        headless: true,
      });
    } catch (e) {
      console.warn('Vercel Chromium not available:', e.message);
    }
  }
  try {
    const puppeteer = require('puppeteer');
    return await puppeteer.launch({ headless: true });
  } catch (e) {
    return null;
  }
}

function runPrerender() {
  return new Promise((resolve, reject) => {
    const server = http.createServer(serveStatic);
    server.listen(PORT, async () => {
      try {
        const browser = await getBrowser();
        if (!browser) {
          console.warn('Prerender skipped: Chrome/Chromium not found. Run "npx puppeteer browsers install chrome" or deploy to Vercel for static pages.');
          server.close(() => resolve());
          return;
        }
        for (const route of ROUTES) {
          const page = await browser.newPage();
          await page.goto(BASE + route, { waitUntil: 'networkidle0', timeout: 30000 });
          await page.evaluate(() => {
            return new Promise((r) => {
              const done = () => r();
              const t = setTimeout(done, 3000);
              document.addEventListener('render-event', () => { clearTimeout(t); done(); }, { once: true });
            });
          });
          const html = await page.content();
          await page.close();
          const outDir = route === '/' ? DIST : path.join(DIST, route);
          if (route !== '/') fs.mkdirSync(outDir, { recursive: true });
          const outFile = route === '/' ? path.join(DIST, 'index.html') : path.join(outDir, 'index.html');
          fs.writeFileSync(outFile, html, 'utf8');
          console.log('Prerendered:', route || '/');
        }
        await browser.close();
        server.close(() => resolve());
      } catch (err) {
        server.close();
        reject(err);
      }
    });
  });
}

runPrerender().then(() => {
  console.log('Prerender done.');
  process.exit(0);
}).catch((err) => {
  const msg = err && err.message ? err.message : String(err);
  if (msg.includes('Could not find Chrome') || msg.includes('executablePath')) {
    console.warn('Prerender skipped:', msg);
    process.exit(0);
  }
  console.error('Prerender failed:', err);
  process.exit(1);
});
