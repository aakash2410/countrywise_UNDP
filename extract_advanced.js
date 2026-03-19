const fs = require('fs');

function extractAdvanced(file) {
    const rows = JSON.parse(fs.readFileSync(file, 'utf8'));
    
    // Opportunities, Risks, Partnerships
    const opps = rows.filter(r => String(r['__EMPTY_4']).includes('Emerging priorities') || String(r['__EMPTY_4']).includes('Priority investment') || String(r['__EMPTY_4']).includes('Opportunities')).map((r, i) => ({
        id: `opp-${i}`,
        text: (r['__EMPTY_6'] || '') + " " + (r['__EMPTY_7'] || '').replace(/\n/g, ' ').trim()
    })).filter(o => o.text.trim().length > 10);

    const risks = rows.filter(r => String(r['__EMPTY_4']).includes('Risks') || String(r['__EMPTY_4']).includes('Challenges')).map((r, i) => ({
        id: `risk-${i}`,
        text: (r['__EMPTY_6'] || '') + " " + (r['__EMPTY_7'] || '').replace(/\n/g, ' ').trim()
    })).filter(o => o.text.trim().length > 10);

    const partnerships = rows.filter(r => String(r['__EMPTY_4']).includes('Potential partnerships') || String(r['__EMPTY_4']).includes('Entry points for UNDP')).map((r, i) => ({
        id: `part-${i}`,
        text: (r['__EMPTY_6'] || '') + " " + (r['__EMPTY_7'] || '').replace(/\n/g, ' ').trim()
    })).filter(o => o.text.trim().length > 10);

    // Filter out duplicates based on text similarity or exact match
    const unique = (arr) => {
        const seen = new Set();
        return arr.filter(item => {
            const short = item.text.substring(0, 50);
            if (seen.has(short)) return false;
            seen.add(short);
            return true;
        });
    }

    const pol_stab_row = rows.find(r => String(r['__EMPTY_4']).includes('Political stability and continuity'));
    const ele_cycle_row = rows.find(r => String(r['__EMPTY_4']).includes('election cycle'));

    return {
        opportunities: unique(opps),
        risks: unique(risks),
        partnerships: unique(partnerships),
        pol_stab: pol_stab_row ? (pol_stab_row['__EMPTY_6'] || '') : '',
        ele_cycle: ele_cycle_row ? (ele_cycle_row['__EMPTY_6'] || '') : ''
    };
}

const bd = extractAdvanced('bangladesh_main.json');
const np = extractAdvanced('nepal_main.json');

fs.writeFileSync('extracted_advanced.json', JSON.stringify({ Bangladesh: bd, Nepal: np }, null, 2));
console.log('Advanced extractions saved to extracted_advanced.json');
