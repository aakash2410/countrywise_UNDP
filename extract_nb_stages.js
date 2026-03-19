const fs = require('fs');

function extractStages(frameworkFile, countryName) {
    const data = JSON.parse(fs.readFileSync(frameworkFile, 'utf8'));
    const result = {};
    
    const pKeys = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];
    const pNames = {
        'P1': 'AI Ecosystem Maturity',
        'P2': 'DPI Ecosystem Maturity',
        'P3': 'Digital-Physical Infrastructure',
        'P4': 'Political Stability and Governance',
        'P5': 'Stakeholder Participation and Ecosystem Coordination',
        'P6': 'Funding Landscape'
    };

    pKeys.forEach(pKey => {
        const rows = data.filter(r => r['P#'] === pKey);
        if (rows.length === 0) return;

        const subParameters = rows.map(r => ({
            name: r['Sub-Parameter'].trim().replace(/\n/g, ' '),
            stage: r[`${countryName} Maturity level`]?.trim() || 'Greenfield'
        }));

        // Determine overall parameter stage (heuristically or by looking at first row if it has one)
        // For now, let's just pick the most common stage or use a default
        const stages = subParameters.map(s => s.stage);
        const stageCounts = {};
        stages.forEach(s => stageCounts[s] = (stageCounts[s] || 0) + 1);
        const overallStage = Object.keys(stageCounts).reduce((a, b) => stageCounts[a] > stageCounts[b] ? a : b);

        result[pKey] = {
            parameter: pNames[pKey],
            parameterStage: overallStage,
            subParameters: subParameters
        };
    });

    return result;
}

const bangladeshStages = extractStages('bangladesh_framework.json', 'Bangladesh');
const nepalStages = extractStages('nepal_framework.json', 'Nepal');

const currentStages = JSON.parse(fs.readFileSync('parameter_stages.json', 'utf8'));
currentStages['Bangladesh'] = bangladeshStages;
currentStages['Nepal'] = nepalStages;

fs.writeFileSync('parameter_stages.json', JSON.stringify(currentStages, null, 2));
console.log('Updated parameter_stages.json with Bangladesh and Nepal');
