const fs = require('fs');

let mockDataStr = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

// The new data extracted from the PDF dump for Nepal
const newNepalData = {
    electricityAccess: 94.0, // "94.0% in 2023 ( World Bank )Access to electricity "
    internetPenetration: 56, // "56% ( World Bank , as of 2023) Internet penetration rate "
    deviceAccess: 95.5, // "95.5% ( National Statistics Office )Access to devices "
    dataCenters: "37 data centres (Internet Society: Pulse)",
    politicalStability: "Hybrid Regime (4.6/10)", // "Hybrid Regime: 4.6/10 Ranking in the Democracy Index 2024 "
    electionCycles: "November 2022 | March 2026", // "November 2022 | March 2026 "
    politicalSubParameters: [
        { label: 'Elections', value: 'National Election cycle spans from November 2022 up to the upcoming March 2026 cycle.' },
        { label: 'Political Stability', value: 'Categorized as a Hybrid Regime (4.6/10). Saw a 10.87% increase in Political Stability Index (from 47.94 in 2014 to 58.81 in 2024).' },
        { label: 'Digital Inclusion Gaps', value: 'Higher internet access in urban areas (65%) versus rural regions (22%). Only 53% have 4G coverage and just 56% used the internet recently.' },
        { label: 'Institutional Capacity', value: 'Nepal is participating in the global 50-in-5 initiative for policy implementation.' }
    ],
    actors: [
        { id: 'nepal-g1', type: 'Government', name: 'MoCIT, Nepal e-governance board, Fonepay, NTA, OCC', role: 'Decision-makers & Implementers', initiatives: ['Fonepay collaborated with NPCI to facilitate UPI payments'] },
        { id: 'nepal-p1', type: 'Private', name: 'Leapfrog, F1Soft, Verisk Nepal, CloudFactory, Fusemachines', role: 'Implementers', initiatives: [] },
        { id: 'nepal-d1', type: 'Development Partners', name: 'World Bank, ADB, UNDP, GEF, GCF', role: 'Policy Influencers & Funders', initiatives: ['UNDP implemented $20.4M programmes in 2021', 'WB & ADB co-financed $90M Digital Transformation Project'] },
        { id: 'nepal-a1', type: 'Academia', name: 'Open Knowledge Nepal', role: 'Policy Influencers', initiatives: [] },
        { id: 'nepal-c1', type: 'Civil Society', name: 'Digital Rights Nepal', role: 'Policy Influencers & Implementers', initiatives: [] },
        { id: 'nepal-f1', type: 'Funding Orgs', name: 'NPCI (NIPL), AI Association Nepal', role: 'Funders', initiatives: [] }
    ]
};

// Target the nepalData export block
const nepalExportRegex = /(export const nepalData: CountryDetailData = \{[\s\S]*?sectionB:\s*\{)([\s\S]*?)(\},\s*sectionC:\s*\{[\s\S]*?actors:\s*\[)([\s\S]*?)(\],\s*\},[\s\S]*?\};)/g;

mockDataStr = mockDataStr.replace(nepalExportRegex, (match, part1, oldSectionBInner, part3, oldActorsInner, part5) => {

    const newSectionB = `
    fundingLandscape: "",
    electricityAccess: ${newNepalData.electricityAccess},
    internetPenetration: ${newNepalData.internetPenetration},
    deviceAccess: ${newNepalData.deviceAccess},
    dataCenters: '${newNepalData.dataCenters}',
    politicalStability: '${newNepalData.politicalStability}',
    electionCycles: '${newNepalData.electionCycles}',
    politicalSubParameters: [
      ${newNepalData.politicalSubParameters.map(p => `{ label: '${p.label}', value: '${p.value.replace(/'/g, "\\'")}' }`).join(',\n      ')}
    ]
  `;

    const newActorsStr = newNepalData.actors.map(a =>
        `      { id: '${a.id}', type: '${a.type}', name: '${a.name}', role: '${a.role}', initiatives: [${a.initiatives.map(i => `'${i.replace(/'/g, "\\'")}'`).join(', ')}] }`
    ).join(',\n');

    return `${part1}${newSectionB}${part3}\n${newActorsStr}\n    ${part5}`;
});

fs.writeFileSync('src/components/dashboard/MockData.ts', mockDataStr);
console.log("Successfully updated Nepal's Political Info, Infra, and Actors");
