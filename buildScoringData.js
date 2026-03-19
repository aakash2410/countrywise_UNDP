const fs = require('fs');

const rawData = JSON.parse(fs.readFileSync('new_framework.json', 'utf8'));

// Filter out items that actually represent framework stages (they have Stage 1)
const frameworkItems = rawData.filter(item => item["Stage 1\n Greenfield\n(No Activity)"]);

const groupedItems = [];
let currentParameter = "";

frameworkItems.forEach(item => {
    if (item.Parameter && item.Parameter !== currentParameter) {
        currentParameter = item.Parameter.replace(/ \n/, ' ');
    }

    groupedItems.push({
        parameter: currentParameter,
        subParameter: item["Sub-Parameter"].replace(/\n/g, ' '),
        greenfield: item["Stage 1\n Greenfield\n(No Activity)"].replace(/\n/g, ' '),
        openToAdopt: item["Stage 2\n Open to Adopt\n(Intent / Planning)"].replace(/\n/g, ' '),
        earlySuccess: item["Stage 3\nEarly Success\n(Strategy/framework published)"].replace(/\n/g, ' '),
        maturing: item["Stage 4\nMaturing\n(Implementation)"].replace(/\n/g, ' '),
        roleModel: item["Stage 5\n Role Model\n(Leadership and  scaling)"].replace(/\n/g, ' ')
    });
});

const tsCode = `export const scoringCriteria = ${JSON.stringify(groupedItems, null, 4)};`;
fs.writeFileSync('src/components/dashboard/NewScoringData.ts', tsCode);
console.log("Successfully generated src/components/dashboard/NewScoringData.ts !");
