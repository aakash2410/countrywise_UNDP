const fs = require('fs');

let mockDataStr = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

const fundingData = {
    malaysia: "The 2025 National Budget allocates RM285M to MOSTI for AI governance and RM10M for the National AI Office (NAIO). Private sector investments are heavily focused on data centre development and smart city initiatives.",
    cambodia: "Digital transformation is included in the $10.1B national budget, with specific AI/Digital R&D targeted to rise from 0.09% of GDP. Furthermore, private actors account for a part of $10B in registered investment projects with a major focus on Fintech and logistics AI, alongside ~$3.1B in concessional loans provided to ADB.",
    philippines: "The DICT 2026 Proposed Budget allocates ₱18.9 Billion. Multilateral funding includes a $378M World Bank/AIIB Loan and $273M for the Philippine Digital Infrastructure Project (PDIP). Private sector valuation is led by GCash ($4.1 Billion) alongside roughly ~$2B projected for data centers by 2026.",
    bangladesh: "The government has aggressively prioritized digitalization, allocating ~$200 million to the ICT Division and $11 million to support digital entrepreneurship in the fiscal year 2024/25. Important multilateral support is also active via World Bank and ADB loans.",
    nepal: "In 2021, UNDP Nepal implemented development programmes across the nation with a total expenditure of $20.4 million. The World Bank and the ADB have also jointly co-financed the Nepal Digital Transformation Project, contributing $50 million and $40 million respectively."
};

const countries = ['malaysia', 'cambodia', 'philippines', 'bangladesh', 'nepal'];

countries.forEach(country => {
    // Escaping the $ signs so JS doesn't treat them as replacement patterns!
    const safeString = fundingData[country].replace(/\$/g, '$$$$');

    // Replace EVERYTHING between 'sectionB: {' and 'electricityAccess:'
    // Because the corrupted string is the first property in sectionB, this safely deletes the bloat.
    const blockRegex = new RegExp(`(export const ${country}Data: CountryDetailData = \\{[\\s\\S]*?sectionB:\\s*\\{\\s*)([\\s\\S]*?)(,\\s*electricityAccess)`);

    mockDataStr = mockDataStr.replace(blockRegex, `$1fundingLandscape: "${safeString}"$3`);
});

fs.writeFileSync('src/components/dashboard/MockData.ts', mockDataStr);
console.log("MockData successfully repaired with escaped replacement strings via sectionB wiping.");
