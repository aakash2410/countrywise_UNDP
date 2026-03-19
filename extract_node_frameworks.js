const XLSX = require('xlsx');
const fs = require('fs');

try {
    const workbook = XLSX.readFile('Master Sheet I UNDP Digital Transformation Project I Artha Global I Kalpa Impact.xlsx');
    const sheetNames = workbook.SheetNames;
    console.log("Found sheets:", sheetNames);

    if (sheetNames.includes('New Framework')) {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets['New Framework']);
        fs.writeFileSync('new_framework.json', JSON.stringify(data, null, 2));
        console.log('Saved new_framework.json');
    }

    if (sheetNames.includes('Malaysian Framework')) {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets['Malaysian Framework']);
        fs.writeFileSync('malaysian_framework.json', JSON.stringify(data, null, 2));
        console.log('Saved malaysian_framework.json');
    }

    if (sheetNames.includes('Cambodian Framework')) {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets['Cambodian Framework']);
        fs.writeFileSync('cambodian_framework.json', JSON.stringify(data, null, 2));
        console.log('Saved cambodian_framework.json');
    }

} catch (e) {
    console.error("Error reading file:", e);
}
