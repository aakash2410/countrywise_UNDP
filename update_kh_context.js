const fs = require('fs');

const khShort = {
    "Digital ID": "CamDigiKey – A DPI-like digital identification app with over 50k downloads out of a population of 18 million.",
    "Digital Payments": "Bakong – A DPI-like baseline payment infrastructure handling approximately 100 Million transactions per month.",
    "Data Exchange": "Cam-DX – A DPI-like data exchange system currently used by 22 ministries, processing 1M transactions per month.",
    "AI Strategy": "The National AI Strategy 2025-30 is currently in the draft stage. Its vision is to transform Cambodia into a skillful adopter of AI.",
    "AI Governance": "Guided by the UNESCO AI Readiness Assessment, Cambodia is focusing on drafting legislation on Personal Data Protection alongside soft-law ethical frameworks.",
    "Data Legislation": "Currently governed by Sub-Decree 252 (applicable only to MOI data). A comprehensive Draft Law on Personal Data Protection went into public consultation in July 2025.",
    "Government AI Initiatives": "Initiatives include the National Research Center on AI for Education, AI-powered landmine detection, and a partnership with AI Singapore to develop an open-source Khmer LLM."
};

let mockData = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

Object.keys(khShort).forEach(title => {
    let regex = new RegExp(`({ title: '${title}'[\\s\\S]*?fullContext: )"[^"]*"`, 'g');
    // Only apply to Cambodia
    let startIdx = mockData.indexOf('export const cambodiaData');
    let endIdx = mockData.indexOf('export const philippinesData');
    let khBlock = mockData.substring(startIdx, endIdx);
    khBlock = khBlock.replace(regex, `$1"${khShort[title]}"`);
    mockData = mockData.substring(0, startIdx) + khBlock + mockData.substring(endIdx);
});

fs.writeFileSync('src/components/dashboard/MockData.ts', mockData);
console.log("Updated MockData.ts with Cambodia manual context summaries.");
