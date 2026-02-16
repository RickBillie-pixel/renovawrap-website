/**
 * Local SEO Validation Script
 * Runs after `npm run build:static` to verify that all 10 city pages are correctly generated
 * and meet stricter SEO requirements than the generic check.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "..", "dist");

const CITIES = [
    "eindhoven",
    "helmond",
    "roosendaal",
    "tilburg",
    "utrecht",
    "veldhoven",
    "weert",
    "limburg",
    "nijmegen",
    "oss"
];

const REQUIRED_LINKS = [
    "/",
    "/diensten",
    "/contact",
    "/catalogus"
];

function getPageContent(slug) {
    const filePath = path.join(DIST, "diensten", "keuken-wrapping", slug, "index.html");
    if (!fs.existsSync(filePath)) return null;
    return fs.readFileSync(filePath, "utf-8");
}

function validatePage(slug, html) {
    const errors = [];
    const warnings = [];

    // 1. Title check (must contain city name)
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    if (!titleMatch) errors.push("Missing <title>");
    else if (!titleMatch[1].toLowerCase().includes(slug)) warnings.push(`Title might not contain city name (${slug})`);

    // 2. Meta description (must contain city name)
    const metaDesc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    if (!metaDesc) errors.push("Missing meta description");
    else if (!metaDesc[1].toLowerCase().includes(slug)) warnings.push(`Meta description might not contain city name (${slug})`);

    // 3. Canonical URL
    if (!html.includes(`<link rel="canonical" href="https://renovawrap.nl/diensten/keuken-wrapping/${slug}"`)) {
        errors.push("Missing or incorrect canonical URL");
    }

    // 4. H1 tag (must be present)
    if (!html.match(/<h1/i)) errors.push("Missing <h1> tag");

    // 5. Schema.org JSON-LD
    if (!html.includes('application/ld+json')) errors.push("Missing JSON-LD structured data");
    if (!html.includes('"@type":"Service"')) warnings.push("JSON-LD might be missing Service type");
    if (!html.includes('"@type":"BreadcrumbList"')) warnings.push("JSON-LD might be missing Breadcrumbs");

    // 6. Internal Links
    const missingLinks = REQUIRED_LINKS.filter(link => !html.includes(`href="${link}"`));
    if (missingLinks.length > 0) errors.push(`Missing internal links: ${missingLinks.join(", ")}`);

    // 7. Content length (check for empty body)
    const bodyContent = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyContent && bodyContent[1].replace(/<[^>]*>/g, "").trim().length < 500) {
        errors.push("Content seems suspiciously short (< 500 chars text)");
    }

    return { errors, warnings };
}

console.log("Starting Local SEO Validation...\n");

let hasErrors = false;

for (const city of CITIES) {
    const html = getPageContent(city);

    if (!html) {
        console.error(`[FAIL] ${city}: File not found (dist/diensten/keuken-wrapping/${city}/index.html)`);
        hasErrors = true;
        continue;
    }

    const { errors, warnings } = validatePage(city, html);

    if (errors.length > 0) {
        console.error(`[FAIL] ${city}:`);
        errors.forEach(e => console.error(`  - ${e}`));
        hasErrors = true;
    } else {
        console.log(`[PASS] ${city}`);
    }

    if (warnings.length > 0) {
        warnings.forEach(w => console.warn(`  [WARN] ${city}: ${w}`));
    }
}

console.log("\nValidation complete.");
if (hasErrors) {
    process.exit(1);
}
