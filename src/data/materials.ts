
export interface Material {
    id: string;
    name: string;
    category: string;
    image: string;
}

// Import all images from the directory
const modules = import.meta.glob('../assets/Kleurenwrap/*.jpg', { eager: true, import: 'default' });

/**
 * Categorisation is based on the product‑code prefix that every file starts with.
 * Longer / more‑specific prefixes are checked FIRST so that e.g. "SPW" is matched
 * before the generic "S" rule.
 *
 * Categories:
 *   Hout             – Wood‑look films (W, WO, DW, DWP, PW, SPW, ZSW, ZX, PTW, PZ, PZN, BZ, XP, Z860S)
 *   Natuursteen      – Natural‑stone, marble, terrazzo, concrete, slate (NS, PM, PNC, ST, HD, DM801)
 *   Metaal           – Metallic / brushed‑metal films (RM, ME, DM, APZ)
 *   Uni Kleuren      – Solid / uni colours (S, SC, HS, LS, PNT)
 *   Textiel & Leder  – Fabric, leather, textile (LE, TNS, TE, RF)
 */
function categorise(code: string, name: string): string {
    const c = code.toUpperCase();
    const n = name.toLowerCase();

    // ── Hout (Wood) ─────────────────────────────────────────────
    // Check multi‑char prefixes first so they aren't swallowed by shorter ones
    if (c.startsWith('SPW')) return 'Hout';
    if (c.startsWith('ZSW')) return 'Hout';
    if (c.startsWith('ZX')) return 'Hout';
    if (c.startsWith('DWP')) return 'Hout';
    if (c.startsWith('DW')) return 'Hout';
    if (c.startsWith('PTW')) return 'Hout';
    if (c.startsWith('PW')) return 'Hout';
    if (c.startsWith('PZ')) return 'Hout';   // PZ + PZN (premium decorative wood)
    if (c.startsWith('WO')) return 'Hout';
    if (c.startsWith('W')) return 'Hout';
    if (c.startsWith('BZ')) return 'Hout';   // BZ910 Magister (decorative wood)
    if (c.startsWith('XP')) return 'Hout';   // XP103 Ancoris (decorative wood)
    if (c.startsWith('Z860')) return 'Hout';   // Z860S New-Vintage

    // ── Natuursteen (Natural stone, marble, terrazzo, concrete) ─
    if (c.startsWith('NS')) return 'Natuursteen';
    if (c.startsWith('PM')) return 'Natuursteen'; // Premium Marble / Terrazzo
    if (c.startsWith('PNC')) return 'Natuursteen'; // Premium Natural Concrete
    if (c.startsWith('ST')) return 'Natuursteen'; // Stone textures
    if (c.startsWith('HD')) return 'Natuursteen'; // HD711 Beige Marble Gloss
    if (c === 'DM801') return 'Natuursteen'; // Speckeld Stone (exception from DM metallic)

    // ── Metaal (Metallic) ───────────────────────────────────────
    if (c.startsWith('RM')) return 'Metaal';
    if (c.startsWith('ME')) return 'Metaal';
    if (c.startsWith('DM')) return 'Metaal'; // DM017 / DM036 brushed / metallic silver
    if (c.startsWith('APZ')) return 'Metaal'; // Gold / Silver metal weaves & cracks

    // ── Textiel & Leder ─────────────────────────────────────────
    if (c.startsWith('TNS')) return 'Textiel & Leder';
    if (c.startsWith('TE')) return 'Textiel & Leder';
    if (c.startsWith('LE')) return 'Textiel & Leder';
    if (c.startsWith('RF')) return 'Textiel & Leder'; // RF007 Tweed

    // ── Uni Kleuren (Solid colours) ─────────────────────────────
    // Check multi‑char prefixes (PNT, SC, HS, LS) before single "S"
    if (c.startsWith('PNT')) return 'Uni Kleuren';
    if (c.startsWith('SC')) return 'Uni Kleuren';
    if (c.startsWith('HS')) return 'Uni Kleuren';
    if (c.startsWith('LS')) return 'Uni Kleuren';
    if (c.startsWith('S')) return 'Uni Kleuren';  // S115, S126 … plain colours

    // ── Keyword fallbacks (safety net) ──────────────────────────
    if (n.includes('leather') || n.includes('fabric') || n.includes('tweed'))
        return 'Textiel & Leder';
    if (n.includes('marble') || n.includes('terrazzo') || n.includes('stone') || n.includes('concrete') || n.includes('cement') || n.includes('slate') || n.includes('basalt'))
        return 'Natuursteen';
    if (n.includes('metal') || n.includes('gold') || n.includes('silver') || n.includes('copper') || n.includes('brass'))
        return 'Metaal';
    if (n.includes('wood'))
        return 'Hout';

    return 'Overige';
}

export const materials: Material[] = Object.entries(modules).map(([path, image]) => {
    const filename = path.split('/').pop() || '';
    const namePart = filename.replace('.jpg', '');
    const parts = namePart.split('-');
    const id = parts[0];
    const name = parts.slice(1).join(' ');

    return {
        id,
        name: name || id,
        category: categorise(id, name),
        image: image as string,
    };
});

// Sort materials alphabetically within each category
materials.sort((a, b) => a.name.localeCompare(b.name));

// Helper: all unique categories
export const categories = Array.from(new Set(materials.map(m => m.category))).sort();

// Helper: grouped by category
export const materialsByCategory = categories.reduce((acc, category) => {
    acc[category] = materials.filter(m => m.category === category);
    return acc;
}, {} as Record<string, Material[]>);
