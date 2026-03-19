const fs = require('fs');

const mockDataPath = './src/components/dashboard/MockData.ts';
let mockData = fs.readFileSync(mockDataPath, 'utf8');
const phJSON = require('./philippines_framework_v4.json');

// Get row helper
function getRow(pNum, subParamHint) {
    return phJSON.find(r => r['P#'] === pNum && r['Sub-Parameter'] && r['Sub-Parameter'].toLowerCase().includes(subParamHint.toLowerCase()));
}

const mapToCard = [
    { pNum: 'P1', hint: 'National AI strategy', objKey: 'policy' },
    { pNum: 'P1', hint: 'AI Governance', objKey: 'governance' },
    { pNum: 'P1', hint: 'Data Protection', objKey: 'legislation' },
    { pNum: 'P1', hint: 'Government AI Initiatives', objKey: 'initiatives' },
    { pNum: 'P2', hint: 'Digital ID', objKey: 'digitalId' },
    { pNum: 'P2', hint: 'Digital Payments', objKey: 'payments' },
    { pNum: 'P2', hint: 'Data Exchange', objKey: 'dataExchange' }
];

const phStart = mockData.indexOf("export const philippinesData: CountryDetailData = {");
const bgStart = mockData.indexOf("export const bangladeshData: CountryDetailData = {");
if (phStart === -1 || bgStart === -1) {
    console.error("Could not find Philippines data block.");
    process.exit(1);
}

let phChunk = mockData.substring(phStart, bgStart);

console.log("Updating card statuses based on JSON...");

mapToCard.forEach(item => {
    let row = getRow(item.pNum, item.hint);
    if (row && row['Categorisation ']) {
        let stage = row['Categorisation '].trim();
        // Force "Early Stage" -> "Early Success" for UI consistency
        if (stage.toLowerCase() === 'early stage') {
            stage = 'Early Success';
        }
        
        console.log(`Updating ${item.objKey} to status: ${stage}`);
        
        // The regex looks for objKey: { ... title: '...', status: 'OldStatus', ... }
        // We'll capture everything up to status: ' and replace the value
        let regex = new RegExp(`(${item.objKey}:\\s*{[^{]*?status:\\s*')[^']*(')`, 'g');
        phChunk = phChunk.replace(regex, `$1${stage}$2`);
    } else {
        console.warn(`Could not find data for ${item.hint} in JSON.`);
    }
});

mockData = mockData.substring(0, phStart) + phChunk + mockData.substring(bgStart);
fs.writeFileSync(mockDataPath, mockData);
console.log('Successfully synchronized UI card statuses for Philippines.');
