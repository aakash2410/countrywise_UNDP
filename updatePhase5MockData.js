const fs = require('fs');

let mockDataStr = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

const digitalInclusionData = {
    malaysia: "Nearly equal access for men and women, urban and rural areas.",
    cambodia: "Gender divide more evident in rural areas for digital access.",
    philippines: "Significant geographic gap between Metro Manila (~68.7% penetration) and regions like BARMM (27.7%) or Zamboanga (21.2%).",
    bangladesh: "Higher access in urban areas (71.3% men, 62.4% women) vs rural (36.6% men, 23% women). Overall geographic divide: 66.8% vs 29.7%.",
    nepal: "Higher internet access in urban areas (65%) versus rural regions (22%). Only 53% have 4G coverage."
};

// 1. Add digitalInclusion property to SectionB interface if it doesn't exist
if (!mockDataStr.includes('digitalInclusion?:')) {
    mockDataStr = mockDataStr.replace(/deviceAccess:\s*number;/, 'deviceAccess: number;\n    digitalInclusion?: string;');
}

const countries = ['malaysia', 'cambodia', 'philippines', 'bangladesh', 'nepal'];

countries.forEach(country => {
    // 2. Add digitalInclusion to each country's sectionB
    const regInclude = new RegExp(`(export const ${country}Data: CountryDetailData = \\{[\\s\\S]*?sectionB:\\s*\\{[\\s\\S]*?)(deviceAccess:\\s*[0-9.]+)(,)`);
    mockDataStr = mockDataStr.replace(regInclude, `$1$2,\n    digitalInclusion: "${digitalInclusionData[country]}"`);

    // 3. Append (Source: Democracy Index 2024) to Political Stability if it's not already there
    const regPolStab = new RegExp(`(export const ${country}Data: CountryDetailData = \\{[\\s\\S]*?sectionB:\\s*\\{[\\s\\S]*?politicalStability:\\s*')([^']+)(')`);
    mockDataStr = mockDataStr.replace(regPolStab, (match, prefix, val, suffix) => {
        if (!val.includes('(Source: Democracy Index 2024)')) {
            return `${prefix}${val} (Source: Democracy Index 2024)${suffix}`;
        }
        return match;
    });
});

fs.writeFileSync('src/components/dashboard/MockData.ts', mockDataStr);
console.log("MockData updated with Digital Inclusion and Democracy Index citations.");
