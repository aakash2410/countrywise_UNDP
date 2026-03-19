const fs = require('fs');

let mockData = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

// =========================================================================
// HELPER: replace a fullContext within a specific country block
// =========================================================================
function replaceInBlock(data, blockStart, blockEnd, title, newContext) {
    let block = data.substring(blockStart, blockEnd);
    const esc = newContext.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ');
    const regex = new RegExp(`(title: '${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'[\\s\\S]*?fullContext: )"[^"]*"`, 'g');
    block = block.replace(regex, `$1"${esc}"`);
    return data.substring(0, blockStart) + block + data.substring(blockEnd);
}

function replaceStatusInBlock(data, blockStart, blockEnd, title, newStatus) {
    let block = data.substring(blockStart, blockEnd);
    const regex = new RegExp(`(title: '${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}', status: )'[^']*'`);
    block = block.replace(regex, `$1'${newStatus}'`);
    return data.substring(0, blockStart) + block + data.substring(blockEnd);
}

function replaceDescInBlock(data, blockStart, blockEnd, title, newDesc) {
    let block = data.substring(blockStart, blockEnd);
    const regex = new RegExp(`(title: '${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}', status: '[^']*', description: )'[^']*'`);
    block = block.replace(regex, `$1'${newDesc}'`);
    return data.substring(0, blockStart) + block + data.substring(blockEnd);
}

// =========================================================================
// MALAYSIA UPDATES
// =========================================================================
let myStart = mockData.indexOf('export const malaysiaData');
let myEnd = mockData.indexOf('export const cambodiaData');

// AI Strategy - Score 4 = Maturing | Summarized context
mockData = replaceStatusInBlock(mockData, myStart, myEnd, 'AI Strategy', 'Maturing');
mockData = replaceInBlock(mockData, myStart, myEnd, 'AI Strategy',
    "Malaysia's AI Roadmap 2021-2025, overseen by the National AI Office (est. 2024), aims to augment jobs and drive innovation across 5 priority sectors. As of Q3 2024, implementation stands at 63% completion.");

// AI Governance - Score 3 = Early Success
myEnd = mockData.indexOf('export const cambodiaData');
mockData = replaceStatusInBlock(mockData, myStart, myEnd, 'AI Governance', 'Early Success');
mockData = replaceInBlock(mockData, myStart, myEnd, 'AI Governance',
    "Guided by the voluntary National Guidelines on AI Governance & Ethics (AIGE), Malaysia aims for safe and trustworthy AI deployment built on seven core principles. No AI-specific legislation is enacted yet.");

// Data Legislation - Score 4 = Maturing
myEnd = mockData.indexOf('export const cambodiaData');
mockData = replaceStatusInBlock(mockData, myStart, myEnd, 'Data Legislation', 'Maturing');
mockData = replaceInBlock(mockData, myStart, myEnd, 'Data Legislation',
    "Governed by the Personal Data Protection (Amendment) Act 2024, enforced by the JPDP. Malaysia scores 4.17/5 in data privacy and 5/5 in cybersecurity on the UNDP Digital Development Compass.");

// Government AI Initiatives - Score 4 = Maturing
myEnd = mockData.indexOf('export const cambodiaData');
mockData = replaceStatusInBlock(mockData, myStart, myEnd, 'Government AI Initiatives', 'Maturing');
mockData = replaceInBlock(mockData, myStart, myEnd, 'Government AI Initiatives',
    "11 national AI use cases defined across healthcare, agriculture, smart cities, education, and public services. Key deployments include DR. MATA for diabetic retinopathy, AI traffic analysis in Kuala Lumpur, and the National Fraud Portal.");

// Digital ID - Score 4 = Maturing
myEnd = mockData.indexOf('export const cambodiaData');
mockData = replaceStatusInBlock(mockData, myStart, myEnd, 'Digital ID', 'Maturing');
mockData = replaceInBlock(mockData, myStart, myEnd, 'Digital ID',
    "MyDigital ID (RM80M allocation) is a secure government-backed digital identity enabling single sign-on for online portals, with 8.7M registered users. Goal: 95% of federal services integrated by 2030.");

// Digital Payments - Score 4 = Maturing
myEnd = mockData.indexOf('export const cambodiaData');
mockData = replaceStatusInBlock(mockData, myStart, myEnd, 'Digital Payments', 'Maturing');
mockData = replaceInBlock(mockData, myStart, myEnd, 'Digital Payments',
    "The Real-time Retail Payments Platform (DuitNow), launched in 2018 and operated by PayNet, facilitated 5.3 billion transactions (RM5.4T value) in 2024. Over 70% of the adult population has made at least one digital payment.");

// Data Exchange - Score 4 = Maturing
myEnd = mockData.indexOf('export const cambodiaData');
mockData = replaceStatusInBlock(mockData, myStart, myEnd, 'Data Exchange', 'Maturing');
mockData = replaceInBlock(mockData, myStart, myEnd, 'Data Exchange',
    "The Malaysian Government Central Data Exchange (MyGDX), managed by MAMPU since 2018, supports 657 users and 35 million transactions to empower data-driven governance across ministries.");

// Malaysia Infrastructure updates
myEnd = mockData.indexOf('export const cambodiaData');
let myBlock = mockData.substring(myStart, myEnd);
myBlock = myBlock.replace(/dataCenters: '[^']*'/, "dataCenters: '87 data centres as of Nov 2024; RM114.7B in data centre and cloud investments (2021-2023)'");
myBlock = myBlock.replace(/digitalInclusion: "[^"]*"/, 'digitalInclusion: "Nearly equal access for men and women, urban and rural areas."');
mockData = mockData.substring(0, myStart) + myBlock + mockData.substring(myEnd);

// Malaysia Funding Landscape
myEnd = mockData.indexOf('export const cambodiaData');
myBlock = mockData.substring(myStart, myEnd);
myBlock = myBlock.replace(/fundingLandscape: "[^"]*"/, 'fundingLandscape: "The 2025 Budget allocates RM285M to MOSTI for AI governance and RM10M for NAIO. Between 2021-2023, Malaysia attracted RM114.7B in data centre investments. In 2024, over USD 18B in foreign AI investments were secured from Microsoft, Google, ByteDance, and Oracle."');
mockData = mockData.substring(0, myStart) + myBlock + mockData.substring(myEnd);

// =========================================================================
// CAMBODIA UPDATES
// =========================================================================
let khStart = mockData.indexOf('export const cambodiaData');
let khEnd = mockData.indexOf('export const philippinesData');

// AI Strategy - Open to Adopt
mockData = replaceStatusInBlock(mockData, khStart, khEnd, 'AI Strategy', 'Open to Adopt');
mockData = replaceInBlock(mockData, khStart, khEnd, 'AI Strategy',
    "The National AI Strategy 2025-30 (drafted by MPTC) outlines six strategic priorities including a skilled workforce, digital government excellence, Khmer language inclusion via a national LLM, and establishing a National AI and Data Science Lab.");

// AI Governance - Open to Adopt
khEnd = mockData.indexOf('export const philippinesData');
mockData = replaceStatusInBlock(mockData, khStart, khEnd, 'AI Governance', 'Open to Adopt');
mockData = replaceInBlock(mockData, khStart, khEnd, 'AI Governance',
    "AI governance is being built through UNESCO RAM recommendations and the National AI Strategy. Cambodia scored 55/100 in the UNESCO AI Readiness Assessment, with data protection and cybersecurity laws still in draft stage.");

// Data Legislation - Open to Adopt
khEnd = mockData.indexOf('export const philippinesData');
mockData = replaceStatusInBlock(mockData, khStart, khEnd, 'Data Legislation', 'Open to Adopt');
mockData = replaceInBlock(mockData, khStart, khEnd, 'Data Legislation',
    "Sub-Decree 252 governs only MOI-held personal data. A comprehensive Draft Law on Personal Data Protection was released for public consultation in July 2025, expected to create a broader legal framework.");

// Government AI Initiatives - Early Success
khEnd = mockData.indexOf('export const philippinesData');
mockData = replaceStatusInBlock(mockData, khStart, khEnd, 'Government AI Initiatives', 'Early Success');
mockData = replaceInBlock(mockData, khStart, khEnd, 'Government AI Initiatives',
    "Key initiatives include AI-assisted landmine detection (CMAC), the National Research Center on AI for Education (inaugurated Nov 2025), and a partnership with AI Singapore to develop an open-source Khmer Large Language Model.");

// Digital ID - Early Success
khEnd = mockData.indexOf('export const philippinesData');
mockData = replaceInBlock(mockData, khStart, khEnd, 'Digital ID',
    "CamDigiKey, launched by the Ministry of Economy & Finance, serves as Cambodia's national e-KYC platform. With only ~86K downloads out of 18M population, adoption is concentrated in business-related government services.");

// Digital Payments - Maturing
khEnd = mockData.indexOf('export const philippinesData');
mockData = replaceInBlock(mockData, khStart, khEnd, 'Digital Payments',
    "Bakong, Cambodia's sovereign blockchain-based digital payment system under the National Bank of Cambodia, achieves ~100M transactions per month and reaches 60% of the adult population.");

// Data Exchange - Maturing
khEnd = mockData.indexOf('export const philippinesData');
mockData = replaceInBlock(mockData, khStart, khEnd, 'Data Exchange',
    "CamDX is the unified data exchange layer for the Cambodian government, deployed across 22 ministries and processing 1M transactions monthly. It also powers Verify.gov.kh for secure document verification.");

// Cambodia Infrastructure
khEnd = mockData.indexOf('export const philippinesData');
let khBlock = mockData.substring(khStart, khEnd);
khBlock = khBlock.replace(/dataCenters: '[^']*'/, "dataCenters: '4 modern data centres established; cloud services sparsely available. Only 11% of institutions have on-premises GPU processors'");
khBlock = khBlock.replace(/digitalInclusion: "[^"]*"/, 'digitalInclusion: "Stark urban-rural gap with internet usage concentrated among young urban users. UNICEF reports digital literacy restrictions for rural women."');
mockData = mockData.substring(0, khStart) + khBlock + mockData.substring(khEnd);

// Cambodia Funding Landscape
khEnd = mockData.indexOf('export const philippinesData');
khBlock = mockData.substring(khStart, khEnd);
khBlock = khBlock.replace(/fundingLandscape: "[^"]*"/, 'fundingLandscape: "The government approved over $10B in investments in 2025, with AI/DPI R&D targeted to rise from 0.09% of GDP. However, dedicated domestic public funding for AI/DPI remains limited, with heavy reliance on external development assistance and annual project-tied approvals."');
mockData = mockData.substring(0, khStart) + khBlock + mockData.substring(khEnd);

// =========================================================================
// PHILIPPINES UPDATES
// =========================================================================
let phStart = mockData.indexOf('export const philippinesData');
let phEnd = mockData.indexOf('export const bangladeshData');

// AI Strategy - Score 3 = Early Success  
mockData = replaceStatusInBlock(mockData, phStart, phEnd, 'AI Strategy', 'Early Success');
mockData = replaceInBlock(mockData, phStart, phEnd, 'AI Strategy',
    "NAISR 2.0 launched July 2024 by DTI, covering seven strategic imperatives. The Centre for AI Research (CAIR) targets agriculture and healthcare. Implementation remains early-stage with no public monitoring framework yet in place.");

// AI Governance - Score 2 = Open to Adopt
phEnd = mockData.indexOf('export const bangladeshData');
mockData = replaceStatusInBlock(mockData, phStart, phEnd, 'AI Governance', 'Open to Adopt');
mockData = replaceInBlock(mockData, phStart, phEnd, 'AI Governance',
    "Senate Bill No. 25 (AI Regulation Act) remains in committee. DICT and CSC published a draft Joint Memorandum Circular on Ethical AI Use in Government (April 2024) drawing on OECD and UNESCO principles, but it is not yet enacted.");

// Data Legislation - Score 4 = Maturing
phEnd = mockData.indexOf('export const bangladeshData');
mockData = replaceStatusInBlock(mockData, phStart, phEnd, 'Data Legislation', 'Maturing');
mockData = replaceInBlock(mockData, phStart, phEnd, 'Data Legislation',
    "The Data Privacy Act of 2012 (RA 10173) is comprehensive and actively enforced by the National Privacy Commission. NPC Advisory 2024-04 extends regulation to AI, requiring Privacy Impact Assessments and meaningful human intervention in automated decision-making.");

// Government AI Initiatives - Score 4 = Maturing
phEnd = mockData.indexOf('export const bangladeshData');
mockData = replaceStatusInBlock(mockData, phStart, phEnd, 'Government AI Initiatives', 'Maturing');
mockData = replaceInBlock(mockData, phStart, phEnd, 'Government AI Initiatives',
    "NAICRI launched Feb 2026 as the national HPC hub. Key deployments include Project AGAP.AI (1.5M learners), UTAK AI for brain tumour detection, AI weather forecasting (AI-4RP), and the Digital Bayanihan Chain for budget transparency.");

// Digital ID - Score 4 = Maturing
phEnd = mockData.indexOf('export const bangladeshData');
mockData = replaceStatusInBlock(mockData, phStart, phEnd, 'Digital ID', 'Maturing');
mockData = replaceInBlock(mockData, phStart, phEnd, 'Digital ID',
    "PhilSys has enrolled 90 million Filipinos (~80% of population) with multi-modal biometrics. It is interoperable with banking (BSP Circular 1105 for instant e-KYC) and the eGovPH Super App for single sign-on across government services.");

// Digital Payments - Score 4 = Maturing
phEnd = mockData.indexOf('export const bangladeshData');
mockData = replaceStatusInBlock(mockData, phStart, phEnd, 'Digital Payments', 'Maturing');
mockData = replaceInBlock(mockData, phStart, phEnd, 'Digital Payments',
    "PhilPaSSplus (ISO 20022 compliant) processed PHP 151.3 trillion in Q3 2025 (up 21% YoY). Retail rails include InstaPay and PESONet, with system expansion toward 24/7 operations in 2026 underpinning a wholesale CBDC pilot.");

// Data Exchange - Score 4 = Maturing
phEnd = mockData.indexOf('export const bangladeshData');
mockData = replaceStatusInBlock(mockData, phStart, phEnd, 'Data Exchange', 'Maturing');
mockData = replaceInBlock(mockData, phStart, phEnd, 'Data Exchange',
    "eGovDX (DICT) provides secure middleware for interoperable data sharing across national agencies via standardised APIs, governed by the Data Privacy Act and Data Sharing Agreements. Active cross-agency use cases include DSWD-BSP and PSA-BSP integrations.");

// Philippines Infrastructure
phEnd = mockData.indexOf('export const bangladeshData');
let phBlock = mockData.substring(phStart, phEnd);
phBlock = phBlock.replace(/electricityAccess: [0-9.]+,/, 'electricityAccess: 89,');
phBlock = phBlock.replace(/internetPenetration: [0-9.]+,/, 'internetPenetration: 83.8,');
phBlock = phBlock.replace(/dataCenters: '[^']*'/, "dataCenters: '28 operational colocation facilities (632.80 MW); Google Cloud first PH region in 2026; NAICRI shared HPC via DOST-ASTI COARE'");
phBlock = phBlock.replace(/digitalInclusion: "[^"]*"/, 'digitalInclusion: "47.5 percentage point gap between Metro Manila (68.7%) and Zamboanga Peninsula (21.2%). Near gender parity but affordability remains the primary barrier for 58% of unconnected households."');
phBlock = phBlock.replace(/politicalStability: '[^']*'/, "politicalStability: 'WB Political Stability: 52.67 percentile (40-60th range). E-Governance Act (RA 12254) institutionalises DT as state policy. (Source: WB WGI 2024)'");
mockData = mockData.substring(0, phStart) + phBlock + mockData.substring(phEnd);

// Philippines Funding
phEnd = mockData.indexOf('export const bangladeshData');
phBlock = mockData.substring(phStart, phEnd);
phBlock = phBlock.replace(/fundingLandscape: "[^"]*"/, 'fundingLandscape: "2026 National Budget: PHP 6.793 trillion with record DepEd allocation of PHP 992.7B. World Bank digital portfolio totals USD 1.637B. Digital Bayanihan Chain records the entire national budget on blockchain for fiscal transparency."');
mockData = mockData.substring(0, phStart) + phBlock + mockData.substring(phEnd);

// =========================================================================
// RADAR CHART SCORE UPDATES
// =========================================================================

function getScore(text) {
    if (!text) return null;
    let t = text.toString().toLowerCase().trim();
    if (t.includes('greenfield') || t === '1') return 1;
    if (t.includes('open to adopt') || t.includes('open') || t === '2') return 2;
    if (t.includes('early success') || t.includes('early stage') || t === '3') return 3;
    if (t.includes('maturing') || t.includes('maturity') || t === '4') return 4;
    if (t.includes('role model') || t === '5') return 5;
    return null;
}

function calculateScores(framework, datapointKey) {
    const scores = { 'P1': [], 'P2': [], 'P3': [], 'P4': [], 'P5': [], 'P6': [] };
    framework.forEach(f => {
        const pNum = f['P#'];
        if (pNum && scores[pNum]) {
            let sc = f['Score'] ? parseInt(f['Score']) : null;
            if (!sc) sc = getScore(f['Parameter Stage']);
            if (!sc) sc = getScore(f['Sub-Parameter stage']);
            if (!sc) sc = getScore(f['Categorisation ']);
            if (sc) scores[pNum].push(sc);
        }
    });
    const averages = {};
    for (const [p, vals] of Object.entries(scores)) {
        averages[p] = vals.length > 0 ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 3;
    }
    return averages;
}

const myFramework = JSON.parse(fs.readFileSync('malaysian_framework_v2.json', 'utf8'));
const khFramework = JSON.parse(fs.readFileSync('cambodian_framework_v2.json', 'utf8'));
const phFramework = JSON.parse(fs.readFileSync('philippines_framework_v2.json', 'utf8'));

const myAvg = calculateScores(myFramework);
const khAvg = calculateScores(khFramework);
const phAvg = calculateScores(phFramework);

console.log("Malaysia:", myAvg);
console.log("Cambodia:", khAvg);
console.log("Philippines:", phAvg);

const mapping = [
    { name: 'AI Ecosystem Maturity', p: 'P1' },
    { name: 'DPI Ecosystem Maturity', p: 'P2' },
    { name: 'Digital Infra Availability', p: 'P3' },
    { name: 'Political Stability', p: 'P4' },
    { name: 'Stakeholder Participation', p: 'P5' },
    { name: 'Funding Landscape', p: 'P6' },
];

mapping.forEach(m => {
    const regex = new RegExp(`({ parameter: '${m.name}', Malaysia: )[0-9]+(, Cambodia: )[0-9]+(, Philippines: )[0-9]+(,)`);
    mockData = mockData.replace(regex, `$1${myAvg[m.p]}$2${khAvg[m.p]}$3${phAvg[m.p]}$4`);
});

fs.writeFileSync('src/components/dashboard/MockData.ts', mockData);
console.log("\nAll three countries updated successfully in MockData.ts!");
