const fs = require('fs');
const xlsx = require('xlsx');

const wb = xlsx.readFile('Master Sheet I UNDP Digital Transformation Project I Artha Global I Kalpa Impact.xlsx');
const sheet = wb.Sheets['Malaysia'];
if (!sheet) process.exit(1);

const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

let output = '';
for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (!row || !Array.isArray(row)) continue;

    // Just dump the first 6 columns if there is any data
    const hasData = row.slice(0, 6).some(cell => cell !== undefined && cell !== null && cell !== '');
    if (hasData) {
        output += `Row ${i}: ` + row.slice(0, 6).map(c => String(c).replace(/\n/g, ' ').substring(0, 100)).join(' | ') + '\n';
    }
}

fs.writeFileSync('dump_all_questions.txt', output);
console.log('Dumped to dump_all_questions.txt');
