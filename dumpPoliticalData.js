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

                subParams.push({ label: labelText.trim(), value: fullValue.trim() });
            }
        }
    }

    allResults[sheetName] = subParams;
});

fs.writeFileSync('raw_political_data.json', JSON.stringify(allResults, null, 2));
console.log('Dumped to raw_political_data.json');
