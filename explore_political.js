const fs = require('fs');

const bd = JSON.parse(fs.readFileSync('bangladesh_main.json', 'utf8'));
const np = JSON.parse(fs.readFileSync('nepal_main.json', 'utf8'));

console.log("BANGLADESH POLITICAL CONTEXT:");
bd.forEach(r => {
    const heading = String(r['__EMPTY'] || '');
    const param = String(r['__EMPTY_4'] || '');
    if(heading.includes('Political') || param.includes('Political') || param.includes('Governance') || param.includes('Capacit') || param.includes('Institutional')) {
        console.log(`P: ${param} | V: ${(r['__EMPTY_7'] || r['__EMPTY_6'] || '').substring(0, 100).replace(/\n/g, ' ')}`);
    }
});

console.log("\nNEPAL POLITICAL CONTEXT:");
np.forEach(r => {
    const heading = String(r['__EMPTY'] || '');
    const param = String(r['__EMPTY_4'] || '');
    if(heading.includes('Political') || param.includes('Political') || param.includes('Governance') || param.includes('Capacit') || param.includes('Institutional')) {
         console.log(`P: ${param} | V: ${(r['__EMPTY_7'] || r['__EMPTY_6'] || '').substring(0, 100).replace(/\n/g, ' ')}`);
    }
});
