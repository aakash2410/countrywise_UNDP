const fs = require('fs');

let mockDataStr = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');
const myFramework = JSON.parse(fs.readFileSync('malaysian_framework.json', 'utf8'));
const khFramework = JSON.parse(fs.readFileSync('cambodian_framework.json', 'utf8'));

// Helper config to map Sub-Parameters to Regex replacement targets in MockData.ts
// Format: target regex matching the title, then we replace status and modalDetails.fullContext.

function updateCards(countryStr, framework) {
    const aiPolicy = framework.find(f => f['Sub-Parameter'] && f['Sub-Parameter'].includes('National AI Strategy'));
    const aiGov = framework.find(f => f['Sub-Parameter'] && f['Sub-Parameter'].includes('Governance and Regulatory'));
    const aiData = framework.find(f => f['Sub-Parameter'] && f['Sub-Parameter'].includes('Data Protection and Privacy'));
    const aiInit = framework.find(f => f['Sub-Parameter'] && f['Sub-Parameter'].includes('Government AI Initiatives'));

    const dpiId = framework.find(f => f['Sub-Parameter'] && f['Sub-Parameter'].includes('Digital ID'));
    const dpiPay = framework.find(f => f['Sub-Parameter'] && f['Sub-Parameter'].includes('Digital Payments'));
    const dpiData = framework.find(f => f['Sub-Parameter'] && f['Sub-Parameter'].includes('Data Exchange'));

    const updates = [
        { title: "title: 'AI Strategy'", data: aiPolicy },
        { title: "title: 'AI Governance'", data: aiGov },
        { title: "title: 'Data Legislation'", data: aiData },
        { title: "title: 'Government AI Initiatives'", data: aiInit },
        { title: "title: 'Digital ID'", data: dpiId },
        { title: "title: 'Digital Payments'", data: dpiPay },
        { title: "title: 'Data Exchange'", data: dpiData }
    ];

    let result = countryStr;

    updates.forEach(update => {
        if (!update.data) return;

        let status = update.data['Categorisation '] || update.data['Sub-Parameter stage'] || 'Implemented';
        status = status.trim();
        // Fallback for empty
        if (status === "-" || status === "TBA" || !status) status = "Drafted";

        let context = update.data['Datapoints '] || update.data['Cambodia\'s Context'] || '';
        if (context) {
            // escape quotes and newlines safely for ts literal
            context = context.replace(/"/g, "'").replace(/\n/g, ' ');

            // We use Regex to match the block: status: '...', description: '...', implementationAgency: '...', \s* modalDetails: { \s* fullContext: "..."
            const blockRegex = new RegExp(`(${update.title}, status: )'[^']*'(.*?)fullContext: "[^"]*"`, 'gs');
            result = result.replace(blockRegex, `$1'${status}'$2fullContext: "${context}"`);
        }
    });

    // Infra and Politics Updates
    const elec = framework.find(f => f['Sub-Parameter'] && f['Sub-Parameter'].includes('Electricity Access'));
    const int = framework.find(f => f['Sub-Parameter'] && f['Sub-Parameter'].includes('Internet Penetration'));
    const dc = framework.find(f => f['Sub-Parameter'] && f['Sub-Parameter'].includes('Compute and Cloud'));
    const inc = framework.find(f => f['Sub-Parameter'] && f['Sub-Parameter'].includes('Digital Inclusion'));
    const pol = framework.find(f => f['Sub-Parameter'] && f['Sub-Parameter'].includes('WB Worldwide Governance'));

    if (elec && elec['Datapoints ']) result = result.replace(/electricityAccess: [0-9.]+,/, `electricityAccess: 100, // ${elec['Datapoints '].replace(/\n/g, ' ')}`);
    if (int && int['Datapoints ']) result = result.replace(/internetPenetration: [0-9.]+,/, `internetPenetration: 97.7, // ${int['Datapoints '].replace(/\n/g, ' ')}`);

    if (dc && dc['Datapoints ']) {
        let dcStr = dc['Datapoints '].replace(/"/g, "'").replace(/\n/g, ' ');
        result = result.replace(/dataCenters: '[^']*'/, `dataCenters: '${dcStr}'`);
    }
    if (inc && inc['Datapoints ']) {
        let incStr = inc['Datapoints '].replace(/"/g, "'").replace(/\n/g, ' ');
        result = result.replace(/digitalInclusion: "[^"]*"/, `digitalInclusion: "${incStr}"`);
    }
    if (pol && pol['Datapoints ']) {
        let polStr = pol['Datapoints '].replace(/"/g, "'").replace(/\n/g, ' ');
        result = result.replace(/politicalStability: '[^']*'/, `politicalStability: '${polStr} (Source: WB WGI 2024)'`);
    }

    return result;
}

// Slice the file strings
let myStart = mockDataStr.indexOf('export const malaysiaData');
let khStart = mockDataStr.indexOf('export const cambodiaData');
let phStart = mockDataStr.indexOf('export const philippinesData');

let myStr = mockDataStr.substring(myStart, khStart);
let khStr = mockDataStr.substring(khStart, phStart);

myStr = updateCards(myStr, myFramework);
khStr = updateCards(khStr, khFramework);

let finalStr = mockDataStr.substring(0, myStart) + myStr + khStr + mockDataStr.substring(phStart);

fs.writeFileSync('src/components/dashboard/MockData.ts', finalStr);
console.log("MockData successfully updated with framework categorisations and datapoints.");
