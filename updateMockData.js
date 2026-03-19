const fs = require('fs');

let mockData = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

const countries = ['Malaysia', 'Cambodia', 'Phillipines', 'Bangladesh', 'Nepal'];

countries.forEach(c => {
  const json = JSON.parse(fs.readFileSync(c + '.json'));
  
  // Scrape Funding Landscape
  const fundingIndex = json.findIndex(d => Object.values(d).some(v => typeof v === 'string' && v.toLowerCase().includes('funding')));
  let fundingText = '';
  if (fundingIndex !== -1) {
    fundingText = json[fundingIndex]['__EMPTY_7'] || json[fundingIndex]['__EMPTY_8'] || json[fundingIndex]['__EMPTY_5'] || "Information not detailed.";
  }

  // Scrape Sources
  let sourcesList = [];
  const sourceIndex = json.findIndex(d => Object.values(d).some(v => typeof v === 'string' && v.toLowerCase().includes('source')));
  if (sourceIndex !== -1) {
    for(let i = sourceIndex + 1; i < json.length; i++) {
        if (!json[i]) break;
        let s = json[i]['__EMPTY_9'];
        if (s && typeof s === 'string' && s.includes('http')) {
             // Split by line breaks if multiple links in one cell
             const links = s.split('\n').filter(l => l.includes('http')).map(l => l.replace(/^\d+\.\s*/, '').trim());
             sourcesList = sourcesList.concat(links);
        }
    }
  }
  sourcesList = [...new Set(sourcesList)]; // Unique URLs

  // Inject into MockData.ts string
  const lowerC = c.toLowerCase() === 'phillipines' ? 'philippines' : c.toLowerCase();
  const searchRegex = new RegExp(`export const ${lowerC}Data: CountryDetailData = \\{[\\s\\S]*?  sectionB: \\{`, 'g');
  
  mockData = mockData.replace(searchRegex, (match) => {
     let newMatch = match.replace('sectionB: {', `sectionB: {\n    fundingLandscape: ${JSON.stringify(fundingText.trim().replace(/\n/g, ' ')).substring(0, 150) + '"},'}`);
     return newMatch;
  });

  const searchEndRegex = new RegExp(`export const ${lowerC}Data: CountryDetailData = \\{[\\s\\S]*?\\n\\};`, 'g');
  mockData = mockData.replace(searchEndRegex, (match) => {
     if (!match.includes('sources:')) {
         return match.replace('\n};', `,\n  sources: ${JSON.stringify(sourcesList)}\n};`);
     }
     return match;
  });
});

mockData = mockData.replace(/sectionB: \{/, 'sectionB: {\n    fundingLandscape?: string;');
mockData = mockData.replace(/export interface CountryDetailData \{[\s\S]*?sectionD:/, (m) => m.replace('sectionD:', 'sources?: string[];\n  sectionD:'));

fs.writeFileSync('src/components/dashboard/MockData.ts', mockData);
console.log('Updated MockData.ts');
