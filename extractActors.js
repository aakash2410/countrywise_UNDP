const fs = require('fs');
let mockData = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');
const countries = ['Malaysia', 'Cambodia', 'Phillipines', 'Bangladesh', 'Nepal'];

countries.forEach(c => {
  const json = JSON.parse(fs.readFileSync(c + '.json'));
  
  // Find start index of actors
  const startIndex = json.findIndex(d => Object.values(d).some(v => typeof v === 'string' && v.toLowerCase().includes('community actor')));
  
  if (startIndex !== -1) {
    let actors = [];
    let idCounter = 1;

    for (let i = startIndex + 1; i < json.length; i++) {
      const row = json[i];
      if (!row) break;
      
      const name = row['__EMPTY_7'] || row['__EMPTY_6'];
      if (!name || (name + '').trim() === '') break; // break if empty

      // If hitting a new section, break
      if (typeof name === 'string' && (name.includes('Opportunities') || name.includes('Risks'))) break;

      let roleOrActions = row['__EMPTY_8'] || '';
      let initiativesStr = row['__EMPTY_9'] || '';
      let sectorOrType = row['__EMPTY_5'] || 'Government';
      
      let initArray = initiativesStr.split('\n').map(x => x.replace(/^-\s*/, '').trim()).filter(x => x.length > 0);
      if (initArray.length === 0 && roleOrActions) {
          initArray = roleOrActions.split('\n').map(x => x.replace(/^-\s*/, '').trim()).filter(x => x.length > 0);
      }
      
      actors.push({
        id: `act-${c.substring(0,3).toLowerCase()}-${idCounter++}`,
        name: name.toString().replace(/'/g, "\\'").replace(/\n/g, " ").trim(),
        type: sectorOrType.toString().replace(/'/g, "\\'").replace(/\n/g, " ").trim(),
        role: roleOrActions.toString().replace(/'/g, "\\'").replace(/\n/g, " ").substring(0, 150),
        initiatives: initArray
      });
    }

    if (actors.length > 0) {
      // Build replacement string
      let actorsStr = 'actors: [\n';
      actors.forEach(a => {
        actorsStr += `      { id: '${a.id}', name: '${a.name}', type: '${a.type}', role: '${a.role}', initiatives: ${JSON.stringify(a.initiatives)} },\n`;
      });
      actorsStr += '    ]';

      const lowerC = c.toLowerCase() === 'phillipines' ? 'philippines' : c.toLowerCase();
      
      // Regex to replace actors array exactly
      const regex = new RegExp(`export const ${lowerC}Data: CountryDetailData = \\{[\\s\\S]*?  sectionC: \\{\\s*actors: \\[[\\s\\S]*?\\]\\s*\\},`, 'g');
      
      mockData = mockData.replace(regex, (match) => {
         return match.replace(/actors: \[\s*[\s\S]*?\s*\]/, actorsStr);
      });
      console.log(`Extracted ${actors.length} actors for ${c}`);
    }
  }
});

fs.writeFileSync('src/components/dashboard/MockData.ts', mockData);
console.log('Finished updating actors.');
