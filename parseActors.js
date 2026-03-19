const fs = require('fs');
const data = JSON.parse(fs.readFileSync('Malaysia.json'));

const actorsStartIndex = data.findIndex(d => Object.values(d).some(v => typeof v === 'string' && v.toLowerCase().includes('community actor')));
console.log('Actors Start Index:', actorsStartIndex);
for(let i = actorsStartIndex; i < actorsStartIndex + 7; i++) {
   if(!data[i]) break;
   console.log('Row', i, data[i]);
}

const fundingIndex = data.findIndex(d => Object.values(d).some(v => typeof v === 'string' && v.toLowerCase().includes('funding')));
console.log('\nFunding Index:', fundingIndex);
if(fundingIndex !== -1) console.log('Row:', data[fundingIndex]);

const sourceIndex = data.findIndex(d => Object.values(d).some(v => typeof v === 'string' && v.toLowerCase().includes('source')));
console.log('\nSource Index:', sourceIndex);
if(sourceIndex !== -1) {
  for(let i = sourceIndex; i < sourceIndex + 5; i++) {
     if(!data[i]) break;
     console.log('Source Row', i, data[i]);
  }
}
