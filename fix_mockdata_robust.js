const fs = require('fs');

let mockData = fs.readFileSync('./src/components/dashboard/MockData.ts', 'utf8');

// Find the index of "export const bangladeshData"
const bdStart = mockData.indexOf('export const bangladeshData: CountryDetailData = {');
if (bdStart !== -1) {
    // Cut the file there
    mockData = mockData.substring(0, bdStart);
}

// Now append bangladesh and nepal data
const bangladeshSynth = JSON.parse(fs.readFileSync('bangladesh_synth_v2.json', 'utf8'));
const nepalSynth = JSON.parse(fs.readFileSync('nepal_synth_v2.json', 'utf8'));

// Format sectionD
bangladeshSynth.sectionD = {
    opportunities: [
      { id: 'bd-o1', text: 'Transition from Digital Bangladesh to Smart Bangladesh 2041 marks a shift towards AI-driven ecosystem.' }
    ],
    risks: [
      { id: 'bd-r1', text: 'Significant infrastructure progress with near-universal electricity, but digital inclusion gaps remain (rural vs urban).' }
    ],
    partnerships: [
      { id: 'bd-p1', text: 'Strong donor support (WB, ADB) is critical for scaling foundational DPI assets like the e-Service Bus.' }
    ]
};

nepalSynth.sectionD = {
    opportunities: [
      { id: 'np-o1', text: 'Rapid adoption of digital payments (Fonepay) and National ID, though authentication infrastructure is still lagging.' },
      { id: 'np-o2', text: 'Digital Nepal Framework identifies 8 sectors for growth, with a strong focus on digital foundation.' }
    ],
    risks: [
      { id: 'np-r1', text: 'Political instability remains a challenge, but digital transformation efforts have shown resilience across administrations.' }
    ],
    partnerships: []
};


function toTS(obj, name) {
    let str = JSON.stringify(obj, null, 2);
    // Remove quotes from keys
    str = str.replace(/"([^"]+)":/g, '$1:');
    // Change double quotes to single quotes for strings
    str = str.replace(/"/g, "'");
    return `\nexport const ${name}: CountryDetailData = ${str};\n`;
}

mockData += toTS(bangladeshSynth, 'bangladeshData');
mockData += toTS(nepalSynth, 'nepalData');

fs.writeFileSync('./src/components/dashboard/MockData.ts', mockData);
console.log('Fixed MockData.ts completely.');
