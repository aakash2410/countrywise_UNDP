const fs = require('fs');

let mockData = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');
const countries = ['Malaysia', 'Cambodia', 'Phillipines', 'Bangladesh', 'Nepal'];

countries.forEach(c => {
  const json = JSON.parse(fs.readFileSync(c + '.json'));
  
  // Scrape Sources Extract any http links from any values in the entire JSON table to be safe
  let sourcesList = [];
  json.forEach(row => {
     Object.values(row).forEach(val => {
         if (typeof val === 'string' && val.includes('http')) {
             const links = val.split('\n').filter(l => l.includes('http')).map(l => l.replace(/^\d+\.\s*/, '').trim());
             links.forEach(l => {
                 // Clean up the match to ensure only the URL is captured if there's trailing text
                 const match = l.match(/(https?:\/\/[^\s]+)/g);
                 if (match) {
                     sourcesList = sourcesList.concat(match);
                 }
             });
         }
     });
  });

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
