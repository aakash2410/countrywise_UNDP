const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const filePath = '/Users/aakashsangani/Downloads/Master Sheet I UNDP Digital Transformation Project I Artha Global I Kalpa Impact-5.xlsx';

if (fs.existsSync(filePath)) {
    const workbook = xlsx.readFile(filePath);
    console.log('Available sheets:', workbook.SheetNames);
} else {
    console.log('File not found at:', filePath);
}
