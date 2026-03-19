const fs = require('fs');

let mockDataStr = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

const strictMetrics = {
    malaysia: {
        digitalId: [
            "RM80 million budget allocation",
            "Registration began in 2024 via MyGOV Malaysia",
            "Identity verification without storing personal data"
        ],
        payments: [
            "Real-time Retail Payments Platform (RPP) launched in 2018",
            "Enables real-time, data-rich payments between accounts",
            "Operated by PayNet (merger of MEPS and MyClear)"
        ],
        dataExchange: [
            "Enhances end-to-end (E2E) online services towards a data-driven government",
            "Reduces cost of infrastructure and system integration"
        ],
        policy: [
            "Malaysia's Artificial Intelligence Roadmap 2021-2025",
            "Aims to augment jobs and drive national competitiveness",
            "Six envisioned outcomes including AI governance, R&D, and talent"
        ],
        governance: [
            "Built on 7 AI Principles including fairness, reliability, and human-centricity",
            "Structured across three levels: Users, Regulators, and Developers",
            "Guided by National Guidelines (AIGE) and ASEAN AI guide"
        ],
        legislation: [
            "Personal Data Protection (Amendment) Act 2024 addresses privacy",
            "Score of 4.17/5 in data and privacy (UNDP Digital Development Compass)",
            "Score of 5/5 in cybersecurity (UNDP Digital Development Compass)"
        ],
        initiatives: [
            "MySejahtera: Public Health Digital Gateway",
            "DR MATA: AI-Based Diabetic Retinopathy Screening",
            "Cof’e: AI-Driven Cough Sound Screening for COVID-19",
            "CODIC-MY: AI-Powered Remote Monitoring"
        ]
    },
    cambodia: {
        digitalId: [
            "Targeted in Phase 1 (2021-2025) of the Digital Economy Framework",
            "Focus restricted to foundational E-ID and payment gateways"
        ],
        payments: [
            "Bakong identified as primary DPI-like digital payment mechanism"
        ],
        dataExchange: [
            "CamDigiKey listed as primary DPI-like digital ID and exchange mechanism"
        ],
        policy: [
            "Draft National AI Strategy 2025-30",
            "Establishing a National AI and Data Science Lab",
            "Strategic push for Khmer Large Language Model (LLM)"
        ],
        governance: [
            "Scored 55 out of 100 in UNESCO AI Readiness Assessment",
            "Implementing a 'soft law' approach guided by UNESCO RAM",
            "Foundational laws on Data Protection and Cybersecurity pending"
        ],
        legislation: [
            "Sub-Decree 252 applies only to Ministry of Interior identification data",
            "Draft Law on Personal Data Protection released for public consultation (July 2025)"
        ],
        initiatives: [
            "National Research Center on AI for Education inaugurated (Nov 2025)",
            "AI-assisted Landmine detection targeting a landmine-free status by 2030",
            "Developing an open-source Khmer Large Language Model with Singapore"
        ]
    },
    philippines: {
        digitalId: [
            "PhilSys issues unique identification number supported by biometric data",
            "Administered by the Philippine Statistics Authority"
        ],
        payments: [
            "PhilPaSSplus enables real time high-value interbank fund transfers",
            "Operated by the Bangko Sentral ng Pilipinas"
        ],
        dataExchange: [
            "eGovDX enables interoperable data sharing among government agencies",
            "InstaPay, PESONet, and QR Ph facilitate electronic fund transfers"
        ],
        policy: [
            "National AI Strategy Roadmap (NAISR) 2.0 targets 1.0% of GDP R&D spending",
            "Aims to boost economy by up to PHP 2.6 trillion annually",
            "Launched the Center for AI Research (CAIR)"
        ],
        governance: [
            "Senate Bill No. 25 proposes a National AI Commission",
            "Mandates risk-based classification of AI systems",
            "Requires employers to provide advance notification for AI integration"
        ],
        legislation: [
            "Governed by the Data Privacy Act of 2012 (Republic Act No. 10173)",
            "Regulated by the independent National Privacy Commission",
            "Requires 72-hour breach notification where risk of harm exists"
        ],
        initiatives: [
            "₱1.5 Billion national allocation for AI Upskilling Initiative",
            "Digital Bayanihan Chain (Blockchain for National Budget Transparency)",
            "AI-4RP AI-enhanced weather forecasting with DOST-ASTI",
            "National Data Lakehouse under GATES Program"
        ]
    },
    bangladesh: {
        digitalId: [
            "National ID is a smart card featuring a unique 10-digit NIN",
            "90 million NID cards achieved by 2018 under World Bank IDEAS Project"
        ],
        payments: [
            "National Payment Switch Bangladesh (NPSB) operational since 2012",
            "Fees regulated at Tk 1.5 per Tk 1,000 (Bank-to-MFS)"
        ],
        dataExchange: [
            "National E-Service Bus used by ~15 government agencies (Aug 2025)",
            "World Bank assisting with API standardization and capacity building"
        ],
        policy: [
            "National AI Policy 2026-30 (Draft V2.0)",
            "4 Pillars: Smart Government, Smart Society, Smart Economy, Smart Citizen",
            "Aligned with the Vision 2041 master plan"
        ],
        governance: [
            "Objectives mandate ethical and secure AI governance and compliance"
        ],
        legislation: [
            "Personal Data Protection Ordinance (2025)",
            "Recognizes personal data as a personal right of the data-subject",
            "Prioritizes citizen-focused control and consent-based processes"
        ],
        initiatives: [
            "MyGov platform centralizes 172 digitized services across 7 sectors",
            "Kagoj AI supports AI-driven language processing in Bangla",
            "EBLICT initiative to increase inclusion of Bengali for AI development"
        ]
    },
    nepal: {
        digitalId: [
            "Rastriya Parichaya Patra registered over 17 million people (57% of population)",
            "Mandated in 28 districts for access to pensions and health insurance",
            "Integrated with the Nagarik App"
        ],
        payments: [
            "National Payments Interface (NPI) handles ~90% of government digital expenses",
            "Processed 186 million transactions in 2024/25",
            "QR payments accepted by over 2 million merchants (117% volume growth)"
        ],
        dataExchange: [
            "Operates an Open API platform concept via the National Payments Interface"
        ],
        policy: [
            "National AI Policy 2025 aims to increase IT sector GDP contribution by 1%",
            "Goal to produce 5,000 skilled AI human resources within 5 years",
            "Establish AI Excellence Centres across all provinces"
        ],
        governance: [
            "Goal to improve Nepal’s position within the top 50 in Global Government AI Readiness",
            "Build a sustainable and reliable AI ecosystem"
        ],
        legislation: [
            "National Cyber Security Policy 2023",
            "Goal to increase Global Cyber Security Index score to 80% within 15 years",
            "Aims to protect critical national infrastructure"
        ],
        initiatives: [
            "SITA AI platform developed with UNFPA to rapidly analyze national datasets",
            "AI-based intelligent traffic light system deployed in Lalitpur Metropolitan City"
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
    const cData = strictMetrics[countryKey];

    Object.keys(mapping).forEach(mockKey => {
        const metricsArr = cData[mockKey] || [];

        // Convert array of strings into a TS array format: ["str1", "str2"]
        const metricsStr = '[\n          ' + metricsArr.map(m => `"${m.replace(/"/g, '\\"')}"`).join(',\n          ') + '\n        ]';

        // Find the specific country export block
        const countryExportRegex = new RegExp(`(export const ${countryKey}Data: CountryDetailData = \\{[\\s\\S]*?\\n\\}\\;)`, 'g');

        mockDataStr = mockDataStr.replace(countryExportRegex, (match) => {
            // Find the specific modal property inside the country block
            const propRegex = new RegExp(`(${mockKey}:\\s*\\{[\\s\\S]*?modalDetails:\\s*\\{[\\s\\S]*?keyMetrics:\\s*)\\[\\]([\\s\\S]*?\\})`, 'g');
            return match.replace(propRegex, (mathProp, p1, p2) => {
                // Inject the strictly defined array into keyMetrics
                return `${p1}${metricsStr}${p2}`;
            });
        });
    });
});

fs.writeFileSync('src/components/dashboard/MockData.ts', mockDataStr);
console.log('Successfully injected strict key metrics arrays to MockData.ts');
