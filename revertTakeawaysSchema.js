const fs = require('fs');

let mockDataStr = fs.readFileSync('src/components/dashboard/MockData.ts', 'utf8');

// Regex to remove the keyTakeaways definition from the interface
const interfaceDefRegex = /\s*keyTakeaways\?:\s*string\[\];/g;

mockDataStr = mockDataStr.replace(interfaceDefRegex, '');

fs.writeFileSync('src/components/dashboard/MockData.ts', mockDataStr);

console.log('Successfully reverted Key Takeaways interface definition from MockData.ts');
