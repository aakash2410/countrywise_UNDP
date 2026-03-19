// Extract all parameter and sub-parameter stages from each framework
const fs = require('fs');

const my = JSON.parse(fs.readFileSync('malaysian_framework_v2.json', 'utf8'));
const kh = JSON.parse(fs.readFileSync('cambodian_framework_v2.json', 'utf8'));
const ph = JSON.parse(fs.readFileSync('philippines_framework_v2.json', 'utf8'));

function normalizeStage(raw) {
    if (!raw || raw === '-') return null;
    const s = raw.toString().toLowerCase().trim();
    if (s.includes('greenfield') || s === '1') return 'Greenfield';
    if (s.includes('open to adopt') || s.includes('open') || s === '2') return 'Open to Adopt';
    if (s.includes('early success') || s.includes('early stage') || s === '3') return 'Early Success';
    if (s.includes('maturing') || s.includes('maturity') || s === '4') return 'Maturing';
    if (s.includes('role model') || s === '5') return 'Role Model';
    return null;
}

function extractStages(framework, contextKey, catKey) {
    const result = {};
    framework.forEach(row => {
        const pNum = row['P#'];
        if (!pNum) return;
        if (!result[pNum]) result[pNum] = { parameter: row['Parameter'], parameterStage: null, subParameters: [] };

        // Get the stage from Score, Categorisation, Sub-Parameter stage, or Parameter Stage
        let stage = null;
        if (row['Score']) stage = normalizeStage(row['Score'].toString());
        if (!stage && row[catKey]) stage = normalizeStage(row[catKey]);
        if (!stage && row['Categorisation ']) stage = normalizeStage(row['Categorisation ']);
        if (!stage && row['Sub-Parameter stage']) stage = normalizeStage(row['Sub-Parameter stage']);

        // Parameter-level stage
        if (row['Parameter Stage']) {
            result[pNum].parameterStage = normalizeStage(row['Parameter Stage']);
        }

        const subParam = row['Sub-Parameter'];
        if (subParam && stage) {
            result[pNum].subParameters.push({
                name: subParam.replace(/\n/g, ' ').trim(),
                stage: stage
            });
        }
    });

    // If no parameterStage was set, compute from average of sub-parameters
    for (const [p, data] of Object.entries(result)) {
        if (!data.parameterStage && data.subParameters.length > 0) {
            const stageMap = { 'Greenfield': 1, 'Open to Adopt': 2, 'Early Success': 3, 'Maturing': 4, 'Role Model': 5 };
            const reverseMap = { 1: 'Greenfield', 2: 'Open to Adopt', 3: 'Early Success', 4: 'Maturing', 5: 'Role Model' };
            const avg = Math.round(data.subParameters.reduce((s, sp) => s + (stageMap[sp.stage] || 3), 0) / data.subParameters.length);
            data.parameterStage = reverseMap[avg];
        }
    }

    return result;
}

const myStages = extractStages(my, "Datapoints ", "Categorisation ");
const khStages = extractStages(kh, "Cambodia's Context", "Categorisation ");
const phStages = extractStages(ph, "Phillipines- Datapoints", "Categorisation ");

console.log("=== MALAYSIA ===");
for (const [p, data] of Object.entries(myStages)) {
    console.log(`${p}: ${data.parameter} => ${data.parameterStage}`);
    data.subParameters.forEach(sp => console.log(`  - ${sp.name} => ${sp.stage}`));
}

console.log("\n=== CAMBODIA ===");
for (const [p, data] of Object.entries(khStages)) {
    console.log(`${p}: ${data.parameter} => ${data.parameterStage}`);
    data.subParameters.forEach(sp => console.log(`  - ${sp.name} => ${sp.stage}`));
}

console.log("\n=== PHILIPPINES ===");
for (const [p, data] of Object.entries(phStages)) {
    console.log(`${p}: ${data.parameter} => ${data.parameterStage}`);
    data.subParameters.forEach(sp => console.log(`  - ${sp.name} => ${sp.stage}`));
}

// Output as JSON for use in MockData
const output = { Malaysia: myStages, Cambodia: khStages, Philippines: phStages };
fs.writeFileSync('parameter_stages.json', JSON.stringify(output, null, 2));
console.log("\nWritten to parameter_stages.json");
