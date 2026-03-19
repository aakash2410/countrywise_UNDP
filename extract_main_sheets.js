const XLSX = require('xlsx');
const fs = require('fs');

try {
    const workbook = XLSX.readFile('Master Sheet I UNDP Digital Transformation Project I Artha Global I Kalpa Impact.xlsx');
    const sheetNames = workbook.SheetNames;
    console.log("Found sheets:", sheetNames);

    if (sheetNames.includes('Malaysia')) {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets['Malaysia']);
        fs.writeFileSync('malaysia_main.json', JSON.stringify(data, null, 2));
        console.log('Saved malaysia_main.json');
    }

    if (sheetNames.includes('Cambodia')) {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets['Cambodia']);
        fs.writeFileSync('cambodia_main.json', JSON.stringify(data, null, 2));
        console.log('Saved cambodia_main.json');
    }

} catch (e) {
    console.error("Error reading file:", e);
}
