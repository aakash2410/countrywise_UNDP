const fs = require('fs');

const contexts = JSON.parse(fs.readFileSync('extracted_contexts.json', 'utf8'));
const bdSynth = JSON.parse(fs.readFileSync('bangladesh_synth_v2.json', 'utf8'));
const npSynth = JSON.parse(fs.readFileSync('nepal_synth_v2.json', 'utf8'));

// Bangladesh Section B Additions
bdSynth.sectionB.deviceAccess = 40.0;
bdSynth.sectionB.digitalInclusion = "Higher access in urban areas (71.3% men, 62.4% women) vs rural (36.6% men, 23% women). Overall geographic divide: 66.8% vs 29.7%.";
bdSynth.sectionB.dataCenters = "36 total operational";
bdSynth.sectionB.politicalSubParameters = [
    { label: 'Elections', value: 'National elections have recently concluded, initiating transitions in parliamentary dynamics.' },
    { label: 'Governance Structure', value: 'Centralized Democratic Republic. Unicameral parliament (Jatiya Sangsad) with an indirectly elected President and Prime Minister-led cabinet.' },
    { label: 'Political Stability', value: 'Faces challenges. Scored lower on global Governance Indicators, particularly in Control of Corruption (25.5) and Accountability (36.5).' },
    { label: 'Digital Priority', value: 'Transitioning from Digital Bangladesh to Smart Bangladesh 2041, prioritizing secure AI ecosystems and aiming for 50k cybersecurity experts by 2030.' },
    { label: 'Institutional Capacity', value: 'Moderate macroeconomic management rating (3/6), reflecting ongoing efforts to improve central policy implementation.' },
    { label: 'Leadership Champions', value: 'Strategic capacity-building partnerships formally signed with the e-Governance Academy and British Council to advance digital frameworks.' },
    { label: 'Key Influencers', value: 'a2i (Aspire to Innovate), Bangladesh Bank, and the ICT Division of the Ministry of Posts and Telecommunications.' },
    { label: 'Technical Expertise', value: 'Specialized authorities (BGD e-GOV CIRT, Digital Service Design Lab) collaborate tightly with academia to train civil servants.' }
];
bdSynth.sectionB.leadershipQuote = {
    text: "The Smart Bangladesh Vision 2041 aims to bridge the digital divide and ensure services reach every citizen equitably.",
    author: "National Strategy Manifesto",
    context: "Smart Bangladesh Vision 2041"
};

// Nepal Section B Additions
npSynth.sectionB.deviceAccess = 95.5;
npSynth.sectionB.digitalInclusion = "Higher internet access in urban areas (65%) versus rural regions (22%). Only 53% have 4G coverage.";
npSynth.sectionB.dataCenters = "37 data centres (Internet Society: Pulse)";
npSynth.sectionB.politicalSubParameters = [
    { label: 'Elections', value: 'National Election cycle spans from November 2022 up to the upcoming March 2026 cycle.' },
    { label: 'Governance Structure', value: 'Federal Democratic Republic with a multiparty parliamentary system. Significant decentralization challenges persist.' },
    { label: 'Political Stability', value: 'Categorized as a Hybrid Regime (4.6/10). Saw a 10.87% increase in Political Stability Index (from 47.94 in 2014 to 58.81 in 2024).' },
    { label: 'Digital Inclusion Gaps', value: 'Higher internet access in urban areas (65%) versus rural regions (22%). Only 53% have 4G coverage and just 56% used the internet recently.' },
    { label: 'Institutional Capacity', value: 'Nepal is participating in the global 50-in-5 initiative for policy implementation. GovTech Index score remains low at 0.439 due to weak systems.' },
    { label: 'Key Influencers', value: 'MoCIT acts as the primary agency, but understanding of DPI remains low beyond central ministries, limiting sectoral uptake.' }
];
npSynth.sectionB.leadershipQuote = {
    text: "Harnessing digital technologies is essential to leapfrog development stages and create an inclusive digital economy for all Nepalese.",
    author: "Digital Nepal Framework",
    context: "National Strategy Outline"
};


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


// Source URLs
bdSynth.sources = ["https://oxfordinsights.com/wp-content/uploads/2025/12/2025-Government-AI-Readiness-Index-2.pdf", "https://aipolicy.gov.bd/docs/national-ai-policy-bangladesh-2026-2030-draft-v1.1.pdf", "https://www.unesco.org/ethics-ai/en/global-hub", "https://www.dlapiperdataprotection.com/", "https://file-rangpur.portal.gov.bd/files/pbs2.dinajpur.gov.bd/files/1885c0a0_28a4_4fcc_8d4d_dcd7ce23fd8b/7b684f19a15dfcd0f542382764572486.pdf"];
npSynth.sources = ["https://nepaleconomicforum.org/a-view-on-the-national-ai-policy/", "https://asiapacific.unfpa.org/en/news/sita-nepals-new-ai-tool-could-change-how-country-uses-data", "https://www.datacentermap.com/nepal/", "https://nagarikapp.gov.np/"];


function toTS(obj, name) {
    // Generate valid TS code by stringifying JSON, but keep it as JSON representation in a JS string template.
    // Instead of replacing quotes naively which breaks with apostrophes (e.g., Nepal's),
    // We simply use JSON.stringify but strip quotes from keys to make it look like a TS object literal.
    
    let str = JSON.stringify(obj, null, 2);
    // Remove quotes from keys. E.g. "key": -> key: 
    str = str.replace(/"([^"]+)":/g, '$1:');
    
    // NOTE: we leave string values with double quotes ("value") to ensure safely escaped strings like "Nepal's"
    
    return `\nexport const ${name}: CountryDetailData = ${str};\n`;
}

let mockData = fs.readFileSync('./src/components/dashboard/MockData.ts', 'utf8');
const bdStart = mockData.indexOf('export const bangladeshData: CountryDetailData = {');
if (bdStart !== -1) {
    mockData = mockData.substring(0, bdStart);
}

mockData += toTS(bdSynth, 'bangladeshData');
mockData += toTS(npSynth, 'nepalData');

fs.writeFileSync('./src/components/dashboard/MockData.ts', mockData);
console.log('Successfully applied accurate structural updates to MockData.ts with fixed string formatting.');
