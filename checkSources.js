const fs = require('fs');

const countries = ['Malaysia', 'Cambodia', 'Phillipines', 'Bangladesh', 'Nepal'];

countries.forEach(c => {
  const json = JSON.parse(fs.readFileSync(c + '.json'));
  const sourceIndex = json.findIndex(d => Object.values(d).some(v => typeof v === 'string' && v.toLowerCase().includes('source')));
  console.log(`\n--- ${c} Source Index: ${sourceIndex} ---`);
  
  if (sourceIndex !== -1) {
    for(let i = sourceIndex; i < sourceIndex + 4; i++) {
       if(!json[i]) break;
       console.log(`Row ${i}`, Object.keys(json[i]).map(k => `${k}: ${String(json[i][k]).substring(0, 30)}`));
    }
  }
});
