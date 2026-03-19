const fs = require('fs');

let mockDataStr = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

// Strategic filtering: Only inject takeaways for cards with highly actionable or severe insights
const strictTakeaways = {
    malaysia: {
        governance: [
            "Legal infrastructure requires updates, particularly in enforceable ethical standards.",
            "Opportunity to pilot UNESCO’s Ethical Impact Assessment tools to ensure human-centric AI."
        ],
        initiatives: [
            "Utilising the AI Sandbox aims to increase the number of AI technology companies from 284 to 900 by 2026."
        ]
    },
    cambodia: {
        digitalId: [
            "eID has historically seen low adoption rates, primarily availed for business-related government services.",
            "Rapid technological adoption risks leaving rural communities and women behind, deepening the digital divide."
        ],
        policy: [
            "National AI Strategy prioritizes Khmer Large Language Models to prevent cultural exclusion."
        ]
    },
    philippines: {
        dataExchange: [
            "National Fiber Backbone investments remain critical to ensure backend systems function securely without outages."
        ],
        legislation: [
            "Cyber threats, deepfakes, and potential job displacement raise prominent concerns requiring robust socio-cultural mitigation."
        ]
    },
    bangladesh: {
        digitalId: [
            "The 2023 NID breach exposed ~50 million citizen data points, highlighting urgent infrastructure vulnerabilities.",
            "A severe shortage of cybersecurity professionals threatens the stability of foundational registries."
        ],
        dataExchange: [
            "Data remains highly fragmented and siloed, lacking secure interoperability.",
            "System isolation drives up operational costs and drastically slows integrated service delivery."
        ]
    },
    nepal: {
        dataExchange: [
            "The Government Integrated Data Center (GIDC) is understaffed and lacks resources, leading to outages across 10-15 agencies."
        ],
        legislation: [
            "The 2024 Draft Cyber Bill has faced criticism for potentially enabling excessive government surveillance and lacking privacy safeguards."
        ]
    }
};

const mapping = {
    digitalId: 'digitalId',
    payments: 'payments',
    dataExchange: 'dataExchange',
    policy: 'policy',
    governance: 'governance',
    legislation: 'legislation',
    initiatives: 'initiatives'
};

const countryKeys = ['malaysia', 'cambodia', 'philippines', 'bangladesh', 'nepal'];

countryKeys.forEach(countryKey => {
    const cData = strictTakeaways[countryKey];

    Object.keys(mapping).forEach(mockKey => {
        const takeawaysArr = cData && cData[mockKey] ? cData[mockKey] : [];

        if (takeawaysArr.length > 0) {
            // Convert array of strings into a TS array format: ["str1", "str2"]
            const takeawaysStr = 'keyTakeaways: [\n          ' + takeawaysArr.map(m => `"${m.replace(/"/g, '\\"')}"`).join(',\n          ') + '\n        ],';

            // Find the specific country export block
            const countryExportRegex = new RegExp(`(export const ${countryKey}Data: CountryDetailData = \\{[\\s\\S]*?\\n\\}\\;)`, 'g');

            mockDataStr = mockDataStr.replace(countryExportRegex, (match) => {
                // We look for keyMetrics: [ ... ], and insert keyTakeaways afterwards
                const propRegex = new RegExp(`(${mockKey}:\\s*\\{[\\s\\S]*?modalDetails:\\s*\\{[\\s\\S]*?keyMetrics:\\s*\\[[\\s\\S]*?\\])(,)`, 'g');

                return match.replace(propRegex, (mathProp, p1, p2) => {
                    return `${p1},\n        ${takeawaysStr}`;
                });
            });
        }
    });
});

fs.writeFileSync('src/components/dashboard/MockData.ts', mockDataStr);
console.log('Successfully injected selective key takeaways arrays from PDF to MockData.ts');
