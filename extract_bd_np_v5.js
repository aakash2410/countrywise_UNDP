const xlsx = require('xlsx');
const fs = require('fs');

const filePath = '/Users/aakashsangani/Downloads/Master Sheet I UNDP Digital Transformation Project I Artha Global I Kalpa Impact-5.xlsx';
const workbook = xlsx.readFile(filePath);

function extractSheet(sheetName, outputFile) {
    const sheet = workbook.Sheets[sheetName];
    if (sheet) {
        let data = xlsx.utils.sheet_to_json(sheet);
        // Normalize keys/values to be safe
        fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
        console.log(`Saved ${outputFile}. Extracted ${data.length} rows`);
    } else {
        console.log(`Sheet "${sheetName}" not found`);
    }
}

extractSheet('Bangladesh Framework', 'bangladesh_framework_v5.json');
extractSheet('Nepal Framework ', 'nepal_framework_v5.json'); // with trailing space
