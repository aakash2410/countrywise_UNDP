const fs = require('fs');

const bdSynth = JSON.parse(fs.readFileSync('bangladesh_synth_v2.json', 'utf8'));
const npSynth = JSON.parse(fs.readFileSync('nepal_synth_v2.json', 'utf8'));

// Exact text matching Cambodia's detail level based on Scoping Report contents
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

let mockData = fs.readFileSync('./src/components/dashboard/MockData.ts', 'utf8');
const bdStart = mockData.indexOf('export const bangladeshData: CountryDetailData = {');
if (bdStart !== -1) {
    mockData = mockData.substring(0, bdStart);
}

mockData += toTS(safeBdSynth, 'bangladeshData');
mockData += toTS(safeNpSynth, 'nepalData');

fs.writeFileSync('./src/components/dashboard/MockData.ts', mockData);
console.log('Successfully applied accurate Section D updates to MockData.ts');
