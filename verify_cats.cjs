const fs = require('fs');
const files = fs.readdirSync('src/assets/Kleurenwrap').filter(f => f.endsWith('.jpg'));
const cats = {};

files.forEach(f => {
    const p = f.replace('.jpg', '').split('-');
    const id = p[0];
    const name = p.slice(1).join(' ');
    const c = id.toUpperCase();

    let cat = 'Overige';
    if (c.startsWith('SPW')) cat = 'Hout';
    else if (c.startsWith('ZSW')) cat = 'Hout';
    else if (c.startsWith('ZX')) cat = 'Hout';
    else if (c.startsWith('DWP')) cat = 'Hout';
    else if (c.startsWith('DW')) cat = 'Hout';
    else if (c.startsWith('PTW')) cat = 'Hout';
    else if (c.startsWith('PW')) cat = 'Hout';
    else if (c.startsWith('PZ')) cat = 'Hout';
    else if (c.startsWith('WO')) cat = 'Hout';
    else if (c.startsWith('W')) cat = 'Hout';
    else if (c.startsWith('BZ')) cat = 'Hout';
    else if (c.startsWith('XP')) cat = 'Hout';
    else if (c.startsWith('Z860')) cat = 'Hout';
    else if (c.startsWith('NS')) cat = 'Natuursteen';
    else if (c.startsWith('PM')) cat = 'Natuursteen';
    else if (c.startsWith('PNC')) cat = 'Natuursteen';
    else if (c.startsWith('ST')) cat = 'Natuursteen';
    else if (c.startsWith('HD')) cat = 'Natuursteen';
    else if (c === 'DM801') cat = 'Natuursteen';
    else if (c.startsWith('RM')) cat = 'Metaal';
    else if (c.startsWith('ME')) cat = 'Metaal';
    else if (c.startsWith('DM')) cat = 'Metaal';
    else if (c.startsWith('APZ')) cat = 'Metaal';
    else if (c.startsWith('TNS')) cat = 'Textiel';
    else if (c.startsWith('TE')) cat = 'Textiel';
    else if (c.startsWith('LE')) cat = 'Textiel';
    else if (c.startsWith('RF')) cat = 'Textiel';
    else if (c.startsWith('PNT')) cat = 'Uni Kleuren';
    else if (c.startsWith('SC')) cat = 'Uni Kleuren';
    else if (c.startsWith('HS')) cat = 'Uni Kleuren';
    else if (c.startsWith('LS')) cat = 'Uni Kleuren';
    else if (c.startsWith('S')) cat = 'Uni Kleuren';

    if (!cats[cat]) cats[cat] = [];
    cats[cat].push(id + ' - ' + (name || id));
});

Object.keys(cats).sort().forEach(k => {
    console.log('\n=== ' + k + ' (' + cats[k].length + ' items) ===');
    cats[k].forEach(v => console.log('  ' + v));
});

console.log('\n--- TOTAAL: ' + files.length + ' bestanden ---');
