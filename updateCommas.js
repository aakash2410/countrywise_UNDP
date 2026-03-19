const fs = require('fs');

let mockDataStr = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

mockDataStr = mockDataStr.replace(/(digitalInclusion:\s*"[^"]+")(?!\s*,)/g, '$1,');

fs.writeFileSync('src/components/dashboard/MockData.ts', mockDataStr);

console.log('Commas appended to digitalInclusion strings');
