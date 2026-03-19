const fs = require('fs');

let mockDataStr = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');
const myFramework = JSON.parse(fs.readFileSync('malaysian_framework.json', 'utf8'));
const khFramework = JSON.parse(fs.readFileSync('cambodian_framework.json', 'utf8'));

// The new framework has 6 parameters: P1...P6.
// Not all rows have a 'Score' field. We will extract 'Score' or try to parse numeric from 'Categorisation ' or 'Sub-Parameter stage'.
// Wait, Cambodian framework doesn't have a 'Score' integer field, it has 'Sub-Parameter stage' like 'Early Success' or 'Maturing'.
// Let's create a mapper function that maps the string "Stage" to a 1-5 integer.

function getScore(text) {
    if (!text) return null;
    let t = text.toString().toLowerCase();
    if (t.includes('greenfield') || t.includes('stage 1')) return 1;
    if (t.includes('open to adopt') || t.includes('stage 2') || t.includes('open')) return 2;
    if (t.includes('early success') || t.includes('stage 3')) return 3;
    if (t.includes('maturing') || t.includes('maturity') || t.includes('stage 4')) return 4;
    if (t.includes('role model') || t.includes('stage 5')) return 5;
    return null;
}

function calculateAverageScores(framework) {
    const scores = { 'P1': [], 'P2': [], 'P3': [], 'P4': [], 'P5': [], 'P6': [] };

    framework.forEach(f => {
        const pNum = f['P#'];
        if (pNum && scores[pNum]) {
            let sc = f['Score'] ? parseInt(f['Score']) : null;
            if (!sc) sc = getScore(f['Parameter Stage']);
            if (!sc) sc = getScore(f['Sub-Parameter stage']);
            if (!sc) sc = getScore(f['Categorisation ']);

            if (sc) scores[pNum].push(sc);
        }
    });

    const averages = {};
    for (const [p, vals] of Object.entries(scores)) {
        if (vals.length > 0) {
            averages[p] = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
        } else {
            averages[p] = 3; // fallback
        }
    }
    return averages;
}

const myAvg = calculateAverageScores(myFramework);
const khAvg = calculateAverageScores(khFramework);

console.log("Malaysia Average Scores: ", myAvg);
console.log("Cambodia Average Scores: ", khAvg);

// We need to update radarData in MockData.ts
// It looks like:
// { parameter: 'AI Ecosystem Maturity', Malaysia: 3, Cambodia: 3, Philippines: 3, Bangladesh: 2, Nepal: 0, fullMark: 5 },
// P1 -> AI Ecosystem Maturity
// P2 -> DPI Ecosystem Maturity
// P3 -> Digital Infra Availability
// P4 -> Political Stability
// P5 -> Stakeholder Participation
// P6 -> Funding Landscape

const mapping = [
    { name: 'AI Ecosystem Maturity', p: 'P1' },
    { name: 'DPI Ecosystem Maturity', p: 'P2' },
    { name: 'Digital Infra Availability', p: 'P3' },
    { name: 'Political Stability', p: 'P4' },
    { name: 'Stakeholder Participation', p: 'P5' },
    { name: 'Funding Landscape', p: 'P6' },
];

mapping.forEach(m => {
    const myVal = myAvg[m.p];
    const khVal = khAvg[m.p];

    // Create regex to find the object for this parameter in radarData
    const regex = new RegExp(`({ parameter: '${m.name}', Malaysia: )[0-9]+(, Cambodia: )[0-9]+(,)`);
    mockDataStr = mockDataStr.replace(regex, `$1${myVal}$2${khVal}$3`);
});

fs.writeFileSync('src/components/dashboard/MockData.ts', mockDataStr);
console.log("RadarChart scores successfully updated in MockData.ts");
