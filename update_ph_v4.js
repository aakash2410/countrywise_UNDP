const fs = require('fs');

const mockDataPath = './src/components/dashboard/MockData.ts';
let mockData = fs.readFileSync(mockDataPath, 'utf8');

const phJSON = require('./philippines_framework_v4.json');

// --- Helper functions to extract from JSON ---
function getRow(pNum, subParamHint) {
    return phJSON.find(r => r['P#'] === pNum && r['Sub-Parameter'] && r['Sub-Parameter'].toLowerCase().includes(subParamHint.toLowerCase()));
}

function getPScore(pNum) {
    const row = phJSON.find(r => r['P#'] === pNum && r['Parameter scoring ']);
    if (row && row['Score']) return row['Score'];
    return null;
}

// 1. Radar Data Upload
const pMap = {
    P1: 'AI Ecosystem',
    P2: 'DPI Ecosystem',
    P3: 'Digital Infra',
    P4: 'Political Context',
    P5: 'Stakeholders',
    P6: 'Funding Landscape'
};

let radarPattern = /export const radarData = \[\s+([\s\S]+?)\s+\];/;
let radarMatch = mockData.match(radarPattern);
if(radarMatch) {
    let radarArrStr = radarMatch[1];
    
    // update Philippines score in radarData
    for(let i=1; i<=6; i++) {
        let pNum = `P${i}`;
        let score = getPScore(pNum);
        if(score) {
            let pName = pMap[pNum];
            let paramRegex = new RegExp(`({[^}]*parameter:\\s*(?:'|")${pName}(?:'|")[^}]*)Philippines:\\s*\\d+(.*})`);
            radarArrStr = radarArrStr.replace(paramRegex, `$1Philippines: ${score}$2`);
        }
    }
    mockData = mockData.replace(radarMatch[1], radarArrStr);
}


// --- 2. Update Philippines Data Block ---

const pMapStages = {
    P1: [
        { key: 'National AI Strategy / Policy Status', hint: 'National AI strategy' },
        { key: 'AI Governance & Ethical AI Principles', hint: 'AI Governance' },
        { key: 'Data Protection & Privacy Legislation', hint: 'Data Protection' },
        { key: 'Government AI Initiatives & Projects', hint: 'Government AI Initiatives' }
    ],
    P2: [
        { key: 'National Digital Transformation Strategy', hint: 'National Digital Transformation' },
        { key: 'Digital ID', hint: 'Digital ID' },
        { key: 'Digital Payments', hint: 'Digital Payments' },
        { key: 'Data Exchange', hint: 'Data Exchange' },
        { key: 'Use Cases of DPI Assets', hint: 'Use Cases' }
    ],
    P3: [
        { key: 'Electricity Access & Reliability', hint: 'Electricity' },
        { key: 'Internet Penetration', hint: 'Internet Penetration' },
        { key: 'Compute & Cloud Capacity', hint: 'Compute' }
    ],
    P4: [
        { key: 'WB Political Stability Score (2024)', hint: 'Political Stability' },
        { key: 'Strategic & Long-term Subjective Call', hint: 'Strategic' }
    ],
    P5: [
        { key: 'Lead Agency & Govt Coordination', hint: 'Lead Agency' },
        { key: 'Private Sector Engagement', hint: 'Private Sector' },
        { key: 'Development Partners & MDBs', hint: 'Development Partners' },
        { key: 'Academic & Research Institutions', hint: 'Academic' },
        { key: 'Civil Society Engagement', hint: 'Civil Society' }
    ],
    P6: [
        { key: 'Domestic Public Budget for AI/DPI', hint: 'Domestic Public' }
    ]
};

const mapToCard = {
    'National AI strategy': 'policy',
    'AI Governance': 'governance',
    'Data Protection': 'legislation',
    'Government AI Initiatives': 'initiatives',
    'Digital ID': 'digitalId',
    'Digital Payments': 'payments',
    'Data Exchange': 'dataExchange'
};

function updateFullContexts(codeStr) {
    let lines = codeStr.split('\n');
    let inPhBlock = false;
    let currentBlock = '';
    let currentObj = '';
    
    // We will use regex replacements on the Philippines chunk to be safe
    let phStart = codeStr.indexOf("export const philippinesData: CountryDetailData = {");
    let bgStart = codeStr.indexOf("export const bangladeshData: CountryDetailData = {"); // Next object
    
    let phChunk = codeStr.substring(phStart, bgStart);
    
    // UPDATE DPI and AI Ecosystem fullContext
    for (const [hint, objKey] of Object.entries(mapToCard)) {
        let pNum = ['National AI strategy', 'AI Governance', 'Data Protection', 'Government AI Initiatives'].includes(hint) ? 'P1' : 'P2';
        let row = getRow(pNum, hint);
        if(row && row['Phillipines- Datapoints']) {
            let newText = row['Phillipines- Datapoints'].replace(/"/g, '\\"').replace(/\n/g, ' ');
            let regex = new RegExp(`(${objKey}:\\s*{[\\s\\S]*?fullContext:\\s*")[^"]*(")`, 'g');
            // ensure it replaces correctly in the chunk
            phChunk = phChunk.replace(regex, `$1${newText}$2`);
        }
    }
    
    // UPDATE Parameter Stages
    for(let i=1; i<=6; i++) {
        let pNum = `P${i}`;
        let subParams = pMapStages[pNum];
        let overallScoreRow = phJSON.find(r => r['P#'] === pNum && r['Parameter scoring ']);
        let overallStage = overallScoreRow ? overallScoreRow['Categorisation '].trim() : 'Maturing';
        if (overallStage.toLowerCase() === 'early stage') overallStage = 'Early Success';
        
        let pBlockRegex = new RegExp(`(${pNum}:\\s*{[\\s\\S]*?parameterStage:\\s*')[^']*(')`);
        phChunk = phChunk.replace(pBlockRegex, `$1${overallStage}$2`);
        
        for(let sp of subParams) {
            let row = getRow(pNum, sp.hint);
            if(row && row['Categorisation ']) {
                let stage = row['Categorisation '].trim();
                if (stage.toLowerCase() === 'early stage') stage = 'Early Success';
                let spRegex = new RegExp(`({\\s*name:\\s*'${sp.key}'[^}]*stage:\\s*')[^']*(')`);
                phChunk = phChunk.replace(spRegex, `$1${stage}$2`);
            }
        }
    }
    
    // UPDATE SECTION D
    // We'll read section D risks, opps, partnerships directly from the JSON.
    let risks = [];
    let opps = [];
    let parts = [];
    
    let currentD = null;
    for(let r of phJSON) {
        if(r['P#'] === 'Potential Risks') { currentD = risks; continue; }
        if(r['P#'] === 'Emerging Opportunities') { currentD = opps; continue; }
        if(r['P#'] === 'Partnerships') { currentD = parts; continue; }
        
        if(currentD && r['P#'] && !/^P\d/.test(r['P#']) && r['P#'].length > 20) {
            currentD.push(r['P#'].trim());
        }
    }
    
    if(risks.length || opps.length || parts.length) {
        let sectionDRegex = /(sectionD:\s*{[\s\S]*?opportunities:\s*\[)([\s\S]*?)(\],[\s\S]*?risks:\s*\[)([\s\S]*?)(\],[\s\S]*?partnerships:\s*\[)([\s\S]*?)(\]\s*})/m;
        
        let oppsStr = opps.map((o, i) => `\n      { id: 'ph-o${i+1}', text: '${o.replace(/'/g, "\\'")}' },`).join('') + '\n    ';
        let risksStr = risks.map((r, i) => `\n      { id: 'ph-r${i+1}', text: '${r.replace(/'/g, "\\'")}' },`).join('') + '\n    ';
        let partsStr = parts.map((p, i) => `\n      { id: 'ph-p${i+1}', text: '${p.replace(/'/g, "\\'")}' },`).join('') + '\n    ';
        
        phChunk = phChunk.replace(sectionDRegex, `$1${oppsStr}$3${risksStr}$5${partsStr}$7`);
    }
    
    return codeStr.substring(0, phStart) + phChunk + codeStr.substring(bgStart);
}

mockData = updateFullContexts(mockData);
fs.writeFileSync(mockDataPath, mockData);
console.log('Successfully patched MockData.ts with updated Philippines info.');
