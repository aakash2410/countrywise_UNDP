const fs = require('fs');
const xlsx = require('xlsx');

const wb = xlsx.readFile('Master Sheet I UNDP Digital Transformation Project I Artha Global I Kalpa Impact.xlsx');
const targetSheets = ['Cambodia', 'Bangladesh'];

let allResults = {};

targetSheets.forEach(sheetName => {
    const sheet = wb.Sheets[sheetName];
    if (!sheet) return;

    let links = new Set();
    const range = xlsx.utils.decode_range(sheet['!ref']);

    for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cell_address = { c: C, r: R };
            const cell_ref = xlsx.utils.encode_cell(cell_address);
            const cell = sheet[cell_ref];

            if (!cell) continue;

            if (cell.l && cell.l.Target && cell.l.Target.includes('http')) {
                links.add(cell.l.Target);
            }

            if (cell.v && typeof cell.v === 'string' && cell.v.includes('http')) {
                const splits = cell.v.split('\n').filter(l => l.includes('http')).map(l => l.replace(/^\d+\.\s*/, '').trim());
                splits.forEach(l => {
                    const match = l.match(/(https?:\/\/[^\s]+)/g);
                    if (match) {
                        match.forEach(m => links.add(m));
                    }
                });
            }
        }
    }

    allResults[sheetName] = Array.from(links);
    console.log(`Found ${links.size} links for ${sheetName}`);
});

console.log(allResults);

let mockData = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

targetSheets.forEach(sheetName => {
    let links = allResults[sheetName] || [];
    if (links.length > 0) {
        const lowerC = sheetName.toLowerCase() === 'phillipines' ? 'philippines' : sheetName.toLowerCase();
        const regex = new RegExp(`export const ${lowerC}Data: CountryDetailData = \\{[\\s\\S]*?\\n\\};`, 'g');
        mockData = mockData.replace(regex, (match) => {
            return match.replace(/sources:\s*\[[\s\S]*?\]/g, `sources: ${JSON.stringify(links)}`);
        });
    }
});

fs.writeFileSync('src/components/dashboard/MockData.ts', mockData);
console.log('MockData updated.');
