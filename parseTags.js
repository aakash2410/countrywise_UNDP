const fs = require('fs');

const dump = fs.readFileSync('pdf_dump.txt', 'utf8');
const lines = dump.split('\n');

const countries = ['Malaysia', 'Cambodia', 'Philippines', 'Nepal', 'Bangladesh'];
let currentCountry = '';
let currentSection = '';

const statusMapping = {};

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check if we hit a country header like 'Malaysia (1/4)'
    const countryMatch = countries.find(c => line.includes(`${c} (1/4)`));
    if (countryMatch) {
        currentCountry = countryMatch.toLowerCase();
        statusMapping[currentCountry] = { dpi: [], ai: [] };
        continue;
    }

    if (currentCountry && line.includes('Digital Public Infrastructure (DPI)')) {
        currentSection = 'dpi';
    } else if (currentCountry && line.includes('Artificial Intelligence(AI) Ecosystem')) {
        currentSection = 'ai';
    } else if (currentCountry && line.includes('Availability of infrastructure')) {
        currentSection = ''; // done with DPI/AI
    }

    if (currentCountry && currentSection && line.includes('Implementation status:')) {
        const status = line.split('Implementation status:')[1].trim();
        statusMapping[currentCountry][currentSection].push(status);

        // Let's also grab the line before it or next line to guess the parameter
        // Actually, let's just push an object with line index to context
        const contextLines = lines.slice(Math.max(0, i - 5), i + 2).join(' | ');
        statusMapping[currentCountry][currentSection].push({ status, context: contextLines });
    }
}

console.log(JSON.stringify(statusMapping, null, 2));
