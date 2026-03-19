const fs = require('fs');

const mockDataPath = './src/components/dashboard/MockData.ts';
let mockData = fs.readFileSync(mockDataPath, 'utf8');

const startMarker = "export const nepalData: CountryDetailData = {";
const endMarker = "export const radarData: RadarDataPoint[] = ["; // or ending boundary

let startIdx = mockData.indexOf(startMarker);
let limitIdx = mockData.indexOf(endMarker);

if (startIdx === -1) {
    console.error("Could not find Nepal data start.");
    process.exit(1);
}

let chunk = mockData.substring(startIdx, limitIdx);

console.log("Applying detailed patches...");

// 1. Digital ID
chunk = chunk.replace(
    /(digitalId:\s*{[\s\S]*?fullContext:\s*")[^"]*(")/,
    `$1Nepal's National Identity Document system (Rastriya Parichaya Patra) is a biometric-based ID launched in 2018. It is integrated with Nagarik App and mandated in 28 districts for accessing services like pensions and health insurance. However, owing to the lack of operational authentication infrastructure, agencies still rely on physical documentation and e-KYC is not fully leveraged.$2`
);
chunk = chunk.replace(
    /(digitalId:\s*{[\s\S]*?keyMetrics:\s*\[)([\s\S]*?)(\])/,
    `$1\n          "As of 2025, over 17 million people are registered (~57% of population); approximately 6 million cards printed.",\n          "Assisted over 97% of local government units to transition to online civil registration of vital events.",\n          "The ID system is integrated with the Nagarik App and is mandated (in 28 districts) for accessing services like pensions and health insurance."\n        $3`
);
chunk = chunk.replace(
    /(digitalId:\s*{[\s\S]*?implementationAgency:\s*")[^"]*(")/,
    `$1Department of National ID and Civil Registration$2`
);

// 2. Digital Payments
chunk = chunk.replace(
    /(payments:\s*{[\s\S]*?fullContext:\s*")[^"]*(")/,
    `$1Digital Payments system comprises a National Payment Switch, an interbank payment system, and a retail payment system developed by Nepal Clearing House (NCHL) developed as public infrastructure that facilitates interoperability. NRB has also supported NepalPay QR and NepalPay Instant rails. Private digital wallets like eSewa, Khalti, and Fonepay also operate widely.$2`
);
chunk = chunk.replace(
    /(payments:\s*{[\s\S]*?keyMetrics:\s*\[)([\s\S]*?)(\])/,
    `$1\n          "National Payment Switch backbone developed by NCHL facilitating multi-vendor interoperability.",\n          "Over 2 million merchants accept QR payments rails (such as NepalPay), with volume grew 117% YoY.",\n          "In 2024/25, NCHL processed 186 million transactions covering 17% of total market volume and 77% of value."\n        $3`
);
chunk = chunk.replace(
    /(payments:\s*{[\s\S]*?implementationAgency:\s*")[^"]*(")/,
    `$1Nepal Clearing House$2`
);

// 3. Data Exchange
chunk = chunk.replace(
    /(dataExchange:\s*{[\s\S]*?fullContext:\s*")[^"]*(")/,
    `$1National Data Exchange platform planned which aims to enable multiple government bodies to securely share information through a single interface to reduce duplication and streamline operations$2`
);

// 4. Use Cases
chunk = chunk.replace(
    /description:\s*"Nagarik App - [^"]*"/,
    `description: "Nagarik App - Single online e-governance platform offering 61+ public services. Uptake remains low at ~800k users"`
);

// 5. AI Strategy
chunk = chunk.replace(
    /(policy:\s*{[\s\S]*?implementationAgency:\s*")[^"]*(")/,
    `$1MoCIT$2`
);

// 6. AI Governance
chunk = chunk.replace(
    /(governance:\s*{[\s\S]*?status:\s*')[^']*(')/,
    `$1Open to Adopt$2`
);
chunk = chunk.replace(
    /(governance:\s*{[\s\S]*?keyMetrics:\s*\[)([\s\S]*?)(\])/,
    `$1\n          "Target: Top 50 in Global Government AI Readiness Index",\n          "AI Excellence Centres planned for all 7 provinces",\n          "Mandatory AI literacy programs for all tiers of education"\n        $3`
);
chunk = chunk.replace(
    /(governance:\s*{[\s\S]*?implementationAgency:\s*")[^"]*(")/,
    `$1MoCIT$2`
);

// 7. Data Protection (Legislation)
chunk = chunk.replace(
    /(legislation:\s*{[\s\S]*?status:\s*')[^']*(')/,
    `$1Greenfield$2`
);
chunk = chunk.replace(
    /(legislation:\s*{[\s\S]*?fullContext:\s*")[^"]*(")/,
    `$1No comprehensive data protection legislation and corresponding authority. However, data privacy is governed by various laws, chief among them being The Individual Privacy Act, 2018 and Individual Privacy Regulation$2`
);
chunk = chunk.replace(
    /(legislation:\s*{[\s\S]*?keyMetrics:\s*\[)([\s\S]*?)(\])/,
    `$1\n          "No comprehensive data protection legislation.",\n          "Governed by Individual Privacy Act, 2018 and Individual Privacy Regulation"\n        $3`
);

// 8. AI Initiatives
chunk = chunk.replace(
    /(initiatives:\s*{[\s\S]*?status:\s*')[^']*(')/,
    `$1Open to Adopt$2`
);
chunk = chunk.replace(
    /(initiatives:\s*{[\s\S]*?fullContext:\s*")[^"]*(")/,
    `$1AI deployment in Nepal includes an intelligent traffic light system adjusting timings in real-time on major Lalitpur junctions. SITA is an AI platform by UNFPA that rapidly analyzes massive health datasets for rapid decision-making. Agritech tools Plantsat & Geokrishi offer satellite monitoring to farmers, while Cognify personalizes learning to reduce dropout rates.$2`
);

// 9. Section B Electricity & Political
chunk = chunk.replace(/electricityAccess:\s*\d+/, 'electricityAccess: 94');
chunk = chunk.replace(
    /politicalStability:\s*'[^']*'/,
    `politicalStability: 'WB Political Stability: 39.34 (20-40th range). e-Governance Blueprint (v2 2025) and Digital Nepal Framework 2019.'`
);

// 10. Actors changes
// Fusemachines -> Rumsan Associates
chunk = chunk.replace(
    /name:\s*"Fusemachines"[\s\S]*?role:\s*"AI Specialist"[\s\S]*?initiatives:\s*\[[^\]]*\]/,
    `name: "Rumsan Associates",\n        type: "Private Sector",\n        role: "DPG Developer",\n        initiatives: [\n          "Developed Rahat, a DPG for humanitarian agencies supporting marginalized communities"\n        ]`
);

// Add e-Governance Blueprint to MoCIT
chunk = chunk.replace(
    /(name:\s*"MoCIT"[\s\S]*?initiatives:\s*\[)([\s\S]*?)(\])/,
    `$1$2          "e-Governance Blueprint",\n$3`
);

// Development Partners WB + ADB co-financing
// We will replace inner values inside standard Asian Development Bank ID structure
chunk = chunk.replace(
    /name:\s*"Asian Development Bank \(ADB\)"[\s\S]*?initiatives:\s*\[[^\]]*\]/,
    `name: "Joint Co-financing (WB & ADB)",\n        type: "Development Partners & MDBs",\n        role: "Funding & Development Partners",\n        initiatives: [\n          "World Bank contributing $50 million and ADB contributing $40 million to Nepal Digital Transformation Project; aims to invest in digital locker platforms & open API specifications"\n        ]`
);

// Civil Society (Digital Rights Nepal -> Open Knowledge Nepal)
chunk = chunk.replace(
    /name:\s*"Digital Rights Nepal"[\s\S]*?role:\s*"Advocacy"[\s\S]*?initiatives:\s*\[[^\]]*\]/,
    `name: "Open Knowledge Nepal",\n        type: "Civil Society",\n        role: "Research & Advocacy",\n        initiatives: [\n          "Research and advocacy on digital rights and data stewardship"\n        ]`
);

// Fix ParameterStages for Data Protection directly in subParameters
chunk = chunk.replace(
    /(name:\s*"Data Protection and Privacy Legislation"[\s\S]*?stage:\s*')[^']*(')/,
    `$1Greenfield$2`
);
chunk = chunk.replace(
    /(name:\s*"AI Governance and Regulatory Frameworks and Ethical AI Principles"[\s\S]*?stage:\s*')[^']*(')/,
    `$1Open to Adopt$2`
);

mockData = mockData.substring(0, startIdx) + chunk + mockData.substring(limitIdx);
fs.writeFileSync(mockDataPath, mockData);
console.log('Successfully applied Nepal corrections.');
