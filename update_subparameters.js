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
        { key: 'IMF AI Preparedness Index (AIPI)', hint: 'IMF AI Preparedness' },
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
    s = s.replace(/\s+/g, ' ');
    return s;
}

function updateCountry(countryName, jsonData) {
    let startMarker = `export const ${countryName.toLowerCase()}Data: CountryDetailData = {`;
    let endMarker = countryName.toLowerCase() === 'bangladesh' ? "export const nepalData: CountryDetailData = {" : "export const radarData = [";
    
    let startIdx = mockData.indexOf(startMarker);
    if (startIdx === -1) {
         console.warn(`Could not find start marker for ${countryName}`);
         return;
    }
    
    let chunk = mockData.substring(startIdx);
    let limitIdx = mockData.indexOf(endMarker, startIdx + 1);
    if (limitIdx === -1) limitIdx = mockData.length;
    let actualChunk = mockData.substring(startIdx, limitIdx);

    function getRow(pNum, subParamHint) {
        return jsonData.find(r => r['P#'] === pNum && r['Sub-Parameter'] && r['Sub-Parameter'].toLowerCase().includes(subParamHint.toLowerCase()));
    }

    // Update ParameterStages Subparameters securely
    for (let i = 1; i <= 6; i++) {
        let pNum = `P${i}`;
        let subParams = pMapStages[pNum] || [];
        
        for (let sp of subParams) {
             let row = getRow(pNum, sp.hint);
             if (row) {
                 let stage = normalizeStage(row['Bangladesh Maturity level'] || row['Nepal Maturity level'] || row['Categorisation ']);
                 let escapedKey = sp.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                 
                 // Standard Regex to match: { name: "...", stage: "..." }
                 let spRegex = new RegExp(`({\\s*name:\\s*(?:'|")` + escapedKey + `(?:'|")[^}]*stage:\\s*(?:'|"))([^'"]*)`, 'g');
                 
                 if (actualChunk.match(spRegex)) {
                      actualChunk = actualChunk.replace(spRegex, `$1${stage}`);
                      console.log(`Updated subparameter ${sp.key} to ${stage}`);
                 } else {
                      // Some keys might match on smaller hints if exact name matches slightly fail
                      console.log(`Subparameter ${sp.key} could not be matched via regex in ${countryName}`);
                 }
             }
        }
    }

    mockData = mockData.substring(0, startIdx) + actualChunk + mockData.substring(limitIdx);
}

const bdStart = mockData.indexOf("export const bangladeshData: CountryDetailData = {");
const npStart = mockData.indexOf("export const nepalData: CountryDetailData = {");

if (bdStart !== -1 && npStart !== -1) {
    updateCountry('Bangladesh', bdJSON);
    updateCountry('Nepal', npJSON);
}

fs.writeFileSync(mockDataPath, mockData);
console.log('Successfully synchronized subparameters for Bangladesh and Nepal.');
