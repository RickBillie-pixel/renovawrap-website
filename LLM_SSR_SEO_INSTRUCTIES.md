# Server-Side Rendering (SSR) & Local SEO Architectuur

Dit document beschrijft de architectuur en de werking van de SSR (Server-Side Rendering) en Local SEO setup voor de RenovaWrap website. Het is bedoeld om een LLM of developer snel of volledig inzicht te geven in hoe de lokale bestemmingspagina's (zoals keuken-wrapping in specifieke steden) technisch in elkaar zitten om maximaal te scoren in Google, en hoe ze optimaal met elkaar linken.

## 1. Technologische Stack
- **Framework:** React + Vite
- **Routing:** React Router DOM
- **Deployment:** Vercel (static fallback + rewrites)
- **Pre-rendering:** Custom Node.js sitemap-driven script (`scripts/prerender.js`)

## 2. De SSR / Prerendering Flow
Omdat een standaard React applicatie een SPA (Single Page Application) is, zien webcrawlers initieel alleen een lege `<div id="root"></div>`. Voor lokale SEO is dat funest.
Daarom is er een hybride SSR (prerendering) systeem gebouwd:

1. **Sitemap als Source of Truth:**
   Het script `scripts/prerender.js` leest `public/sitemap.xml` uit. Elk URL-pad ( `<loc>` ) in de sitemap is een te genereren pagina.
2. **React renderToString:**
   Via `vite build --ssr` wordt er een server-side versie van de app gemaakt (`src/entry-server.tsx`). Deze entry point routeert naar de juiste component via `StaticRouter` en verzamelt alle SEO metadata (via `useSEO`).
3. **Injectie in HTML:**
   De daadwerkelijke content wordt gerenderd naar een string en via templating in `dist/index.html` (de client build) geïnjecteerd op de plek van `<!--ssr-outlet-->`.
4. **SEO Metadata en JSON-LD:**
   Alle dynamische tags (title, meta description, open graph, canonicals, en de verzamelde JSON-LD scripts) worden óók in de `<head>` geschoten.
5. **Static Output:**
   Het resultaat is een échte statische map/bestand structuur (bijv. `dist/diensten/keuken-wrapping/eindhoven/index.html`).

*Commando:* `npm run build:static` voert het volledige proces uit:
Client Build -> SSR Build -> Prerender -> Link Validation -> SEO Validation.

## 3. Waarom deze lokale pagina's "heel goed op elkaar scoren"
De lokale bestemmingspagina's scoren niet alleen door de content, maar voornamelijk door de technische en structurele opzet. De SEO strategie leunt op de volgende pijlers, die ook strict worden vastgelegd via het validatiescript (`scripts/validate-local-seo.js`):

### A. Strikt Gereguleerde Metadata
Elke lokale template (bijv. voor Eindhoven, Helmond, etc.) moet voorzien zijn van:
- Een `<title>` én `<meta name="description">` die exact de **plaatsnaam** bevat.
- Een expliciete `<link rel="canonical">` naar de eigen URL (bijv. `https://renovawrap.nl/diensten/keuken-wrapping/eindhoven`). Dit voorkomt duplicate content penalties, omdat het patroon van de pagina's sterk overlapt.
- Een `<h1>` tag op de pagina.

### B. Gestructureerde Data (JSON-LD Schema.org)
De pagina's injecteren dynamisch twee cruciale schema.org types:
1. **`"@type": "Service"`**: Google begrijpt hierdoor direct dat de pagina een lokale dienst (keuken wrappen) aanbiedt, inclusief aanbieder en beschrijving.
2. **`"@type": "BreadcrumbList"`**: Activeert 'sitelinks' structuur. Google toont de hiërarchie (Home > Diensten > Keuken Wrapping > [Stad]) in de zoekresultaten, wat sterk bijdraagt aan doorklikratio's (CTR) en interne link autoriteit.

### C. Strategische Interne Linking (Siloing)
Lokale SEO is nutteloos als de pagina's geïsoleerd (als "orphan pages") blijven. Het validatiescript forceert expliciet dat de opgebouwde pagina's interne links bevatten naar kernonderdelen:
- **Home (`/`)**
- **Diensten hoofdpagina (`/diensten`)**
- **Catalogus (`/catalogus`)**
- **Contact (`/contact`)**
Daarnaast linken de regionale pagina's via footer-elementen of "Werkgebied" secties weer terug of naar elkaar. Hierdoor stroomt "link juice" door de hele website en rankt het cluster als geheel veel hoger.

### D. Volledige Statische Content
Het content validatie component vereist een minimale string lengte (>500 karakters tekst). Google ontvangt 100% pre-rendered in-line HTML. De bots hoeven geen JavaScript te executeren om de content en de pijnpunten per regio (Hero section, unieke pain points) te parsen.

## 4. Instructies voor Toekomstige Aanpassingen / Uitbreiding
Wil je als LLM / Developer of gebruiker een nieuwe stad toevoegen of de setup aanpassen? Volg dan deze regels:

1. **Routing toevoegen:** Voeg de stad of dienst toe in je React routes (meestal dynamisch / layout based).
2. **Sitemap updaten:** Voeg de exacte URL toe aan `public/sitemap.xml`. Zonder vermelding in de sitemap rendert `prerender.js` hem **niet**!
3. **Validatie updaten:** Voeg de stad toe in `scripts/validate-local-seo.js` (array `CITIES`) als het een stads-specifieke landingpage is, zodat de build pipeline blijft controleren op fouten.
4. **Bouwen & Testen:** Run `npm run build:static`. Als de tags niet kloppen of links missen, faalt de build en weet je exact wat er mist voordat je live gaat.
