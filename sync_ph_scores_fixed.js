const fs = require('fs');

const dataPath = 'philippines_framework.json';
const mockDataPath = 'src/components/dashboard/MockData.ts';

if (!fs.existsSync(dataPath)) {
    console.error("Missing JSON extracted data.");
    process.exit(1);
}

const rows = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
let mockData = fs.readFileSync(mockDataPath, 'utf8');

const startMarker = "export const philippinesData: CountryDetailData = {";
const endMarker = "export const bangladeshData: CountryDetailData = {";

let startIdx = mockData.indexOf(startMarker);
let endIdx = mockData.indexOf(endMarker);

if (startIdx === -1) {
    console.error("Could not find Philippines data boundaries.");
    process.exit(1);
}

let chunk = mockData.substring(startIdx, endIdx);

function getRow(pNum, subParamHint) {
    return rows.find(r => {
        const rP = r['P#'] ? r['P#'].toString().trim() : '';
        const rSub = r['Sub-Parameter'] ? r['Sub-Parameter'].toString().trim() : '';
        if (rP !== pNum) return false;
        if (subParamHint && !rSub.toLowerCase().includes(subParamHint.toLowerCase())) return false;
        return true;
    });
}

function mapStatus(categorisation) {
    if (!categorisation) return "Open to Adopt";
    const clean = categorisation.split('\n')[0].trim().replace(/\s+/g, ' ');
    if (clean.includes("Greenfield") || clean.includes("No Activity")) return "Greenfield";
    if (clean.includes("Open to Adopt") || clean.includes("Intent") || clean.includes("Planning")) return "Open to Adopt";
    if (clean.includes("Early Success") || clean.includes("Strategy") || clean.includes("Early Stage")) return "Early Success";
    if (clean.includes("Maturing") || clean.includes("Implementation")) return "Maturing";
    if (clean.includes("Role Model") || clean.includes("Leadership")) return "Role Model";
    
    if (clean.toLowerCase().includes("early success") || clean.toLowerCase().includes("early stage")) return "Early Success";
    return "Open to Adopt";
}

const cardMaps = {
    'digitalId': { pNum: 'P2', hint: 'Digital ID' },
    'payments': { pNum: 'P2', hint: 'Digital Payments' },
    'dataExchange': { pNum: 'P2', hint: 'Data Exchange' },
    'policy': { pNum: 'P1', hint: 'Strategy' },
    'governance': { pNum: 'P1', hint: 'Governance' },
    'legislation': { pNum: 'P1', hint: 'Data Protection' },
    'initiatives': { pNum: 'P1', hint: 'Initiatives' }
};

for (const [key, map] of Object.entries(cardMaps)) {
    const row = getRow(map.pNum, map.hint);
    if (row) {
        const cleanStatus = mapStatus(row['Categorisation ']);
        // ESCAPING NEWLINES WITH \\n TO PREVENT LINT ERRORS
        const cleanContext = row['Phillipines- Datapoints'] ? row['Phillipines- Datapoints'].trim().replace(/"/g, '\\"').replace(/\n/g, '\\n') : '';
        
        console.log(`Updating Card ${key}: status -> ${cleanStatus}`);
        
        const cardRegex = new RegExp(`(${key}:\\s*{[\\s\\S]*?status:\\s*')[^']*(')`);
        chunk = chunk.replace(cardRegex, `$1${cleanStatus}$2`);
        
        if (cleanContext) {
            const contextRegex = new RegExp(`(${key}:\\s*{[\\s\\S]*?fullContext:\\s*")[^"]*(")`);
            chunk = chunk.replace(contextRegex, `$1${cleanContext}$2`);
        }
    }
}

const pMapStages = {
    P1: [
        { key: 'IMF AI Preparedness Index (AIPI)', hint: 'IMF AI Preparedness' },
        { key: 'National AI Strategy / Policy Status', hint: 'Strategy' },
        { key: 'AI Governance & Ethical AI Principles', hint: 'Governance' },
        { key: 'Data Protection & Privacy Legislation', hint: 'Data Protection' },
        { key: 'Government AI Initiatives & Projects', hint: 'Initiatives' }
    ],
    P2: [
        { key: 'National Digital Transformation Strategy', hint: 'National Digital Transformation' },
        { key: 'Digital ID', hint: 'Digital ID' },
        { key: 'Digital Payments', hint: 'Digital Payments' },
        { key: 'Data Exchange', hint: 'Data Exchange' },
        { name: 'Use Cases of DPI Assets', hint: 'Use Cases' }
    ]
};

for (const [pNum, subParams] of Object.entries(pMapStages)) {
    subParams.forEach(sp => {
        const row = getRow(pNum, sp.hint);
        if (row) {
            const cleanStatus = mapStatus(row['Categorisation ']);
            const paramKey = sp.key || sp.name;
            console.log(`Updating SubParam ${paramKey}: stage -> ${cleanStatus}`);
            
            const spRegex = new RegExp(`name:\\s*['"]${paramKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"][\\s\\S]*?stage:\\s*['"]([^'"]+)['"]`);
            if (chunk.match(spRegex)) {
                chunk = chunk.replace(spRegex, (match) => {
                    return match.replace(/stage:\s*['"][^'"]+['"]/, `stage: '${cleanStatus}'`);
                });
            } else {
                console.log(`Subparameter ${paramKey} could not be matched via regex in Philippines`);
            }
        }
    });
}

mockData = mockData.substring(0, startIdx) + chunk + mockData.substring(endIdx);

// Update Radar Data explicitly at line indices
mockData = mockData.replace(
    /\{ parameter: 'DPI Ecosystem Maturity', Malaysia: 3, Cambodia: 4, Philippines: 4, Bangladesh: 3, Nepal: 4, fullMark: 5 \}/,
    `{ parameter: 'DPI Ecosystem Maturity', Malaysia: 3, Cambodia: 4, Philippines: 3, Bangladesh: 3, Nepal: 4, fullMark: 5 }`
);
mockData = mockData.replace(
    /\{ parameter: 'Political Stability', Malaysia: 4, Cambodia: 4, Philippines: 4, Bangladesh: 2, Nepal: 2, fullMark: 5 \}/,
    `{ parameter: 'Political Stability', Malaysia: 4, Cambodia: 4, Philippines: 3, Bangladesh: 2, Nepal: 2, fullMark: 5 }`
);
mockData = mockData.replace(
    /\{ parameter: 'Funding Landscape', Malaysia: 3, Cambodia: 2, Philippines: 4, Bangladesh: 3, Nepal: 1, fullMark: 5 \}/,
    `{ parameter: 'Funding Landscape', Malaysia: 3, Cambodia: 2, Philippines: 3, Bangladesh: 3, Nepal: 1, fullMark: 5 }`
);

fs.writeFileSync(mockDataPath, mockData);
console.log('Successfully applied Philippines updates and fixed Radar (Fixed indexing).');
