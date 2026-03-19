const fs = require('fs');
const xlsx = require('xlsx');

const wb = xlsx.readFile('Master Sheet I UNDP Digital Transformation Project I Artha Global I Kalpa Impact.xlsx');
const targetSheets = ['Malaysia', 'Cambodia', 'Phillipines', 'Bangladesh', 'Nepal'];

let allResults = {};

targetSheets.forEach(sheetName => {
    const sheet = wb.Sheets[sheetName];
    if (!sheet) return;

    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    let subParams = [];

    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (!row || !Array.isArray(row)) continue;

        let paramIndex = -1;
        for (let j = 0; j < row.length; j++) {
            if (typeof row[j] === 'string' && row[j].match(/^2\.1\.([1-9]|10)$/)) {
                paramIndex = j;
                break;
            }
        }

        if (paramIndex !== -1) {
            let labelText = row[paramIndex + 1] ? String(row[paramIndex + 1]) : '';

            let values = [];
            for (let j = paramIndex + 2; j < row.length; j++) {
                if (row[j] && typeof row[j] === 'string' && !row[j].includes('http') && row[j].length > 4) {
                    values.push(row[j].trim());
                }
            }

            let fullValue = values.join(' - ');

            if (fullValue.length > 0) {
                fullValue = fullValue.replace(/"/g, "'").replace(/(\r\n|\n|\r)/gm, " ");
                labelText = labelText.replace(/"/g, "'").replace(/(\r\n|\n|\r)/gm, " ");

                fullValue = fullValue.substring(0, 800) + (fullValue.length > 800 ? '...' : '');

                subParams.push({ label: labelText.trim(), value: fullValue.trim() });
            }
        }
    }

    allResults[sheetName] = subParams;
    console.log(`Found ${subParams.length} political sub-parameters for ${sheetName}`);
});

let mockData = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

targetSheets.forEach(sheetName => {
    let params = allResults[sheetName] || [];

    if (params.length > 0) {
        const lowerC = sheetName.toLowerCase() === 'phillipines' ? 'philippines' : sheetName.toLowerCase();
        const regex = new RegExp(`(export const ${lowerC}Data: CountryDetailData = \\{[\\s\\S]*?politicalSubParameters: \\[\n?)[\\s\\S]*?(\n?\\s*\\]\,\\n\\s*(?:leadershipQuote:|\\}\\,\n?\\s*sectionC:))`, 'g');

        let paramsString = params.map(p => `      { label: '${p.label.replace(/'/g, "\\'")}', value: '${p.value.replace(/'/g, "\\'")}' }`).join(',\n');

        let testMatch = mockData.match(regex);
        if (testMatch) {
            mockData = mockData.replace(regex, `$1${paramsString}$2`);
        } else {
            console.log(`Failed to match regex for ${sheetName}`);
        }
    }
});

fs.writeFileSync('src/components/dashboard/MockData.ts', mockData);
console.log('MockData updated.');
