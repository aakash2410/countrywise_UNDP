const fs = require('fs');
const xlsx = require('xlsx');

const wb = xlsx.readFile('Master Sheet I UNDP Digital Transformation Project I Artha Global I Kalpa Impact.xlsx');
const targetSheets = ['Malaysia', 'Cambodia', 'Phillipines', 'Bangladesh', 'Nepal'];

const targets = {
    '1.3.1': 'Digital ID',
    '1.3.2': 'Digital Payments',
    '1.3.3': 'Data Exchange',
    '1.1.1': 'AI Strategy',
    '1.1.2': 'AI Governance',
    '1.1.4': 'Data Legislation',
    '1.2.1': 'Government AI Initiatives'
};

let results = {};

targetSheets.forEach(sheetName => {
    const sheet = wb.Sheets[sheetName];
    if (!sheet) return;

    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    results[sheetName] = {};

    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (!row || !Array.isArray(row)) continue;

        // Search for the index (1.3.1, etc.)
        let paramIndex = -1;
        for (let j = 0; j < Math.min(row.length, 6); j++) {
            if (typeof row[j] === 'string' && targets[row[j].trim()]) {
                paramIndex = j;
                break;
            }
        }

        if (paramIndex !== -1) {
            const targetId = row[paramIndex].trim();

            // Grab all subsequent string values ignoring purely short or HTTP strings
            let values = [];
            for (let j = paramIndex + 2; j < row.length; j++) {
                if (row[j] && typeof row[j] === 'string' && row[j].length > 4 && !row[j].startsWith('http')) {
                    values.push(row[j].trim().replace(/(\r\n|\n|\r)/gm, " "));
                }
            }

            results[sheetName][targets[targetId]] = values.join(' - ');
        }
    }
});

fs.writeFileSync('context_data.json', JSON.stringify(results, null, 2));
console.log('Dumped to context_data.json');
