const fs = require('fs');
const contextData = JSON.parse(fs.readFileSync('context_data.json', 'utf8'));

let mockDataStr = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

const mapping = {
    digitalId: 'Digital ID',
    payments: 'Digital Payments',
    dataExchange: 'Data Exchange',
    policy: 'AI Strategy',
    governance: 'AI Governance',
    legislation: 'Data Legislation',
    initiatives: 'Government AI Initiatives'
};

const countryKeys = ['malaysia', 'cambodia', 'philippines', 'bangladesh', 'nepal'];

countryKeys.forEach(countryKey => {
    const cNamePattern = countryKey === 'philippines' ? 'Phillipines' : countryKey.charAt(0).toUpperCase() + countryKey.slice(1);
    const data = contextData[cNamePattern];

    Object.keys(mapping).forEach(mockKey => {
        const rawValue = data[mapping[mockKey]] || '';

        // We want to replace the modalDetails object inside the mockKey
        const regex = new RegExp(`(${mockKey}:\\s*\\{[\\s\\S]*?modalDetails:\\s*\\{)[\\s\\S]*?(\\})`, 'g');

        // Check if the country block exists in the match (we just replace globally, but only within the specific country's export)
        // Actually, applying global replace for a key like 'digitalId' will hit all countries. Let's do a targeted replace.

        const countryExportRegex = new RegExp(`(export const ${countryKey}Data: CountryDetailData = \\{[\\s\\S]*?\\n\\}\\;)`, 'g');

        mockDataStr = mockDataStr.replace(countryExportRegex, (match) => {
            const propRegex = new RegExp(`(${mockKey}:\\s*\\{[\\s\\S]*?modalDetails:\\s*\\{)[\\s\\S]*?(\\})`, 'g');
            return match.replace(propRegex, (mathProp, p1, p2) => {
                const strictContext = rawValue.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\\n/g, ' ');
                return `${p1}\n        fullContext: "${strictContext}",\n        keyMetrics: [],\n        timeline: ""\n      ${p2}`;
            });
        });
    });
});

// Also purge infraModalDetails and politicalModalDetails entirely to prevent any hallucinated data from rendering.
mockDataStr = mockDataStr.replace(/infraModalDetails:\s*\{[\s\S]*?\},\n?/g, '');
mockDataStr = mockDataStr.replace(/politicalModalDetails:\s*\{[\s\S]*?\},\n?/g, '');

fs.writeFileSync('src/components/dashboard/MockData.ts', mockDataStr);
console.log('Successfully injected pure context data and scrubbed hallucinated fields.');
