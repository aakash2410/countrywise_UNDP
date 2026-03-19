const fs = require('fs');

const bangladeshSynth = JSON.parse(fs.readFileSync('bangladesh_synth_v2.json', 'utf8'));
const nepalSynth = JSON.parse(fs.readFileSync('nepal_synth_v2.json', 'utf8'));

let mockData = fs.readFileSync('./src/components/dashboard/MockData.ts', 'utf8');

// Update Radar Data
mockData = mockData.replace(
    /\{ parameter: 'AI Ecosystem Maturity', Malaysia: 4, Cambodia: 2, Philippines: 3, Bangladesh: 2, Nepal: 0, fullMark: 5 \},/,
    "{ parameter: 'AI Ecosystem Maturity', Malaysia: 4, Cambodia: 2, Philippines: 3, Bangladesh: 1, Nepal: 2, fullMark: 5 },"
);
mockData = mockData.replace(
    /\{ parameter: 'DPI Ecosystem Maturity', Malaysia: 3, Cambodia: 4, Philippines: 4, Bangladesh: 3, Nepal: 0, fullMark: 5 \},/,
    "{ parameter: 'DPI Ecosystem Maturity', Malaysia: 3, Cambodia: 4, Philippines: 4, Bangladesh: 2, Nepal: 3, fullMark: 5 },"
);
mockData = mockData.replace(
    /\{ parameter: 'Digital Infra Availability', Malaysia: 5, Cambodia: 2, Philippines: 3, Bangladesh: 3, Nepal: 0, fullMark: 5 \},/,
    "{ parameter: 'Digital Infra Availability', Malaysia: 5, Cambodia: 2, Philippines: 3, Bangladesh: 1, Nepal: 2, fullMark: 5 },"
);
mockData = mockData.replace(
    /\{ parameter: 'Political Stability', Malaysia: 4, Cambodia: 4, Philippines: 4, Bangladesh: 2, Nepal: 0, fullMark: 5 \},/,
    "{ parameter: 'Political Stability', Malaysia: 4, Cambodia: 4, Philippines: 4, Bangladesh: 1, Nepal: 1, fullMark: 5 },"
);
mockData = mockData.replace(
    /\{ parameter: 'Stakeholder Participation', Malaysia: 3, Cambodia: 3, Philippines: 4, Bangladesh: 3, Nepal: 0, fullMark: 5 \},/,
    "{ parameter: 'Stakeholder Participation', Malaysia: 3, Cambodia: 3, Philippines: 4, Bangladesh: 2, Nepal: 1, fullMark: 5 },"
);
mockData = mockData.replace(
    /\{ parameter: 'Funding Landscape', Malaysia: 3, Cambodia: 2, Philippines: 4, Bangladesh: 2, Nepal: 0, fullMark: 5 \},/,
    "{ parameter: 'Funding Landscape', Malaysia: 3, Cambodia: 2, Philippines: 4, Bangladesh: 2, Nepal: 1, fullMark: 5 },"
);

// We need to properly stringify the JSON as TS code
function toTS(obj) {
    if (obj.countryName === 'Bangladesh') {
        const str = JSON.stringify(obj, null, 2).replace(/"([^"]+)":/g, '$1:').replace(/"/g, "'");
        return `export const bangladeshData: CountryDetailData = ${str};\n`;
    }
    const str = JSON.stringify(obj, null, 2).replace(/"([^"]+)":/g, '$1:').replace(/"/g, "'");
    return `export const nepalData: CountryDetailData = ${str};\n`;
}

const bdReplacementPattern = /export const bangladeshData: CountryDetailData = \{[\s\S]*?^};\n/m;
const npReplacementPattern = /export const nepalData: CountryDetailData = \{[\s\S]*?^};\n/m;

// Replace Bangladesh Data
mockData = mockData.replace(bdReplacementPattern, toTS(bangladeshSynth));
// Try matching till end of file for Nepal
const npPattern = /export const nepalData: CountryDetailData = \{[\s\S]*?^\};\n?/m;
mockData = mockData.replace(npPattern, toTS(nepalSynth));


fs.writeFileSync('./src/components/dashboard/MockData.ts', mockData);
console.log('Updated MockData.ts');
