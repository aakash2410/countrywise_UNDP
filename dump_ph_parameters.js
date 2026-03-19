const fs = require('fs');

const data = JSON.parse(fs.readFileSync('philippines_framework.json', 'utf8'));

data.forEach(r => {
    console.log(`[${r['P#']}] ${r['Parameter']} -> ${r['Sub-Parameter']}`);
    console.log(`  Categorisation: ${r['Categorisation ']}`);
    console.log(`  Score: ${r['Score']}`);
});
