const xlsx = require('xlsx');
const fs = require('fs');

const workbook = xlsx.readFile('Master Sheet I UNDP Digital Transformation Project I Artha Global I Kalpa Impact-4.xlsx');
const sheetName = 'Philippines Framework';
const sheet = workbook.Sheets[sheetName];
if(sheet) {
    const data = xlsx.utils.sheet_to_json(sheet);
    fs.writeFileSync('philippines_framework_v4.json', JSON.stringify(data, null, 2));
    console.log('Saved to philippines_framework_v4.json. Extracted', data.length, 'rows');
} else {
    console.log('Sheet not found. Available sheets:', workbook.SheetNames);
}
