const fs = require('fs');
const path = 'src/pages/OverOns.tsx';
try {
    if (!fs.existsSync(path)) {
        fs.writeFileSync('log.txt', 'File not found: ' + path);
        process.exit(1);
    }
    let content = fs.readFileSync(path, 'utf8');
    const search = 'https://images.unsplash.com/photo-1620615307442-4143935d9b14?q=80&w=800&auto=format&fit=crop';
    const replace = '/material.webp';

    if (content.includes(search)) {
        content = content.replace(search, replace);
        fs.writeFileSync(path, content, 'utf8');
        fs.writeFileSync('log.txt', 'Replaced successfully');
    } else {
        fs.writeFileSync('log.txt', 'Search string not found. Content length: ' + content.length);
        // Maybe try fuzzy match or partial match?
        const partial = 'photo-1620615307442';
        if (content.includes(partial)) {
            fs.appendFileSync('log.txt', '\nContext around partial: ' + content.substring(content.indexOf(partial) - 50, content.indexOf(partial) + 100));
        } else {
            fs.appendFileSync('log.txt', '\nPartial match also failed');
        }
    }
} catch (e) {
    fs.writeFileSync('log.txt', 'Error: ' + e.message);
}
