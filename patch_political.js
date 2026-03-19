const fs = require('fs');

const bdSynth = JSON.parse(fs.readFileSync('bangladesh_synth_v2.json', 'utf8'));
const npSynth = JSON.parse(fs.readFileSync('nepal_synth_v2.json', 'utf8'));

// Inject precise political sub-parameters
bdSynth.sectionB.politicalSubParameters = [
    { label: 'Elections', value: 'Elections recently concluded.' },
    { label: 'Governance Structure', value: 'Centralised. Bangladesh is a democratic republic with a unicameral parliament (Jatiya Sangsad). The president appoints the head of the winning party as prime minister.' },
    { label: 'Political Stability', value: 'Poor D ranking, with major challenges in corruption. Voice and Accountability: 36.53. Political Stability: 40.90. Control of Corruption: 25.55.' },
    { label: 'Institutional Capacity', value: 'CPIA Macroeconomic management rating assesses quality of policy implementation. Scores 3 out of 6, as of 2024.' }
];

npSynth.sectionB.politicalSubParameters = [
    { label: 'Elections', value: '5 year election cycle. Mass and violent protests led to Prime Minister resignation in September 2025. Interim government appointed.' },
    { label: 'Governance Structure', value: 'Federal Democratic Republic since 2008. Seven administrative regions and a bicameral legislature.' },
    { label: 'Political Stability', value: 'Unstable. 27 Prime Ministers since 1990. Voice and Accountability: 55.80. Political Stability: 58.81. Control of Corruption: 35.05. Ranked 107 out of 143.' },
    { label: 'Institutional Capacity', value: 'CPIA Macroeconomic management rating is 3 out of 6, as of 2024.' },
    { label: 'Institutional Fragmentation', value: 'MoCIT has limited coordination power, and the e-Governance Board lacks formal authority.' },
    { label: 'Capacity Constraints', value: 'DPI understanding remains low beyond central ministries. GovTech Index: 0.439.' }
];

// Must format back into MockData
function escapeQuotesInStrings(obj) {
    if (typeof obj === 'string') {
        return obj.replace(/'/g, "\\'");
    } else if (Array.isArray(obj)) {
        return obj.map(escapeQuotesInStrings);
    } else if (obj !== null && typeof obj === 'object') {
        const result = {};
        for (const [k, v] of Object.entries(obj)) {
            result[k] = escapeQuotesInStrings(v);
        }
        return result;
    }
    return obj;
}

// Since I am only patching the existing TS file, it might be easier to just regex replace the arrays.
// But to be safe, let's extract the TS, modify, and overwrite.

let mockData = fs.readFileSync('./src/components/dashboard/MockData.ts', 'utf8');

const applyPolParam = (countryData, newParams) => {
    // Generate the string block for politicalSubParameters
    const paramsStr = "politicalSubParameters: [\n" + newParams.map(p => `      { label: '${escapeQuotesInStrings(p.label)}', value: '${escapeQuotesInStrings(p.value)}' }`).join(',\n') + "\n    ]";
    
    // Replace the block in the given string
    return countryData.replace(/politicalSubParameters:\s*\[[\s\S]*?\]/, paramsStr);
}

// Split MockData to isolate BD and NP
const bdStart = mockData.indexOf('export const bangladeshData: CountryDetailData = {');
const npStart = mockData.indexOf('export const nepalData: CountryDetailData = {');

let preBD = mockData.substring(0, bdStart);
let bdBlock = mockData.substring(bdStart, npStart);
let npBlock = mockData.substring(npStart);

bdBlock = applyPolParam(bdBlock, bdSynth.sectionB.politicalSubParameters);
npBlock = applyPolParam(npBlock, npSynth.sectionB.politicalSubParameters);

fs.writeFileSync('./src/components/dashboard/MockData.ts', preBD + bdBlock + npBlock);
console.log('Successfully applied detailed political subparameters to MockData.ts');
