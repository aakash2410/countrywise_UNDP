const fs = require('fs');

const contexts = JSON.parse(fs.readFileSync('extracted_contexts.json', 'utf8'));
const bdSynth = JSON.parse(fs.readFileSync('bangladesh_synth_v2.json', 'utf8'));
const npSynth = JSON.parse(fs.readFileSync('nepal_synth_v2.json', 'utf8'));

function applyContexts(data, c) {
    // aiEcosystem
    data.aiEcosystem.policy.description = c.ai_policy.summary || '';
    data.aiEcosystem.policy.modalDetails = { fullContext: c.ai_policy.desc, keyMetrics: c.ai_policy.metrics };
    
    data.aiEcosystem.governance.description = c.ai_gov.summary || '';
    data.aiEcosystem.governance.modalDetails = { fullContext: c.ai_gov.desc, keyMetrics: c.ai_gov.metrics };

    data.aiEcosystem.legislation.description = c.ai_legis.summary || '';
    data.aiEcosystem.legislation.modalDetails = { fullContext: c.ai_legis.desc, keyMetrics: c.ai_legis.metrics };

    data.aiEcosystem.initiatives.description = c.ai_init.summary || '';
    data.aiEcosystem.initiatives.modalDetails = { fullContext: c.ai_init.desc, keyMetrics: c.ai_init.metrics };

    // dpiEcosystem
    data.dpiEcosystem.digitalId.description = c.dpi_id.summary || '';
    data.dpiEcosystem.digitalId.modalDetails = { fullContext: c.dpi_id.desc, keyMetrics: c.dpi_id.metrics };

    data.dpiEcosystem.payments.description = c.dpi_pay.summary || '';
    data.dpiEcosystem.payments.modalDetails = { fullContext: c.dpi_pay.desc, keyMetrics: c.dpi_pay.metrics };

    data.dpiEcosystem.dataExchange.description = c.dpi_data.summary || '';
    data.dpiEcosystem.dataExchange.modalDetails = { fullContext: c.dpi_data.desc, keyMetrics: c.dpi_data.metrics };

    // sectionB
    data.sectionB.politicalStability = c.pol_stab.summary || '';
    data.sectionB.electionCycles = c.pol_elec.summary || '';
    data.sectionB.politicalModalDetails = { fullContext: c.pol_stab.desc, keyMetrics: c.pol_stab.metrics };
    
    // Add missing implementation agencies
    data.dpiEcosystem.digitalId.implementationAgency = data.countryName === 'Bangladesh' ? 'Ministry of Home Affairs' : 'Department of National ID';
    data.dpiEcosystem.payments.implementationAgency = data.countryName === 'Bangladesh' ? 'Bangladesh Bank' : 'Nepal Rastra Bank';
    data.dpiEcosystem.dataExchange.implementationAgency = data.countryName === 'Bangladesh' ? 'BNEA' : 'MoCIT';
    data.aiEcosystem.policy.implementationAgency = 'Ministry of ICT';
    data.aiEcosystem.governance.implementationAgency = 'Various';
    data.aiEcosystem.legislation.implementationAgency = data.countryName === 'Bangladesh' ? 'Ministry of ICT' : 'MoCIT';
    data.aiEcosystem.initiatives.implementationAgency = 'Government Ministries';
}

applyContexts(bdSynth, contexts.Bangladesh);
applyContexts(npSynth, contexts.Nepal);

bdSynth.sectionD = {
    opportunities: [
      { id: 'bd-o1', text: 'Transition from Digital Bangladesh to Smart Bangladesh 2041 marks a shift towards AI-driven ecosystem.' }
    ],
    risks: [
      { id: 'bd-r1', text: 'Significant infrastructure progress with near-universal electricity, but digital inclusion gaps remain (rural vs urban).' }
    ],
    partnerships: [
      { id: 'bd-p1', text: 'Strong donor support (WB, ADB) is critical for scaling foundational DPI assets like the e-Service Bus.' }
    ]
};

npSynth.sectionD = {
    opportunities: [
      { id: 'np-o1', text: 'Rapid adoption of digital payments (Fonepay) and National ID, though authentication infrastructure is still lagging.' },
      { id: 'np-o2', text: 'Digital Nepal Framework identifies 8 sectors for growth, with a strong focus on digital foundation.' }
    ],
    risks: [
      { id: 'np-r1', text: 'Political instability remains a challenge, but digital transformation efforts have shown resilience across administrations.' }
    ],
    partnerships: []
};

function escapeQuotesInStrings(obj) {
    if (typeof obj === 'string') {
        // Replace single quotes in text so they don't break JS formatting
        return obj.replace(/'/g, "\\'");
    } else if (Array.isArray(obj)) {
        return obj.map(escapeQuotesInStrings);
    } else if (obj !== null && typeof obj === 'object') {
        const result = {};
        for (const [k, v] of Object.entries(obj)) {
            result[k] = escapeQuotesInStrings(v);
        }
        return result;
    }
    return obj;
}

const safeBdSynth = escapeQuotesInStrings(bdSynth);
const safeNpSynth = escapeQuotesInStrings(npSynth);

function toTS(obj, name) {
    let str = JSON.stringify(obj, null, 2);
    // Keys like "title": -> title:
    str = str.replace(/"([^"]+)":/g, '$1:');
    // For values, convert "string" to 'string'
    // Since we escaped inner single quotes as \', this is safe
    str = str.replace(/"(.*?[^\\])"/g, (match, p1) => {
        // p1 is the string content without the outer double quotes
        return "'" + p1 + "'";
    });
    // Finally, JSON.stringify returns double quotes around purely alphabetical strings too
    // that might not have been caught if they were just ""
    str = str.replace(/""/g, "''");
    
    // There might still be some unreplaced double quotes if the string ended with a backslash, but that's unlikely here.
    return `\nexport const ${name}: CountryDetailData = ${str};\n`;
}

let mockData = fs.readFileSync('./src/components/dashboard/MockData.ts', 'utf8');
const bdStart = mockData.indexOf('export const bangladeshData: CountryDetailData = {');
if (bdStart !== -1) {
    mockData = mockData.substring(0, bdStart);
}

mockData += toTS(safeBdSynth, 'bangladeshData');
mockData += toTS(safeNpSynth, 'nepalData');

fs.writeFileSync('./src/components/dashboard/MockData.ts', mockData);
console.log('Successfully applied detailed contexts to MockData.ts');
