const fs = require('fs');

let mockData = fs.readFileSync('./src/components/dashboard/MockData.ts', 'utf8');

const bdParams = [
    { label: 'Elections', value: 'Elections recently concluded.' },
    { label: 'Governance Structure', value: 'Centralised. Bangladesh is a democratic republic with a unicameral parliament (Jatiya Sangsad). The president appoints the head of the winning party as prime minister.' },
    { label: 'Political Stability', value: 'Poor D ranking, with major challenges in corruption. Voice and Accountability: 36.53. Political Stability: 40.90. Control of Corruption: 25.55.' },
    { label: 'Institutional Capacity', value: 'CPIA Macroeconomic management rating assesses quality of policy implementation. Scores 3 out of 6, as of 2024.' }
];

const npParams = [
    { label: 'Elections', value: '5 year election cycle. Mass and violent protests led to Prime Minister resignation in September 2025. Interim government appointed.' },
    { label: 'Governance Structure', value: 'Federal Democratic Republic since 2008. Seven administrative regions and a bicameral legislature.' },
    { label: 'Political Stability', value: 'Unstable. 27 Prime Ministers since 1990. Voice and Accountability: 55.80. Political Stability: 58.81. Control of Corruption: 35.05. Ranked 107 out of 143.' },
    { label: 'Institutional Capacity', value: 'CPIA Macroeconomic management rating is 3 out of 6, as of 2024.' },
    { label: 'Institutional Fragmentation', value: 'MoCIT has limited coordination power, and the e-Governance Board lacks formal authority.' },
    { label: 'Capacity Constraints', value: 'DPI understanding remains low beyond central ministries. GovTech Index: 0.439.' }
];

function escapeQuotesInStrings(obj) {
    if (typeof obj === 'string') {
        return obj.replace(/'/g, "\\'");
    }
    return obj;
}

const paramsToStr = (params) => {
    return "politicalSubParameters: [\n" + params.map(p => `      { label: '${escapeQuotesInStrings(p.label)}', value: '${escapeQuotesInStrings(p.value)}' }`).join(',\n') + "\n    ],";
}

mockData = mockData.replace(
    /(export const bangladeshData: CountryDetailData = \{[\s\S]*?sectionB: \{)([\s\S]*?)(  \},)/,
    (match, p1, p2, p3) => {
        if (!p2.includes('politicalSubParameters')) {
            return p1 + p2 + "    " + paramsToStr(bdParams) + "\n" + p3;
        } else {
            return p1 + p2.replace(/politicalSubParameters:\s*\[[\s\S]*?\],?/, paramsToStr(bdParams)) + p3;
        }
    }
);

mockData = mockData.replace(
    /(export const nepalData: CountryDetailData = \{[\s\S]*?sectionB: \{)([\s\S]*?)(  \},)/,
    (match, p1, p2, p3) => {
        if (!p2.includes('politicalSubParameters')) {
            return p1 + p2 + "    " + paramsToStr(npParams) + "\n" + p3;
        } else {
            return p1 + p2.replace(/politicalSubParameters:\s*\[[\s\S]*?\],?/, paramsToStr(npParams)) + p3;
        }
    }
);

fs.writeFileSync('./src/components/dashboard/MockData.ts', mockData);
console.log('Successfully injected politicalSubParameters');
