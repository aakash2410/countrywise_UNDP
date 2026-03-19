const fs = require('fs');

let mockDataStr = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

// Regex to remove the keyTakeaways arrays
const takeawaysRegex = /,\s*keyTakeaways:\s*\[[\s\S]*?\]/g;

mockDataStr = mockDataStr.replace(takeawaysRegex, '');

fs.writeFileSync('src/components/dashboard/MockData.ts', mockDataStr);

console.log('Successfully reverted Key Takeaways from MockData.ts');
