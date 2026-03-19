const xlsx = require('xlsx');

const wb = xlsx.readFile('Master Sheet I UNDP Digital Transformation Project I Artha Global I Kalpa Impact.xlsx');
const targetSheets = ['Malaysia', 'Cambodia', 'Phillipines', 'Bangladesh', 'Nepal'];

targetSheets.forEach(sheetName => {
    const sheet = wb.Sheets[sheetName];
    if (!sheet) return;

    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    console.log(`\n\n--- ${sheetName} ---`);
    let startIndex = -1;
    for (let i = 0; i < data.length; i++) {
        const rowStr = data[i].join(' ').toLowerCase();
        if (rowStr.includes('political stability and institutional capacity')) {
            startIndex = i;
            break;
        }
    }

    if (startIndex !== -1) {
        for (let i = startIndex; i < startIndex + 15; i++) {
            if (!data[i]) break;
            console.log(`Row ${i}:`, data[i]);
        }
    } else {
        console.log("NOT FOUND");
    }
});
