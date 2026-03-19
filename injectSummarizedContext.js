const fs = require('fs');

let mockDataStr = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

// These summaries are crafted strictly using ONLY the text available in the Master Sheet. No external data.
const strictSummaries = {
    malaysia: {
        digitalId: "MyDigital ID (RM80M budget) is a secure, government digital identity solution facilitating access to online portals via single sign-on. It references government databases for identity verification without storing any personal data.",
        payments: "The Real-time Retail Payments Platform (RPP), launched in 2018 and operated by PayNet, is a fast payment system enabling real-time, data-rich transactions among Malaysian consumers, businesses, and government agencies.",
        dataExchange: "The Malaysian Government Central Data Exchange (MyGDX) is a secure data-sharing ecosystem allowing classified data to be coordinated efficiently across ministries, reducing integration costs and empowering data-driven governance.",
        policy: "Malaysia's AI Roadmap 2021-2025 (MOSTI) aims to augment jobs, drive national competitiveness, and encourage innovation. Outcomes focus on establishing governance, advancing R&D, and fostering AI talents securely.",
        governance: "Regulated via the National Guidelines on AI Governance and Ethics (AIGE) and ASEAN AI guides. Structured across Users, Regulators, and Developers, it is built on 7 principles including fairness, reliability, and human-centricity.",
        legislation: "Governed prominently by the Personal Data Protection Act (PDPA) 2010 (amended 2024) alongside the Computer Crimes Act 1997. The JPDP oversees enforcement, achieving a dynamic legal framework score of 4.17/5 in privacy.",
        initiatives: "Healthcare commands primary focus with initiatives like MySejahtera (Public Health Gateway), DR MATA (Diabetic Retinopathy Screening), Cof'e (Cough Sound Screening), and CODIC-MY (Remote Monitoring)."
    },
    cambodia: {
        digitalId: "Digital identity is prioritized in Phase 1 (2021-2025) of the Cambodia Digital Economy Policy Framework, focusing on the successful deployment of E-ID alongside digital payment gateways and robust cybersecurity laws.",
        payments: "Bakong operates as a primary, DPI-like overarching digital payments infrastructure.",
        dataExchange: "CamDigiKey acts as a foundational, DPI-like digital identity system facilitating governmental digital exchange.",
        policy: "The Draft National AI Strategy 2025-30 aims to transform Cambodia into a skillful AI adopter. It focuses on developing human capital, digital government excellence, Khmer-language LLM inclusion, and sovereign HPC data centers.",
        governance: "Cambodia pursues a 'soft law' approach guided by UNESCO RAM and ASEAN standards. The MPTC oversees efforts to foster a human-centered, rights-based governance ecosystem with drafts for Cybersecurity and Data Protection pending.",
        legislation: "Currently operating on a limited privacy framework. Sub-Decree 252 applies exclusively to Ministry of Interior identification data. A broader Draft Law on Personal Data Protection was pushed for public consultation in July 2025.",
        initiatives: "Key projects include the National Research Center on AI for Education, AI-based Landmine detection tools aimed at achieving a landmine-free status by 2030, and a Khmer-based LLM building on open-source frameworks."
    },
    philippines: {
        digitalId: "The Philippine Identification System (PhilSys) administers the PhilID and a unique biometric-supported identification number. Driven by the Philippine Statistics Authority, it streamlines transactions strictly under Data Privacy Act safeguards.",
        payments: "PhilPaSSplus constitutes the BSP-operated real-time gross settlement system. It enables high-value interbank fund transfers and market settlements, strengthening payment system resilience and national liquidity management.",
        dataExchange: "The eGovDX platform (DICT) enables interoperable inter-agency data sharing. Complementary retail payments rely on InstaPay, PESONet, and QR Ph for real-time, low-cost financial fund routing.",
        policy: "The National AI Strategy Roadmap (NAISR) 2.0 targets boosting R&D spending to 1.0% GDP. It centers on the Center for AI Research (CAIR) to orchestrate sustainable agriculture, resilience, and large-scale workforce upskilling.",
        governance: "Senate Bill No. 25 (AI Regulation Act) is pending. It proposes a National AI Commission, an AI Ethics Review Board, risk-based system classifications, and strict labor protections requiring advanced notification of AI workplace integration.",
        legislation: "The Data Privacy Act of 2012 (enforced by the National Privacy Commission) strictly regulates personal data processing, mandating lawful bases like consent, strict confidentiality, and 72-hour breach notifications.",
        initiatives: "Over 12 major projects, including AI-4RP (weather forecasting), iTANONG (natural language government queries), AI traffic signaling by the MMDA, the National Data Lakehouse, and a ₱1.5 Billion national AI upskilling allocation."
    },
    bangladesh: {
        digitalId: "The National ID is a microchip-embedded smart card featuring a unique 10-digit National Identification Number (NIN). It is historically foundational for verifying access to banking, mobile registration, and voting.",
        payments: "Operational since 2012, the National Payment Switch (NPSB) allows seamless, structured fund routing from customers to banks to Mobile Financial Services (MFS) with strictly regulated transfer rates.",
        dataExchange: "The National E-Service Bus connects roughly 15 government agencies (e.g. NID, agricultural ministries) by standardizing API specifications and operational technical capacity for consolidated service delivery.",
        policy: "The Draft National AI Policy 2026-30 envisions a 'Smart Bangladesh' mapped across Smart Government, Society, Economy, and Citizen. It focuses on elevating global AI readiness and ethical compliance.",
        governance: "Governance targets are woven into the AI Policy drafting mechanisms to institute ethical oversight, secure compliance mandates, and champion innovation strictly within the public sector.",
        legislation: "The Personal Data Protection Ordinance 2025 intends to establish a unified data framework prioritizing citizen-focused control, consent-based operational processes, and overarching digital sovereignty.",
        initiatives: "Prominent deployments include 'MyGov' (centralizing 172 digitized services) and 'Kagoj AI' (Bangladesh’s first Bangla-language AI processing platform enhancing dual-language digitized writing)."
    },
    nepal: {
        digitalId: "The Rastriya Parichaya Patra (National Identity) integrates closely with the Nagarik App. It is mandated for vital events, banking, and social security across millions, though physical KYC authentication hurdles remain common.",
        payments: "The National Payments Interface (NPI) consolidates APIs across public payment systems (NCHL-IPS, RPS). Operated by Nepal Clearing House Limited, it handles immense trading volumes encompassing nearly 90% of government expenses.",
        dataExchange: "Inter-agency data interoperability predominantly rides the rails of the National Payments Interface stack to orchestrate real-time financial clearing routes.",
        policy: "The National AI Policy 2025 strives to dramatically elevate socio-economic development, boost IT GDP contributions by 1%, train 5,000 AI professionals, establish provincial AI centers, and achieve universal AI literacy.",
        governance: "Directly embedded inside the overarching AI Policy objectives to orchestrate a sustainable, reliable, and secure AI ecosystem bridging public service delivery systems.",
        legislation: "Governed dynamically by the National Cyber Security Policy 2023, which aims to protect critical national infrastructure and aggressively scale Nepal's Global Cyber Security Index to 80% over 15 years.",
        initiatives: "Implementations encompass a pioneering AI-based intelligent traffic light grid in Lalitpur City and the 'SITA' AI platform which analyzes immense demographic datasets to instantly generate actionable, human-quality narrative insights."
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
    const cData = strictSummaries[countryKey];

    Object.keys(mapping).forEach(mockKey => {
        const summaryText = cData[mockKey];

        // We want to replace the modalDetails object inside the mockKey
        // It looks like:
        // modalDetails: {
        //    fullContext: "...",
        //    keyMetrics: [],
        //    timeline: ""
        // }

        const countryExportRegex = new RegExp(`(export const ${countryKey}Data: CountryDetailData = \\{[\\s\\S]*?\\n\\}\\;)`, 'g');

        mockDataStr = mockDataStr.replace(countryExportRegex, (match) => {
            const propRegex = new RegExp(`(${mockKey}:\\s*\\{[\\s\\S]*?modalDetails:\\s*\\{)[\\s\\S]*?fullContext:\\s*".*?"[\\s\\S]*?(\\})`, 'g');
            return match.replace(propRegex, (mathProp, p1, p2) => {
                const strictContext = summaryText.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\\n/g, ' ');
                // Inject strictly the summary into fullContext, keeping keyMetrics and timeline empty
                return `${p1}\n        fullContext: "${strictContext}",\n        keyMetrics: [],\n        timeline: ""\n      ${p2}`;
            });
        });
    });
});

fs.writeFileSync('src/components/dashboard/MockData.ts', mockDataStr);
console.log('Successfully injected summarized, non-hallucinated context data.');
