const fs = require('fs');
const mockData = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

function logLengths(countryRegex) {
    const match = mockData.match(countryRegex);
    if (!match) return;
    const countryStr = match[1];

    // find all fullContext: "..."
    const contexts = [...countryStr.matchAll(/title: '([^']+)',[\s\S]*?fullContext: "([^"]*)"/g)];
    console.log(`\n--- Lengths for ${countryRegex} ---`);
    contexts.forEach(m => {
        console.log(`${m[1]}: ${m[2].length} chars. Text: ${m[2]}`);
    });
}

const myRegex = /(export const malaysiaData: CountryDetailData = \{[\s\S]*?\n\};)/;
const khRegex = /(export const cambodiaData: CountryDetailData = \{[\s\S]*?\n\};)/;

logLengths(myRegex);
logLengths(khRegex);
