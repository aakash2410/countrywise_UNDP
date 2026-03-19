const fs = require('fs');

const myMain = JSON.parse(fs.readFileSync('malaysia_main.json', 'utf8'));
const khMain = JSON.parse(fs.readFileSync('cambodia_main.json', 'utf8'));

// Summaries for Malaysia
const myShort = {
    // Original: 193 ch
    "Digital ID": "MyDigital ID (RM80M allocation) is a secure, government-backed digital identity solution enabling single sign-on for online portals, with 8.7M registered users.",
    // Original: 259 ch
    "Digital Payments": "The Real-time Retail Payments Platform, launched in 2018 and operated by PayNet, facilitated 5.3 billion transactions (RM5.4T total value) in 2024.",
    // Original: 254
    "Data Exchange": "The Malaysian Government Central Data Exchange (MyGDX) ecosystem currently supports 657 users and 35 million transactions to empower data-driven governance.",
    // Original: 362
    "AI Strategy": "Malaysia\'s AI Roadmap 2021-2025, overseen by the National AI Office, aims to augment jobs and drive innovation. As of Q3 2024, implementation is 63% complete.",
    // Original: 659
    "AI Governance": "Guided by the voluntary National Guidelines on AI Governance & Ethics (AIGE), Malaysia seeks to foster safe and trustworthy AI deployment guided by seven core AI principles.",
    // Original: 433
    "Data Legislation": "Governed by the Personal Data Protection (Amendment) Act 2024 and overseen by the JPDP. Malaysia scores 4.17/5 in privacy and 5/5 in cybersecurity."
};

// Summarizing Malaysia Govt Initiatives (was 1229 chars)
const myInit = "The Federal and State governments have spearheaded numerous AI initiatives. Key examples include 'DR. MATA' for diabetic retinopathy detection, real-time AI traffic analysis in Kuala Lumpur, the National Fraud Portal (NFP) to combat financial fraud, and the world's first AI-driven smart palm oil mill.";

// Expanding Cambodia using cambodia_main.json
// Let's find Cambodia's info from khMain
let khDict = {};
khMain.forEach(row => {
    khDict[row['Sub-Parameter']] = row['Cambodia’s Context'] || row['Data Points / Information  '] || '';
});

// We need contexts for KH: Digital ID, Digital Payments, Data Exchange, AI Strategy, AI Governance, Data Legislation, Government AI Initiatives.
console.log("KH Extracted Contexts:");
console.log("Digital ID:", khDict['Digital ID']);
console.log("Digital Payments:", khDict['Digital Payments']);
console.log("Data Exchange:", khDict['Data Exchange']);
console.log("AI Strategy:", khDict['National AI Strategy / Policy Status']);
console.log("AI Governance:", khDict['AI Governance and Regulatory Frameworks and Ethical AI Principles']);
console.log("Data Legislation:", khDict['Data Protection and Privacy Legislation']);
console.log("AI Init:", khDict['Government AI Initiatives and Projects']);

let mockData = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

// Replace Malaysia's blocks
Object.keys(myShort).forEach(title => {
    let regex = new RegExp(`({ title: '${title}'[\\s\\S]*?fullContext: )"[^"]*"`, 'g');
    // Only apply to Malaysia block
    let startIdx = mockData.indexOf('export const malaysiaData');
    let endIdx = mockData.indexOf('export const cambodiaData');
    let myBlock = mockData.substring(startIdx, endIdx);
    myBlock = myBlock.replace(regex, `$1"${myShort[title]}"`);
    mockData = mockData.substring(0, startIdx) + myBlock + mockData.substring(endIdx);
});
// Special for Govt Initiatives
let myInitRegex = new RegExp(`({ title: 'Government AI Initiatives'[\\s\\S]*?fullContext: )"[^"]*"`, 'g');
let mStart = mockData.indexOf('export const malaysiaData');
let mEnd = mockData.indexOf('export const cambodiaData');
let mBlock = mockData.substring(mStart, mEnd);
mBlock = mBlock.replace(myInitRegex, `$1"${myInit}"`);
mockData = mockData.substring(0, mStart) + mBlock + mockData.substring(mEnd);

fs.writeFileSync('src/components/dashboard/MockData.ts', mockData);
console.log("Updated MockData.ts with Malaysia Summaries.");
