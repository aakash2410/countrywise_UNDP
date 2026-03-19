const fs = require('fs');

const dataPath = 'philippines_framework.json';
const mockDataPath = 'src/components/dashboard/MockData.ts';

if (!fs.existsSync(dataPath)) {
    console.error("Missing JSON extracted data.");
    process.exit(1);
}

const rows = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
let mockData = fs.readFileSync(mockDataPath, 'utf8');

// Find Philippines data start
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
    
    // Fallback based on text match for "Stage" or explicit match
    if (clean.toLowerCase().includes("early success") || clean.toLowerCase().includes("early stage")) return "Early Success";
    return "Open to Adopt";
}

// 1. Update Ecosystem Cards Status & Context
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
        const cleanContext = row['Phillipines- Datapoints'] ? row['Phillipines- Datapoints'].trim().replace(/"/g, '\\"') : '';
        
        console.log(`Updating Card ${key}: status -> ${cleanStatus}`);
        
        const cardRegex = new RegExp(`(${key}:\\s*{[\\s\\S]*?status:\\s*')[^']*(')`);
        chunk = chunk.replace(cardRegex, `$1${cleanStatus}$2`);
        
        if (cleanContext) {
            const contextRegex = new RegExp(`(${key}:\\s*{[\\s\\S]*?fullContext:\\s*")[^"]*(")`);
            chunk = chunk.replace(contextRegex, `$1${cleanContext}$2`);
        }
    }
}

// 2. Update Subparameters inside parameterStages
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
        { key: 'Use Cases of DPI Assets', hint: 'Use Cases' }
    ]
    // Add other Ps if needed
};

for (const [pNum, subParams] of Object.entries(pMapStages)) {
    subParams.forEach(sp => {
        const row = getRow(pNum, sp.hint);
        if (row) {
            const cleanStatus = mapStatus(row['Categorisation ']);
            console.log(`Updating SubParam ${sp.key}: stage -> ${cleanStatus}`);
            
            const spRegex = new RegExp(`name:\\s*['"]${sp.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"][\\s\\S]*?stage:\\s*['"]([^'"]+)['"]`);
            if (chunk.match(spRegex)) {
                chunk = chunk.replace(spRegex, (match) => {
                    return match.replace(/stage:\s*['"][^'"]+['"]/, `stage: '${cleanStatus}'`);
                });
            } else {
                console.log(`Subparameter ${sp.key} could not be matched via regex in Philippines`);
            }
        }
    });
}

mockData = mockData.substring(0, startIdx) + chunk + mockData.substring(endIdx);

// 3. Update Radar Chart scores
const radarParams = {
    'AI Ecosystem': 'P1',
    'DPI Ecosystem': 'P2',
    'Digital-Physical Infrastructure': 'P3', // usually just Digital Infra or matching name
    'Political Stability': 'P4',
    'Stakeholder Participation': 'P5',
    'Funding Landscape': 'P6'
};

const radarScores = {
    'AI Ecosystem': 3,
    'DPI Ecosystem': 3,
    'Digital-Physical Infrastructure': 3,
    'Political Stability': 3,
    'Stakeholder Participation': 3,
    'Funding Landscape': 3
};

// Calculate averages or grab overall scores if they have high-level parameter Scoring nodes
// Actually, looking at the dump, some rows have P# like P1 only, with average scores implicitly given or we can average the Subparams.
// Let's print out the scores for radarData to keep it consistent.
// Write back updated mock data first to keep subparameters aligned.
fs.writeFileSync(mockDataPath, mockData);
console.log('Successfully applied Philippines updates formulation.');
