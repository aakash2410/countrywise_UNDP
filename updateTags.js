const fs = require('fs');

let mockDataStr = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

// These derived exactly from the 'Implementation status: <value>' tags found in the new PDF.
// Where the PDF left the template placeholder 'Planned/Pilot/Implemented', we don't overwrite the sheet's existing insight.
const tagUpdates = {
    malaysia: {
        digitalId: "Implemented",
        payments: "Implemented",
        dataExchange: "Implemented",
        policy: "Implemented",
        governance: "Implemented",
        legislation: "Implemented",
        initiatives: "Implemented"
    },
    cambodia: {
        digitalId: "Implemented",
        payments: "Implemented",
        dataExchange: "Implemented",
        policy: "Drafted",
        governance: "Drafted",
        legislation: "Drafted"
    },
    philippines: {
        digitalId: "Implemented",
        payments: "Implemented",
        dataExchange: "Implemented"
    },
    bangladesh: {
        digitalId: "Implemented",
        payments: "Implemented",
        dataExchange: "Implemented",
        policy: "Drafted",
        initiatives: "Drafted",
        legislation: "Implemented"
    },
    nepal: {
        digitalId: "Implemented",
        payments: "Implemented",
        dataExchange: "Implemented",
        policy: "Implemented",
        initiatives: "Implemented",
        legislation: "Implemented"
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
    const updates = tagUpdates[countryKey];
    if (!updates) return;

    Object.keys(updates).forEach(mockKey => {
        const newStatus = updates[mockKey];
        if (newStatus) {
            // Find the specific country export block
            const countryExportRegex = new RegExp(`(export const ${countryKey}Data: CountryDetailData = \\{[\\s\\S]*?\\n\\}\\;)`, 'g');

            mockDataStr = mockDataStr.replace(countryExportRegex, (countryBlock) => {
                // Find the specific component block and replace its status
                const propRegex = new RegExp(`(${mockKey}:\\s*\\{[\\s\\S]*?title:\\s*'.*?',\\s*status:\\s*')[^']*?(')`, 'g');
                return countryBlock.replace(propRegex, `$1${newStatus}$2`);
            });
        }
    });
});

fs.writeFileSync('src/components/dashboard/MockData.ts', mockDataStr);
console.log('Successfully updated component implementation status tags based on PDF.');
