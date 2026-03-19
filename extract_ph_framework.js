const xlsx = require('xlsx');
const fs = require('fs');

const workbook = xlsx.readFile('/Users/aakashsangani/Downloads/Phillipines Framework.xlsx');
const sheet = workbook.Sheets['Philippines Framework'];
const data = xlsx.utils.sheet_to_json(sheet);

fs.writeFileSync('philippines_framework.json', JSON.stringify(data, null, 2));
console.log('Extracted', data.length, 'rows to philippines_framework.json');
