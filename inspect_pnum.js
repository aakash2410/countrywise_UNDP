const fs = require('fs');

function checkPNum(file) {
    const data = require(`./${file}`);
    const pNums = data.map(r => r['P#']);
    const uniquePNums = [...new Set(pNums)];
    console.log(`\n--- ${file} ---`);
    console.log(uniquePNums);
}

checkPNum('bangladesh_framework_v5.json');
checkPNum('nepal_framework_v5.json');
