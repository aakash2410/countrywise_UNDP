const XLSX = require('xlsx');
const fs = require('fs');

try {
    const workbook = XLSX.readFile('Master Sheet I UNDP Digital Transformation Project I Artha Global I Kalpa Impact-2.xlsx');
    const sheetNames = workbook.SheetNames;
    console.log("Found sheets:", sheetNames);

    // Extract all relevant sheets
    const targets = {
        'Malaysia': 'malaysia_v2.json',
        'Malaysian Framework': 'malaysian_framework_v2.json',
        'Cambodia': 'cambodia_v2.json',
        'Cambodian Framework': 'cambodian_framework_v2.json',
        'Phillipines': 'philippines_v2.json',
        'Philippines': 'philippines_v2.json',
        'Phillipines Framework': 'philippines_framework_v2.json',
        'Philippines Framework': 'philippines_framework_v2.json',
        'New Framework': 'new_framework_v2.json',
        'Updated Framework ': 'updated_framework_v2.json',
    };

    sheetNames.forEach(name => {
        // Try exact match first
        if (targets[name]) {
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[name]);
            fs.writeFileSync(targets[name], JSON.stringify(data, null, 2));
            console.log(`Saved ${targets[name]} from sheet "${name}"`);
        }
        // Also try trimmed match
        const trimmed = name.trim();
        if (targets[trimmed] && trimmed !== name) {
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[name]);
            fs.writeFileSync(targets[trimmed], JSON.stringify(data, null, 2));
            console.log(`Saved ${targets[trimmed]} from sheet "${name}" (trimmed)`);
        }
    });

} catch (e) {
    console.error("Error reading file:", e);
}
