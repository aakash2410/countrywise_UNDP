const fs = require('fs');
const countries = ['Malaysia', 'Cambodia', 'Phillipines', 'Bangladesh', 'Nepal'];

countries.forEach(c => {
  const json = JSON.parse(fs.readFileSync(c + '.json'));
  let sourcesList = [];
  json.forEach(row => {
     Object.values(row).forEach(val => {
         if (typeof val === 'string' && val.includes('http')) {
             const links = val.split('\n').filter(l => l.includes('http')).map(l => l.replace(/^\d+\.\s*/, '').trim());
             links.forEach(l => {
                 const match = l.match(/(https?:\/\/[^\s]+)/g);
                 if (match) {
                     sourcesList = sourcesList.concat(match);
                 }
             });
         }
     });
  });
  sourcesList = [...new Set(sourcesList)];
  console.log(`Extracted ${sourcesList.length} sources for ${c}`);
  if (sourcesList.length > 0) {
     console.log(sourcesList.slice(0, 2));
  }
});
