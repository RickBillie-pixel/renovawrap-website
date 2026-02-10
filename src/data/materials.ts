
export interface Material {
    id: string;
    name: string;
    category: string;
    image: string;
}

// Import all images from the directory
const molecules = import.meta.glob('../assets/Kleurenwrap/*.jpg', { eager: true, import: 'default' });

export const materials: Material[] = Object.entries(molecules).map(([path, image]) => {
    // Extract filename from path (e.g., "../assets/Kleurenwrap/W123-Name.jpg" -> "W123-Name.jpg")
    const filename = path.split('/').pop() || '';

    // Extract ID and Name (e.g., "W123-Name.jpg" -> id: "W123", name: "Name")
    // Some files might be "Name.jpg" or "ID-Name.jpg"
    const namePart = filename.replace('.jpg', '');
    const parts = namePart.split('-');
    const id = parts[0];
    // Rejoin the rest as the name, replacing hyphens with spaces
    const name = parts.slice(1).join(' ');

    let category = 'Overige'; // Default

    // Categorization Logic based on ID prefix and name keywords
    if (id.startsWith('W') || id.startsWith('WO') || id.startsWith('DW') || id.startsWith('PW') || id.startsWith('SPW') || id.startsWith('ZSW') || id.startsWith('PTW')) {
        category = 'Hout';
    } else if (id.startsWith('NS') || id.startsWith('ST') || id.startsWith('HD') || name.toLowerCase().includes('stone') || name.toLowerCase().includes('marble') || name.toLowerCase().includes('concrete') || name.toLowerCase().includes('cement')) {
        category = 'Natuursteen & Beton';
    } else if (id.startsWith('RM') || id.startsWith('ME') || id.startsWith('DM') || id.startsWith('APZ') || name.toLowerCase().includes('metal') || name.toLowerCase().includes('gold') || name.toLowerCase().includes('silver') || name.toLowerCase().includes('copper') || name.toLowerCase().includes('brass')) {
        category = 'Metaal'; // Check for specific exceptions later
    } else if (id.startsWith('S') || id.startsWith('PNT') || id.startsWith('HS') || id.startsWith('LS')) {
        category = 'Uni Kleuren';
    } else if (id.startsWith('LE') || id.startsWith('TNS') || id.startsWith('TE') || id.startsWith('RF') || name.toLowerCase().includes('leather') || name.toLowerCase().includes('fabric')) {
        category = 'Textiel & Leder';
    } else if (id.startsWith('PM') || id.startsWith('ZX')) {
        category = 'Premium';
    }

    // Refinements based on specific keywords overlapping categories
    if (name.toLowerCase().includes('leather')) category = 'Textiel & Leder';
    if (name.toLowerCase().includes('marble') || name.toLowerCase().includes('terrazzo')) category = 'Natuursteen & Beton';

    // Correcting specific known prefixes if they were miscategorized
    if (id === 'DM801') category = 'Natuursteen & Beton'; // Speckled Stone

    // Ensure 'Premium' materials are correctly identified if they are high-end collections
    // Based on user request, "Premium" is a specific style. 
    // Let's broaden Premium to include specific high-end looking codes if uncertain, 
    // but adhere to the requested separation.
    // Actually, let's keep it simple: Premium usually implies specific series like PM, ZX.
    // Let's stick to the current logic and refine if needed.

    return {
        id: id, // Use the code as ID
        name: name || id, // Fallback to ID if no name part
        category,
        image: image as string,
    };
});

// Helper to get all categories
export const categories = Array.from(new Set(materials.map(m => m.category))).sort();

// Helper to get grouped materials
export const materialsByCategory = categories.reduce((acc, category) => {
    acc[category] = materials.filter(m => m.category === category);
    return acc;
}, {} as Record<string, Material[]>);
