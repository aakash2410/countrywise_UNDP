const fs = require('fs');

function dumpDetails(file, outName) {
    const data = require(`./${file}`);
    let output = '';
    data.forEach(r => {
        if (r['P#'] && String(r['P#']).startsWith('P')) {
            output += `\n[${r['P#']}] ${r['Parameter']} -> ${r['Sub-Parameter']}\n`;
            output += `  Maturity: ${r['Bangladesh Maturity level'] || r['Nepal Maturity level'] || r['Categorisation ']}\n`;
            output += `  Overall Score: ${r['Score']}\n`;
            output += `  Overall Param Scoring: ${r['Parameter scoring ']}\n`;
            output += `  Datapoints: ${r['Data points'] || r['Datapoints']}\n`;
        }
    });
    fs.writeFileSync(outName, output);
}

dumpDetails('bangladesh_framework_v5.json', 'bd_dump.txt');
dumpDetails('nepal_framework_v5.json', 'np_dump.txt');
console.log('Saved dumps.');
