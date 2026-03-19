const fs = require('fs');

const mockDataPath = './src/components/dashboard/MockData.ts';
let mockData = fs.readFileSync(mockDataPath, 'utf8');

const phStart = mockData.indexOf("export const philippinesData: CountryDetailData = {");
const bgStart = mockData.indexOf("export const bangladeshData: CountryDetailData = {");
let phChunk = mockData.substring(phStart, bgStart);

const replacements = [
    {
        key: 'digitalId',
        oldText: 'Implementation status: Implemented Program details: Philippine Identification System (PhilSys) | 2021 onwards Implementation agency: Philippine Statistics Authority (PSA) Adoption: 90 million registered Filipinos (~80% of population) as of December 2025 - Multi-modal biometrics (iris, fingerprint, facial capture) ensure unique, non-duplicable PhilSys Number (PSN) per citizen - Interoperable with banking (instant e-KYC under BSP Circular 1105) and the eGovPH Super App (Single Sign-On for health, social, and local government services)',
        newText: 'PhilSys has enrolled 90 million Filipinos (~80% of population) utilizing multi-modal biometrics to ensure a unique PhilSys Number (PSN). It is fully interoperable with the banking sector for instant e-KYC (BSP Circular 1105) and integrated with the eGovPH Super App for single sign-on access to government services.'
    },
    {
        key: 'payments',
        oldText: 'Implementation status: Implemented Program details: PhilPaSSplus (real-time gross settlement system) | BSP | ISO 20022 compliant Implementation agency: Bangko Sentral ng Pilipinas (BSP) Adoption: PHP 151.3 trillion in transactions processed in Q3 2025 (21% increase year-on-year) - Retail payment rails: InstaPay and PESONet for low-value real-time and high-value/batch transfers respectively - System expanded toward 24/7 operations in 2026; underpins national wholesale CBDC pilot',
        newText: 'PhilPaSSplus, the ISO 20022-compliant real-time gross settlement system, processed PHP 151.3 trillion in Q3 2025 (a 21% YoY increase). Supported by InstaPay and PESONet retail rails, the system is expanding toward 24/7 operations and underpins the national wholesale CBDC pilot.'
    },
    {
        key: 'dataExchange',
        oldText: 'Implementation status: Implemented Program details: eGovDX (Electronic Government Data Exchange) | DICT Implementation agency: Department of Information and Communications Technology (DICT) - Secure middleware enabling interoperable data sharing across national agencies via standardised APIs - Operates under the Data Privacy Act (RA 10173); governed by Data Sharing Agreements (DSAs) and NPC notifications - Active cross-agency use cases: DSWD–BSP social transfer targeting; PSA–BSP identity verification',
        newText: 'eGovDX provides secure middleware for interoperable data sharing across national agencies via standardised APIs. Governed by the Data Privacy Act and Data Sharing Agreements, it actively supports cross-agency use cases such as DSWD-BSP social transfers and PSA-BSP identity verification.'
    },
    {
        key: 'policy',
        oldText: '- National AI Strategy and Research Agenda 2.0 (NAISR 2.0) launched in July 2024 by the Department of Trade and Industry (DTI), covering seven strategic imperatives across infrastructure, talent, and ethical AI - Centre for AI Research (CAIR) established concurrently as the Philippines\' national AI research hub, targeting agriculture and healthcare sectors - As of 2026, implementation remains early-stage — no public monitoring framework or verified progress tracking in place (UNESCO, 2025)',
        newText: 'NAISR 2.0 (launched July 2024) outlines seven imperatives for ethical AI, infrastructure, and talent. The Center for AI Research (CAIR) targets agriculture and healthcare, though implementation remains early-stage without a verified public monitoring framework (UNESCO, 2025).'
    },
    {
        key: 'governance',
        oldText: '- No enacted AI-specific legislation as of 2026; Senate Bill No. 25 (Artificial Intelligence Regulation Act) remains in Senate committee - House Bill 7396 (comprehensive AI deployment framework) also pending enactment - DICT and Civil Service Commission published a draft Joint Memorandum Circular on Ethical AI Use in Government (April 2024) — open for public consultation; not yet enacted as of March 2026 - Draft JMC draws on OECD AI Principles, UNESCO Recommendation on Ethics of AI, and the ASEAN AI Governance Guide - No dedicated national lead agency for AI governance currently exists (UNESCO RAM, December 2025)',
        newText: 'Senate Bill No. 25 (AI Regulation Act) remains pending. A draft Joint Memorandum Circular on Ethical AI Use in Government (2024), drawing on OECD and ASEAN principles, is active but not enacted. A dedicated national lead agency for AI governance has yet to be finalized.'
    },
    {
        key: 'legislation',
        oldText: '- Data Privacy Act of 2012 (RA 10173): comprehensive, actively enforced privacy law with extraterritorial reach  - National Privacy Commission (NPC) oversees compliance; mandates 72-hour breach reporting for high-risk incidents  - NPC Advisory 2024-04 extends data privacy regulation to AI: requires Privacy Impact Assessments and \'meaningful human intervention\' in AI-driven profiling and automated decision-making  - UNDP Digital Development Compass: Philippines scores 4 in data and privacy',
        newText: 'The Data Privacy Act of 2012 is comprehensively enforced by the National Privacy Commission with 72-hour breach reporting. NPC Advisory 2024-04 extends this to AI, requiring Privacy Impact Assessments and meaningful human intervention in automated decision-making.'
    },
    {
        key: 'initiatives',
        oldText: '- National AI Center for Research and Innovation (NAICRI) launched February 2026 as the central shared high-performance computing (HPC) hub for government AI workloads - Key sector deployments:   a. Education: Project AGAP.AI (January 2026) — national AI upskilling program targeting 1.5 million learners and teachers   b. Health: UTAK AI deployed in public hospitals for brain tumour detection; AINA tool delivers AI-driven nutrition assessments for rural health workers   c. Disaster Resilience: AI-4RP (Project Gabay) — 2km resolution AI weather forecasting (DOST–Atmo Inc. partnership)   d. Governance: Digital Bayanihan Chain (January 2026) — Philippines is the first country to record its entire national budget on a blockchain ledger',
        newText: 'NAICRI (launched Feb 2026) serves as the central HPC hub. Key deployments include Project AGAP.AI for education, UTAK AI for tumor detection, AI-4RP for weather forecasting, and the Digital Bayanihan Chain recording the national budget on a blockchain ledger.'
    }
];

replacements.forEach(rep => {
    const oldSafe = rep.oldText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${rep.key}:\\s*{[\\s\\S]*?fullContext:\\s*")\\s*${oldSafe}\\s*(")`, 'g');
    phChunk = phChunk.replace(regex, `$1${rep.newText}$2`);
});

mockData = mockData.substring(0, phStart) + phChunk + mockData.substring(bgStart);
fs.writeFileSync(mockDataPath, mockData);
console.log('Successfully summarized Philippines context data.');
