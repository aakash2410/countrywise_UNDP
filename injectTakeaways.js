const fs = require('fs');

let mockDataStr = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

const strictTakeaways = {
    malaysia: {
        digitalId: [
            "Need to address equitable data distribution as reliance on digital services scales.",
            "Opportunity to work with the Ministry of Digital on establishing sustainable, green monitoring systems."
        ],
        payments: [
            "High adoption rates necessitate continued capacity building for digital literacy among marginalized users."
        ],
        dataExchange: [
            "Robust data centers require continuous investment in cyber resilience and green infrastructure.",
            "Partnerships with local startups can foster inclusive socio-economic service delivery."
        ],
        policy: [
            "Expanding the 'AI at Work' initiative can enhance efficiency across 10 key socio-economic sectors.",
            "Risk: Lack of explicit policies addressing AI's impact on cultural preservation and indigenous languages."
        ],
        governance: [
            "Legal infrastructure requires updates, particularly in enforceable ethical standards.",
            "Opportunity to pilot UNESCO’s Ethical Impact Assessment tools to ensure human-centric AI."
        ],
        legislation: [
            "Current frameworks must quickly adapt to mitigate high costs and potential over-dependence on foreign AI vendors."
        ],
        initiatives: [
            "Utilising the AI Sandbox aims to increase the number of AI technology companies from 284 to 900 by 2026.",
            "Focusing on 'AI for Good' can position Malaysia as a regional hub for ethical technological innovation."
        ]
    },
    cambodia: {
        digitalId: [
            "eID has historically seen low adoption rates, primarily availed for business-related government services.",
            "Rapid technological adoption risks leaving rural communities and women behind, deepening the digital divide."
        ],
        payments: [
            "Strong foundational rollout requires targeted educational programs to broaden beyond highly urbanized users."
        ],
        dataExchange: [
            "Institutional fragmentation requires cohesive interoperability between MEF, MPTC, and NBC layers."
        ],
        policy: [
            "National AI Strategy prioritizes Khmer Large Language Models to prevent cultural exclusion.",
            "Opportunity to operationalize AI Sandboxes for public health and transparent governance."
        ],
        governance: [
            "Digital initiatives are currently split across MPTC, MISTI, and MEF, causing fragmented oversight.",
            "Partners can provide technical expertise to turn UNESCO ethical recommendations into enforceable local laws."
        ],
        legislation: [
            "The Law on Personal Data Protection remains in the drafting stage, creating prolonged risks of data misuse and vulnerability."
        ],
        initiatives: [
            "Collaborations with CADT and UNESCO on the $27M STEPCam program aim to align AI ethics with 'Future of Work' skills."
        ]
    },
    philippines: {
        digitalId: [
            "Broad rollout demands aggressive closure of the geographic digital divide, particularly outside Metro Manila."
        ],
        payments: [
            "Financial inclusion expanding rapidly, but requires localized infrastructure in remote provinces."
        ],
        dataExchange: [
            "National Fiber Backbone investments remain critical to ensure backend systems function securely without outages."
        ],
        policy: [
            "Release of NAISR 2.0 accelerates AI policy momentum, driving significant GDP impact from the digital economy.",
            "Government R&D spending remains below global benchmarks, limiting domestic innovation capacity."
        ],
        governance: [
            "The absence of a dedicated coordinating mechanism weakens policy coherence.",
            "Need to operationalize an inter-agency mechanism (DTI, DICT, DOST, NEDA) to address siloed AI challenges."
        ],
        legislation: [
            "Cyber threats, deepfakes, and potential job displacement raise prominent concerns requiring robust socio-cultural mitigation."
        ],
        initiatives: [
            "Active participation from industry and civil society supports a strong whole-of-nation approach to technological development.",
            "Strong potential to grow industry-academia collaborations to boost localized AI research outputs."
        ]
    },
    bangladesh: {
        digitalId: [
            "The 2023 NID breach exposed ~50 million citizen data points, highlighting urgent infrastructure vulnerabilities.",
            "A severe shortage of cybersecurity professionals threatens the stability of foundational registries."
        ],
        payments: [
            "Aiming to develop a Mojaloop-based interoperable payment system in partnership with the Gates Foundation by 2027.",
            "Phygital Public Infrastructure initiatives actively aim to bridge adoption gaps among marginalized groups."
        ],
        dataExchange: [
            "Data remains highly fragmented and siloed, lacking secure interoperability.",
            "System isolation drives up operational costs and drastically slows integrated service delivery."
        ],
        policy: [
            "Smart Bangladesh Vision focuses on comprehensive digitization across citizen services and economic growth.",
            "Strategic opportunity to support massive workforce upskilling to counter low national digital literacy."
        ],
        governance: [
            "Requires substantial multi-stakeholder support to design inclusive, rights-based digital governance frameworks."
        ],
        legislation: [
            "High volume of targeted cyberattacks necessitates rigorous proactive alignment with the Cyber Security Ordinance."
        ],
        initiatives: [
            "Strong emphasis on building 'Phygital' networks to explicitly bridge the urban-rural disparity in emerging technologies."
        ]
    },
    nepal: {
        digitalId: [
            "DPI understanding remains restricted to central ministries, heavily limiting sectoral uptake.",
            "Nepal's low GovTech Index score (0.439) reflects weak system interoperability and skill gaps across government tiers."
        ],
        payments: [
            "High transaction volumes handled by NPI present an opportunity to expand into seamless cross-border enablement."
        ],
        dataExchange: [
            "The Government Integrated Data Center (GIDC) is understaffed and lacks resources, leading to outages across 10-15 agencies.",
            "There is immense scope for Nepal to join the '50-in-5' initiative as core backend capabilities stabilize."
        ],
        policy: [
            "Significant potential to scale up targeted capacity-building programs explicitly across high-priority non-technical ministries."
        ],
        governance: [
            "Weak system reliability underscores the need to define uncompromising operational standards and workforce training programs."
        ],
        legislation: [
            "The 2024 Draft Cyber Bill has faced criticism for potentially enabling excessive government surveillance and lacking privacy safeguards.",
            "Opportunity to facilitate multi-stakeholder dialogue ensuring new legislation aligns securely with international human rights norms."
        ],
        initiatives: [
            "Recent World Bank $50M loan serves as a catalyst to strengthen foundational systems and scale inclusive digital service delivery."
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
        const takeawaysArr = cData[mockKey] || [];

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
console.log('Successfully injected strict key takeaways arrays from PDF to MockData.ts');
