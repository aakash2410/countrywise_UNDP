const XLSX = require('xlsx');
const fs = require('fs');

try {
    const workbook = XLSX.readFile('Master Sheet I UNDP Digital Transformation Project I Artha Global I Kalpa Impact.xlsx');
    const sheetNames = workbook.SheetNames;

    // Find the exact name of the updated framework sheet
    const frameworkSheetName = sheetNames.find(s => s.trim() === 'Updated Framework' || s.includes('Updated Framework'));

    if (frameworkSheetName) {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[frameworkSheetName]);
        fs.writeFileSync('new_framework.json', JSON.stringify(data, null, 2));
        console.log('Saved new_framework.json');
    }

} catch (e) {
    console.error("Error reading file:", e);
}
