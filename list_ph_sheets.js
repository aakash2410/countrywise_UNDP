const xlsx = require('xlsx');

const workbook = xlsx.readFile('/Users/aakashsangani/Downloads/Phillipines Framework.xlsx');
console.log('Sheets:', workbook.SheetNames);
