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

const sums = {};
const counts = {};

rows.forEach(r => {
    const pNum = r['P#'] ? r['P#'].toString().trim() : '';
    if (pNumMap[pNum]) {
        const score = parseFloat(r['Score']);
        if (!isNaN(score)) {
            if (!sums[pNum]) {
                sums[pNum] = 0;
                counts[pNum] = 0;
            }
            sums[pNum] += score;
            counts[pNum] += 1;
        }
    }
});

console.log('--- Averages ---');
for (const [pNum, label] of Object.entries(pNumMap)) {
    const avg = sums[pNum] ? (sums[pNum] / counts[pNum]).toFixed(2) : 0;
    console.log(`${label} (${pNum}): ${avg}`);
}
console.log('--- Debug ---');
// console.log(sums, counts);
