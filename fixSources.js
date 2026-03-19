const fs = require('fs');

let mockData = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');
const countries = ['Malaysia', 'Cambodia', 'Phillipines', 'Bangladesh', 'Nepal'];

countries.forEach(c => {
  const json = JSON.parse(fs.readFileSync(c + '.json'));
  
  // Scrape Sources
  let sourcesList = [];
  const sourceIndex = json.findIndex(d => Object.values(d).some(v => typeof v === 'string' && v.toLowerCase().includes('source')));
  if (sourceIndex !== -1) {
    for(let i = sourceIndex + 1; i < json.length; i++) {
        if (!json[i]) break;
        let s = json[i]['__EMPTY_9'];
        if (s && typeof s === 'string' && s.includes('http')) {
             const links = s.split('\n').filter(l => l.includes('http')).map(l => l.replace(/^\d+\.\s*/, '').trim());
             sourcesList = sourcesList.concat(links);
        }
    }
  }
  sourcesList = [...new Set(sourcesList)]; // Unique URLs
  
  console.log(`Extracted ${sourcesList.length} sources for ${c}`);

  // Inject into MockData.ts string
  const lowerC = c.toLowerCase() === 'phillipines' ? 'philippines' : c.toLowerCase();
  
  // Find the exact block for the country to replace its sources
  const regex = new RegExp(`export const ${lowerC}Data: CountryDetailData = \\{[\\s\\S]*?\\n\\};`, 'g');
  
  mockData = mockData.replace(regex, (match) => {
     return match.replace(/sources:\s*\[[\s\S]*?\]/g, `sources: ${JSON.stringify(sourcesList)}`);
  });
});

fs.writeFileSync('src/components/dashboard/MockData.ts', mockData);
console.log('Finished updating sources.');
