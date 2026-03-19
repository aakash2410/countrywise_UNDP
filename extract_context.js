const fs = require('fs');

function extractCountry(file) {
    const rows = JSON.parse(fs.readFileSync(file, 'utf8'));
    
    // helper to find a row containing a keyword in __EMPTY_4 (Parameters) or __EMPTY_2 (Sub-Heading)
    const findRow = (keyword) => {
        return rows.find(r => {
            const param = r['__EMPTY_4'] ? String(r['__EMPTY_4']).toLowerCase() : '';
            const subHeading = r['__EMPTY_2'] ? String(r['__EMPTY_2']).toLowerCase() : '';
            return param.includes(keyword.toLowerCase()) || subHeading.includes(keyword.toLowerCase());
        });
    };

    const formatMetrics = (desc) => {
        if (!desc) return [];
        return desc.split('\n')
            .filter(s => s.trim().length > 3 && s.trim() !== '-')
            .map(s => s.replace(/^-/, '').trim());
    };

    const extract = (row, fallbackRow) => {
        let r = row || fallbackRow;
        if (!r) return { summary: '', desc: '', metrics: [''] };
        const summary = (r['__EMPTY_6'] || '').replace(/\n/g, ' ').trim();
        const desc = (r['__EMPTY_7'] || '').replace(/\n/g, ' ').trim();
        const metricsRaw = r['__EMPTY_7'] || r['__EMPTY_6'] || '';
        const metrics = formatMetrics(metricsRaw).slice(0, 4);
        return { summary, desc, metrics: metrics.length ? metrics : [summary || 'No data'] };
    };

    return {
        ai_policy: extract(findRow('National AI strategy')),
        ai_gov: extract(findRow('AI Governance frameworks')),
        ai_legis: extract(findRow('Data protection')),
        ai_init: extract(findRow('Government AI Initiatives')),
        
        dpi_id: extract(findRow('Digital ID')),
        dpi_pay: extract(findRow('Digital payment')),
        dpi_data: extract(findRow('Data exchange')),

        pol_stab: extract(findRow('Political stability')),
        pol_elec: extract(findRow('election cycle'))
    };
}

const bd = extractCountry('bangladesh_main.json');
const np = extractCountry('nepal_main.json');

fs.writeFileSync('extracted_contexts.json', JSON.stringify({ Bangladesh: bd, Nepal: np }, null, 2));
console.log('Extracted contexts saved to extracted_contexts.json');
