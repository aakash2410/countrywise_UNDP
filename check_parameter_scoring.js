const fs = require('fs');

const rows = JSON.parse(fs.readFileSync('philippines_framework.json', 'utf8'));

const pNumMap = {
    'P1': 'AI Ecosystem',
    'P2': 'DPI Ecosystem',
    'P3': 'Digital-Physical Infrastructure',
    'P4': 'Political Stability and Governance',
    'P5': 'Stakeholder Participation',
    'P6': 'Funding Landscape'
};

const scores = {};

rows.forEach(r => {
    const pNum = r['P#'] ? r['P#'].toString().trim() : '';
    const paramScoring = r['Parameter scoring '] ? r['Parameter scoring '].toString().trim() : '';
    
    if (pNumMap[pNum] && paramScoring && !scores[pNum]) {
        scores[pNum] = paramScoring;
    }
});

console.log('--- Parameter scoring Column Values ---');
for (const [pNum, label] of Object.entries(pNumMap)) {
    console.log(`${label} (${pNum}): ${scores[pNum] || 'Not Found'}`);
}
