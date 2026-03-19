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

    // sectionB (base)
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

// 1. Apply extracted contexts
applyContexts(bdSynth, contexts.Bangladesh);
applyContexts(npSynth, contexts.Nepal);

// 2. Apply Custom Section B additions (Device Access, Centers, Quotations, Political Sub Params)
bdSynth.sectionB.deviceAccess = 40.0;
bdSynth.sectionB.digitalInclusion = "Higher access in urban areas (71.3% men, 62.4% women) vs rural (36.6% men, 23% women). Overall geographic divide: 66.8% vs 29.7%.";
bdSynth.sectionB.dataCenters = "36 total operational";
bdSynth.sectionB.leadershipQuote = {
    text: "The Smart Bangladesh Vision 2041 aims to bridge the digital divide and ensure services reach every citizen equitably.",
    author: "National Strategy Manifesto",
    context: "Smart Bangladesh Vision 2041"
};
bdSynth.sectionB.politicalSubParameters = [
    { label: 'Elections', value: 'Elections recently concluded.' },
    { label: 'Governance Structure', value: 'Centralised. Bangladesh is a democratic republic with a unicameral parliament (Jatiya Sangsad). The president appoints the head of the winning party as prime minister.' },
    { label: 'Political Stability', value: 'Poor D ranking, with major challenges in corruption. Voice and Accountability: 36.53. Political Stability: 40.90. Control of Corruption: 25.55.' },
    { label: 'Institutional Capacity', value: 'CPIA Macroeconomic management rating assesses quality of policy implementation. Scores 3 out of 6, as of 2024.' }
];

npSynth.sectionB.deviceAccess = 95.5;
npSynth.sectionB.digitalInclusion = "Higher internet access in urban areas (65%) versus rural regions (22%). Only 53% have 4G coverage.";
npSynth.sectionB.dataCenters = "37 data centres (Internet Society: Pulse)";
npSynth.sectionB.leadershipQuote = {
    text: "Harnessing digital technologies is essential to leapfrog development stages and create an inclusive digital economy for all Nepalese.",
    author: "Digital Nepal Framework",
    context: "National Strategy Outline"
};
npSynth.sectionB.politicalSubParameters = [
    { label: 'Elections', value: '5 year election cycle. Mass and violent protests led to Prime Minister resignation in September 2025. Interim government appointed.' },
    { label: 'Governance Structure', value: 'Federal Democratic Republic since 2008. Seven administrative regions and a bicameral legislature.' },
    { label: 'Political Stability', value: 'Unstable. 27 Prime Ministers since 1990. Voice and Accountability: 55.80. Political Stability: 58.81. Control of Corruption: 35.05. Ranked 107 out of 143.' },
    { label: 'Institutional Capacity', value: 'CPIA Macroeconomic management rating is 3 out of 6, as of 2024.' },
    { label: 'Institutional Fragmentation', value: 'MoCIT has limited coordination power, and the e-Governance Board lacks formal authority.' },
    { label: 'Capacity Constraints', value: 'DPI understanding remains low beyond central ministries. GovTech Index: 0.439.' }
];

// 3. Apply Custom Section D (Opportunities, Risks, Partnerships)
bdSynth.sectionD = {
    opportunities: [
        { id: 'bd-o1', text: 'Unified Instant Payment System (Pipeline): From September 2025, Bangladesh Bank aims to develop an interoperable payment system with the Gates foundation for instant transfers.' },
        { id: 'bd-o2', text: 'First mover in 50-in-5 initiative: DPI efforts mapped to 20.5 Billion USD in savings and a reduction of public service visits down to 82%.' },
        { id: 'bd-o3', text: 'DPG Registry: Bangladesh enlisted three solutions (ekShop, GRS, NISE Skills) signifying strong commitment to digital public goods.' }
    ],
    risks: [
        { id: 'bd-r1', text: 'Infrastructure inadequacy and fragmented responsibility with a lack of existing released guidelines for DPI integration.' },
        { id: 'bd-r2', text: 'Interoperability issues: Legacy systems and siloed data availability severely hamper the creation of a unified digital ecosystem.' },
        { id: 'bd-r3', text: 'Digital payments lose ground to cash despite growth in volume, highlighting trust and financial literacy gaps.' }
    ],
    partnerships: [
        { id: 'bd-p1', text: 'Multi-stakeholder partnerships at the national level are rated as Medium potential, offering an entry point for UNDP to broker agreements.' },
        { id: 'bd-p2', text: 'University collaboration and joint research evaluations for AI readiness provide another medium-impact strategic opportunity for engagement.' }
    ]
};

npSynth.sectionD = {
    opportunities: [
        { id: 'np-o1', text: 'Digital Nepal Framework identifies 8 socio-economic sectors for digital growth, providing a clear roadmap for UNDP technical assistance.' },
        { id: 'np-o2', text: 'Rapid adoption of the National ID (over 17 million registered) and digital payments (Fonepay) show strong public appetite for DPI.' }
    ],
    risks: [
        { id: 'np-r1', text: 'High political instability and frequent government transitions hinder long-term DPI and AI policy continuity.' },
        { id: 'np-r2', text: 'A severe digital divide exists between urban (65% internet access) and rural (22%) populations, risking unequal DPI benefits.' },
        { id: 'np-r3', text: 'Lack of an operational authentication infrastructure (KYC) for the National ID prevents seamless end-to-end digital service delivery.' }
    ],
    partnerships: [
        { id: 'np-p1', text: 'Strategic partnerships with the World Bank and ADB, who are currently funding foundational digital transformation projects.' },
        { id: 'np-p2', text: 'Collaboration with local innovators like Fusemachines and Fonepay to build localized AI solutions and secure payment gateways.' },
        { id: 'np-p3', text: 'UNDP can support the e-Governance Commission to improve the GovTech index score through capacity building.' }
    ]
};

// 4. Source URLs
bdSynth.sources = ["https://oxfordinsights.com/wp-content/uploads/2025/12/2025-Government-AI-Readiness-Index-2.pdf", "https://aipolicy.gov.bd/docs/national-ai-policy-bangladesh-2026-2030-draft-v1.1.pdf", "https://www.unesco.org/ethics-ai/en/global-hub", "https://www.dlapiperdataprotection.com/", "https://file-rangpur.portal.gov.bd/files/pbs2.dinajpur.gov.bd/files/1885c0a0_28a4_4fcc_8d4d_dcd7ce23fd8b/7b684f19a15dfcd0f542382764572486.pdf"];
npSynth.sources = ["https://nepaleconomicforum.org/a-view-on-the-national-ai-policy/", "https://asiapacific.unfpa.org/en/news/sita-nepals-new-ai-tool-could-change-how-country-uses-data", "https://www.datacentermap.com/nepal/", "https://nagarikapp.gov.np/"];

// 5. Cleanup strings
function escapeQuotesInStrings(obj) {
    if (typeof obj === 'string') {
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
    str = str.replace(/"([^"]+)":/g, '$1:');
    str = str.replace(/"(.*?[^\\])"/g, (match, p1) => {
        return "'" + p1 + "'";
    });
    str = str.replace(/""/g, "''");
    return `\nexport const ${name}: CountryDetailData = ${str};\n`;
}

// 6. Write out cleanly
let mockData = fs.readFileSync('./src/components/dashboard/MockData.ts', 'utf8');
const bdStart = mockData.indexOf('export const bangladeshData: CountryDetailData = {');
if (bdStart !== -1) {
    mockData = mockData.substring(0, bdStart);
}

mockData += toTS(safeBdSynth, 'bangladeshData');
mockData += toTS(safeNpSynth, 'nepalData');

fs.writeFileSync('./src/components/dashboard/MockData.ts', mockData);
console.log('Successfully applied ALL contexts robustly to MockData.ts!');
