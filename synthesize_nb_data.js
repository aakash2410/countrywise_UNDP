const fs = require('fs');

function synthesizeCountryData(mainFile, stages, countryName) {
    const data = JSON.parse(fs.readFileSync(mainFile, 'utf8'));
    
    const findRow = (heading, subHeading, parameter) => {
        return data.find(r => 
            (heading ? r['__EMPTY']?.includes(heading) : true) &&
            (subHeading ? r['__EMPTY_2']?.includes(subHeading) : true) &&
            (parameter ? r['__EMPTY_4']?.includes(parameter) : true)
        );
    };

    const getSummary = (row) => row ? row['__EMPTY_6'] || '' : '';
    const getDescription = (row) => row ? row['__EMPTY_7'] || '' : '';
    const getSources = (row) => row ? row['__EMPTY_8'] || '' : '';

    const aiPolicyRow = findRow('AI and DPI Ecosystem', 'Policy and strategy', 'National AI strategy/policy status');
    const aiDataRow = findRow('AI and DPI Ecosystem', 'Policy and strategy', 'Data protection');
    const aiGovRow = findRow('AI and DPI Ecosystem', 'Policy and strategy', 'AI Governance');
    const aiInitRow = findRow('AI and DPI Ecosystem', 'Implementation and Adoption', 'Government AI initiatives');

    const dpiIdRow = findRow('AI and DPI Ecosystem', 'DPI Stack Maturity', 'Digital ID');
    const dpiPayRow = findRow('AI and DPI Ecosystem', 'DPI Stack Maturity', 'Digital Payments');
    const dpiDataRow = findRow('AI and DPI Ecosystem', 'DPI Stack Maturity', 'Data Exchange');

    const polStabRow = findRow('Political Economy', 'Political Stability', 'Political stability and continuity');
    const polStabWbRow = findRow('Political Economy', 'Political Stability', 'Political stability and continuity'); // Same section
    const polElecRow = findRow('Political Economy', 'Political Stability', 'National election cycle');

    const infraElecRow = findRow('AI and DPI Ecosystem', 'DPI Stack Maturity', 'Digital-Physical Infrastructure'); // May vary
    // Actually P3 is in the framework usually.
    
    const result = {
        countryName: countryName,
        dpiEcosystem: {
            digitalId: {
                title: 'Digital ID',
                status: stages.P2.subParameters.find(s => s.name.includes('Digital ID'))?.stage || 'Greenfield',
                description: getSummary(dpiIdRow),
                implementationAgency: '', // Extract if possible
                modalDetails: {
                    fullContext: getDescription(dpiIdRow),
                    keyMetrics: [getSummary(dpiIdRow)],
                    timeline: ''
                }
            },
            payments: {
                title: 'Digital Payments',
                status: stages.P2.subParameters.find(s => s.name.includes('Digital Payments'))?.stage || 'Greenfield',
                description: getSummary(dpiPayRow),
                modalDetails: {
                    fullContext: getDescription(dpiPayRow),
                    keyMetrics: [getSummary(dpiPayRow)],
                    timeline: ''
                }
            },
            dataExchange: {
                title: 'Data Exchange',
                status: stages.P2.subParameters.find(s => s.name.includes('Data Exchange'))?.stage || 'Greenfield',
                description: getSummary(dpiDataRow),
                modalDetails: {
                    fullContext: getDescription(dpiDataRow),
                    keyMetrics: [getSummary(dpiDataRow)],
                    timeline: ''
                }
            }
        },
        aiEcosystem: {
            policy: {
                title: 'AI Strategy',
                status: stages.P1.subParameters.find(s => s.name.includes('National AI Strategy'))?.stage || 'Greenfield',
                description: getSummary(aiPolicyRow),
                modalDetails: {
                    fullContext: getDescription(aiPolicyRow),
                    keyMetrics: [getSummary(aiPolicyRow)],
                    timeline: ''
                }
            },
            governance: {
                title: 'AI Governance',
                status: stages.P1.subParameters.find(s => s.name.includes('AI Governance'))?.stage || 'Greenfield',
                description: getSummary(aiGovRow),
                modalDetails: {
                    fullContext: getDescription(aiGovRow),
                    keyMetrics: [getSummary(aiGovRow)],
                    timeline: ''
                }
            },
            legislation: {
                title: 'Data Protection',
                status: stages.P1.subParameters.find(s => s.name.includes('Data Protection'))?.stage || 'Greenfield',
                description: getSummary(aiDataRow),
                modalDetails: {
                    fullContext: getDescription(aiDataRow),
                    keyMetrics: [getSummary(aiDataRow)],
                    timeline: ''
                }
            },
            initiatives: {
                title: 'AI Initiatives',
                status: stages.P1.subParameters.find(s => s.name.includes('Government AI Initiatives'))?.stage || 'Greenfield',
                description: getSummary(aiInitRow),
                modalDetails: {
                    fullContext: getDescription(aiInitRow),
                    keyMetrics: [getSummary(aiInitRow)],
                    timeline: ''
                }
            }
        },
        sectionB: {
            fundingLandscape: 'Development partners and domestic budget', // synthesize later
            electricityAccess: 0, // Extract from P3
            internetPenetration: 0, // Extract from P3
            politicalStability: getSummary(polStabRow),
            electionCycles: getSummary(polElecRow),
            politicalModalDetails: {
                fullContext: getDescription(polStabRow),
                keyMetrics: [getSummary(polStabRow)],
                timeline: ''
            }
        },
        sectionC: {
            actors: [] // synth later
        },
        sectionD: {
            takeaways: [] // synth later
        },
        parameterStages: stages
    };

    return result;
}

const stagesFile = JSON.parse(fs.readFileSync('parameter_stages.json', 'utf8'));

const bangladeshFull = synthesizeCountryData('bangladesh_main.json', stagesFile.Bangladesh, 'Bangladesh');
const nepalFull = synthesizeCountryData('nepal_main.json', stagesFile.Nepal, 'Nepal');

fs.writeFileSync('nepal_synth.json', JSON.stringify(nepalFull, null, 2));
fs.writeFileSync('bangladesh_synth.json', JSON.stringify(bangladeshFull, null, 2));
console.log('Synthesized nepal_synth.json and bangladesh_synth.json');
