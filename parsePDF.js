const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('Deliverable 1_ Scoping Report-3.pdf');

pdf(dataBuffer).then(function (data) {
    fs.writeFileSync('pdf_dump.txt', data.text);
    console.log('Dumped PDF text to pdf_dump.txt');
}).catch(e => console.error(e));
