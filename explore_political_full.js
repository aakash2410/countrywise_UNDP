const fs = require('fs');

const bd = JSON.parse(fs.readFileSync('bangladesh_main.json', 'utf8'));
const np = JSON.parse(fs.readFileSync('nepal_main.json', 'utf8'));

function getVal(arr, keyword) {
    const row = arr.find(r => String(r['__EMPTY_4']).includes(keyword) || String(r['__EMPTY']).includes(keyword));
    if (!row) return '';
    return ((row['__EMPTY_6'] || '') + ' ' + (row['__EMPTY_7'] || '')).replace(/\n/g, ' ').trim();
}

console.log('BD Gov Struct:', getVal(bd, 'Governance structure'));
console.log('BD Pol Stab:', getVal(bd, 'Political stability and continuity'));
console.log('BD Inst Cap:', getVal(bd, 'Institutional capacity for policy'));

console.log('NP Gov Struct:', getVal(np, 'Governance structure'));
console.log('NP Pol Stab:', getVal(np, 'Political stability and continuity'));
console.log('NP Inst Cap:', getVal(np, 'Institutional capacity for policy'));
console.log('NP Inst Frag:', getVal(np, 'Institutional fragmentation and silos'));
console.log('NP Cap Const:', getVal(np, 'Capacity constraints'));
console.log('NP Pol Instab:', getVal(np, 'Political instability or transitions'));
