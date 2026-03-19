// Generate NewScoringData.ts from new_framework.json
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('new_framework.json', 'utf8'));

// Filter only rows with valid P# like P1-P6
const rows = data.filter(r => typeof r['P#'] === 'string' && /^P\d$/.test(r['P#']));

const stageKeys = {
    greenfield: 'Stage 1\n Greenfield\n(No Activity)',
    openToAdopt: 'Stage 2\n Open to Adopt\n(Intent / Planning)',
    earlySuccess: 'Stage 3\nEarly Success\n(Strategy/framework published)',
    maturing: 'Stage 4\nMaturing\n(Implementation)',
    roleModel: 'Stage 5\n Role Model\n(Leadership and  scaling)',
};

const items = rows.map(r => ({
    parameter: r['Parameter'],
    subParameter: r['Sub-Parameter'].replace(/\n/g, ' ').trim(),
    greenfield: r[stageKeys.greenfield] || '',
    openToAdopt: r[stageKeys.openToAdopt] || '',
    earlySuccess: r[stageKeys.earlySuccess] || '',
    maturing: r[stageKeys.maturing] || '',
    roleModel: r[stageKeys.roleModel] || '',
}));

let ts = 'export const scoringCriteria = [\n';
items.forEach((item, idx) => {
    ts += `    {\n`;
    ts += `        "parameter": "${item.parameter}",\n`;
    ts += `        "subParameter": "${item.subParameter}",\n`;
    ts += `        "greenfield": "${item.greenfield.replace(/"/g, '\\"')}",\n`;
    ts += `        "openToAdopt": "${item.openToAdopt.replace(/"/g, '\\"')}",\n`;
    ts += `        "earlySuccess": "${item.earlySuccess.replace(/"/g, '\\"')}",\n`;
    ts += `        "maturing": "${item.maturing.replace(/"/g, '\\"')}",\n`;
    ts += `        "roleModel": "${item.roleModel.replace(/"/g, '\\"')}"\n`;
    ts += `    }${idx < items.length - 1 ? ',' : ''}\n`;
});
ts += '];\n';

fs.writeFileSync('src/components/dashboard/NewScoringData.ts', ts);
console.log(`Generated ${items.length} scoring criteria entries`);
items.forEach(i => console.log(`  ${i.parameter} → ${i.subParameter}`));
