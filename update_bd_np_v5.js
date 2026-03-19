const fs = require('fs');

const mockDataPath = './src/components/dashboard/MockData.ts';
let mockData = fs.readFileSync(mockDataPath, 'utf8');

const bdJSON = require('./bangladesh_framework_v5.json');
const npJSON = require('./nepal_framework_v5.json');

const mapToCard = [
    { pNum: 'P1', hint: 'National AI Strategy / Policy Status', objKey: 'policy' },
    { pNum: 'P1', hint: 'AI Governance', objKey: 'governance' },
    { pNum: 'P1', hint: 'Data Protection', objKey: 'legislation' },
    { pNum: 'P1', hint: 'Government AI Initiatives', objKey: 'initiatives' },
    { pNum: 'P2', hint: 'Digital ID', objKey: 'digitalId' },
    { pNum: 'P2', hint: 'Digital Payments', objKey: 'payments' },
    { pNum: 'P2', hint: 'Data Exchange', objKey: 'dataExchange' }
];

const pMapStages = {
    P1: [
        { key: 'IMF AI Preparedness Index (AIPI)  (2023 dataset)', hint: 'IMF AI Preparedness' },
        { key: 'National AI Strategy / Policy Status', hint: 'National AI Strategy' },
        { key: 'AI Governance and Regulatory Frameworks and Ethical AI Principles', hint: 'AI Governance' },
        { key: 'Data Protection and Privacy Legislation', hint: 'Data Protection' },
        { key: 'Government AI Initiatives and Projects', hint: 'Government AI Initiatives' }
    ],
    P2: [
        { key: 'National Digital Transformation Strategy', hint: 'National Digital Transformation' },
        { key: 'Digital ID', hint: 'Digital ID' },
        { key: 'Digital Payments', hint: 'Digital Payments' },
        { key: 'Data Exchange', hint: 'Data Exchange' },
        { key: 'Use Cases of DPI Assets', hint: 'Use Cases' }
    ],
    P3: [
        { key: 'Electricity Access and Reliability', hint: 'Electricity' },
        { key: 'Internet Penetration', hint: 'Internet Penetration' },
        { key: 'Compute and Cloud Capacity', hint: 'Compute' },
        { key: 'Digital Inclusion', hint: 'Digital Inclusion' }
    ],
    P4: [
        { key: 'WB Worldwide Governance Indicators - Political Stability Score 2024', hint: 'Political Stability' },
        { key: 'Political stability and DT policy continuity (Requirement of KIIs)', hint: 'Political stability and DT' }
    ],
    P5: [
        { key: 'Lead Agency and Government Coordination', hint: 'Lead Agency' },
        { key: 'Private Sector Engagement', hint: 'Private Sector' },
        { key: 'Development Partners and MDBs', hint: 'Development Partners' },
        { key: 'Academic and Research Institutions', hint: 'Academic' },
        { key: 'Civil Society Engagement', hint: 'Civil Society' }
    ],
    P6: [
        { key: 'Domestic Public Budget for AI/DPI', hint: 'Domestic Public' }
    ]
};

function normalizeStage(stage) {
    if (!stage) return 'Open to Adopt';
    let s = stage.trim();
    if (s.toLowerCase() === 'early stage') return 'Early Success';
    // Clean spaces
    s = s.replace(/\s+/g, ' ');
    return s;
}

function updateCountry(countryName, jsonData) {
    let startMarker = `export const ${countryName.toLowerCase()}Data: CountryDetailData = {`;
    let endMarker = countryName.toLowerCase() === 'bangladesh' ? "export const nepalData: CountryDetailData = {" : "export const radarData = [";
    if (countryName.toLowerCase() === 'nepal') {
         // for any case we locate the structure ending. It usually is end of file or something else
         // safer to just capture to the end of that specific wrapper or interface closure
         // Bangladesh starts 699, Nepal starts 1113 from grep if I remmeber correctly?
         // Let's use search to be accurate
    }
    
    let startIdx = mockData.indexOf(startMarker);
    if (startIdx === -1) {
         console.warn(`Could not find start marker for ${countryName}`);
         return;
    }
    
    // We can just capture the full item before ParameterStages which is shared
    let chunk = mockData.substring(startIdx);
    // Find ParameterStages end or next block limit
    let limitIdx = countryName.toLowerCase() === 'bangladesh' ? mockData.indexOf("export const nepalData: CountryDetailData = {") : mockData.length;
    let actualChunk = mockData.substring(startIdx, limitIdx);

    function getRow(pNum, subParamHint) {
        return jsonData.find(r => r['P#'] === pNum && r['Sub-Parameter'] && r['Sub-Parameter'].toLowerCase().includes(subParamHint.toLowerCase()));
    }

    // 1. Update fullContext and status for major cards
    mapToCard.forEach(item => {
        let row = getRow(item.pNum, item.hint);
        if (row) {
            let contextText = row['Data points'] || row['Datapoints'] || "";
            // Clean up backslashes/quotes
            contextText = contextText.replace(/"/g, '\\"').replace(/\n/g, ' ').trim();
            
            let regexContext = new RegExp(`(${item.objKey}:\\s*{[\\s\\S]*?fullContext:\\s*")[^"]*(")`);
            actualChunk = actualChunk.replace(regexContext, `$1${contextText}$2`);
            
            let stage = normalizeStage(row['Bangladesh Maturity level'] || row['Nepal Maturity level'] || row['Categorisation ']);
            let regexStatus = new RegExp(`(${item.objKey}:\\s*{[\\s\\S]*?status:\\s*')[^']*(')`);
            actualChunk = actualChunk.replace(regexStatus, `$1${stage}$2`);
        }
    });

    // 2. Update parameterStages (Overall and SubParameters)
    for (let i = 1; i <= 6; i++) {
        let pNum = `P${i}`;
        let overallRow = jsonData.find(r => r['P#'] === pNum && r['Parameter scoring ']);
        if (overallRow) {
            let overallStage = normalizeStage(overallRow['Parameter scoring ']);
            let pBlockRegex = new RegExp(`(${pNum}:\\s*{[\\s\\S]*?parameterStage:\\s*')[^']*(')`);
            actualChunk = actualChunk.replace(pBlockRegex, `$1${overallStage}$2`);
        }
        
        let subParams = pMapStages[pNum];
        for (let sp of subParams) {
             let row = getRow(pNum, sp.hint);
             if (row) {
                 let stage = normalizeStage(row['Bangladesh Maturity level'] || row['Nepal Maturity level'] || row['Categorisation ']);
                 // To avoid key lookup mismatch of special spaces, we search subparams with Name regex matching
                 // Replaces with Regex ensuring correct stage is injected
                 let escapedKey = sp.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                 let spRegex = new RegExp(`({\\s*name:\\s*(?:'|")\\Q${sp.key}\\E(?:'|")[^}]*stage:\\s*(?:'|"))[^'"]*(?:'|")`);
                 if (actualChunk.match(spRegex)) {
                      actualChunk = actualChunk.replace(spRegex, `$1${stage}`);
                 } else {
                      // Fallback with just inclusive text search to see if key strings slightly differ
                      // The previous logic used specific replacements which might fail if key string contains newlines or \n
                 }
             }
        }
    }

    mockData = mockData.substring(0, startIdx) + actualChunk + mockData.substring(limitIdx);
}

// Bangladesh starts 699, Nepal starts around 1113
const bdStart = mockData.indexOf("export const bangladeshData: CountryDetailData = {");
const npStart = mockData.indexOf("export const nepalData: CountryDetailData = {");

if (bdStart !== -1 && npStart !== -1) {
    updateCountry('Bangladesh', bdJSON);
    updateCountry('Nepal', npJSON);
}

fs.writeFileSync(mockDataPath, mockData);
console.log('Successfully updated Bangladesh and Nepal data from framework.');
