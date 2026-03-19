const fs = require('fs');
let mockData = fs.readFileSync('./src/components/dashboard/MockData.ts', 'utf8');

// The Bangladesh takeaways need to be mapped to opportunities, risks, partnerships.
// Since we only have a flat list of takeaways, let's just put all in opportunities for now
// or categorize them appropriately.
// Or we can just use an empty array for risks and partnerships.

// Bangladesh Takeways:
// 1. Transition... marks a shift (Opportunity)
// 2. Significant infra progress... inclusion gaps remain (Risk)
// 3. Strong donor support (Partnership)

const bdSectionD = `sectionD: {
    opportunities: [
      { id: 'bd-o1', text: 'Transition from Digital Bangladesh to Smart Bangladesh 2041 marks a shift towards AI-driven ecosystem.' }
    ],
    risks: [
      { id: 'bd-r1', text: 'Significant infrastructure progress with near-universal electricity, but digital inclusion gaps remain (rural vs urban).' }
    ],
    partnerships: [
      { id: 'bd-p1', text: 'Strong donor support (WB, ADB) is critical for scaling foundational DPI assets like the e-Service Bus.' }
    ]
  },`;

// Nepal Takeaways
// 1. Political instability... (Risk)
// 2. Rapid adoption... (Opportunity)
// 3. Digital Nepal Framework... (Opportunity)

const npSectionD = `sectionD: {
    opportunities: [
      { id: 'np-o1', text: 'Rapid adoption of digital payments (Fonepay) and National ID, though authentication infrastructure is still lagging.' },
      { id: 'np-o2', text: 'Digital Nepal Framework identifies 8 sectors for growth, with a strong focus on digital foundation.' }
    ],
    risks: [
      { id: 'np-r1', text: 'Political instability remains a challenge, but digital transformation efforts have shown resilience across administrations.' }
    ],
    partnerships: []
  },`;


// We need to replace the sectionD in bangladeshData and nepalData
mockData = mockData.replace(
  /sectionD: \{\s*takeaways: \[\s*\{[\s\S]*?\}\s*\]\s*\},/g, 
  (match, offset, string) => {
      // Find out if it's Bangladesh or Nepal by looking at the ID
      if (match.includes('bd-t1')) return bdSectionD;
      if (match.includes('np-t1')) return npSectionD;
      return match;
  }
);

fs.writeFileSync('./src/components/dashboard/MockData.ts', mockData);
console.log('Fixed sectionD structure');
