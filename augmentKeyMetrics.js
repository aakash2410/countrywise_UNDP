const fs = require('fs');

let mockDataStr = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

const pdfAugmentations = {
    malaysia: {
        policy: ["RM285M allocated to MOSTI for AI governance and RM10M for National AI Office (NAIO) in 2025 Budget"],
        payments: ["5.3 billion transactions recorded in 2024, representing RM5.4T transaction value"],
        dataExchange: ["MyGDX currently supports 657 users and 35 million transactions"]
    },
    cambodia: {
        digitalId: ["CamDigiKey adoption currently stands at ~86,000 users"],
        policy: ["AI Strategy is integrated into the $10.1B national budget, targeting an R&D rise from current 0.09% GDP"],
        dataExchange: ["Verify.gov Cambodia successfully integrated for national government document verification"]
    },
    philippines: {
        digitalId: ["90.02 Million registered users (~80% of population) utilizing PhilSys backed by a ₱30B budget"],
        payments: ["Projected ₱24.745 trillion in total transaction value by the end of 2025 across InstaPay and PESONet"],
        dataExchange: ["eGov PH Super App achieved 5M+ downloads with 42 out of 75 NGAs integrated successfully"],
        policy: ["Center for AI Research (CAIR) launched alongside machine learning optimization (ALAM Project)"]
    },
    bangladesh: {
        digitalId: ["Youth aged 16 or above now eligible for NID cards as of February 2026", "Tk 70.63 crore allocated for NID initiatives spanning 2026-27"],
        payments: ["Regulated transaction fees: Bank-to-MFS set at Tk 1.5/Tk 1,000; MFS-to-bank at Tk 8.5/Tk 1,000"],
        dataExchange: ["National E-Service Bus utilization scaled to 15 key Bangladeshi government agencies as of August 2025"]
    },
    nepal: {
        digitalId: ["Rastriya Parichaya Patra enrollment reached 57% of the total demographic population"],
        payments: ["NPI processed 186 million transactions, covering 17% of total market volume but 77% of value"]
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
    const augData = pdfAugmentations[countryKey];
    if (!augData) return;

    Object.keys(augData).forEach(mockKey => {
        const additionalMetrics = augData[mockKey] || [];

        if (additionalMetrics.length > 0) {
            // We will use regex to find the keyMetrics array for the specific parameter and append our strings to it
            const countryExportRegex = new RegExp(`(export const ${countryKey}Data: CountryDetailData = \\{[\\s\\S]*?\\n\\}\\;)`, 'g');

            mockDataStr = mockDataStr.replace(countryExportRegex, (match) => {
                const propRegex = new RegExp(`(${mockKey}:\\s*\\{[\\s\\S]*?modalDetails:\\s*\\{[\\s\\S]*?keyMetrics:\\s*\\[)([\\s\\S]*?)(\\])`, 'g');

                return match.replace(propRegex, (mathProp, p1, p2, p3) => {
                    // p2 contains the existing stringified items inside the keyMetrics array
                    // if it's not empty, make sure it ends with a comma
                    let existingInner = p2.trim();
                    if (existingInner.length > 0 && !existingInner.endsWith(',')) {
                        existingInner += ',';
                    }

                    const newMetricsStr = additionalMetrics.map(m => `\n          "${m.replace(/"/g, '\\"')}"`).join(',');

                    return `${p1}\n          ${existingInner}${newMetricsStr}\n        ${p3}`;
                });
            });
        }
    });
});

fs.writeFileSync('src/components/dashboard/MockData.ts', mockDataStr);
console.log('Successfully appended PDF numeric and qualitative updates to existing Key Metrics arrays.');
