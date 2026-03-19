const fs = require('fs');
const pdf = require('pdf-parse');

async function extractText(pdfPath, outputPath) {
    try {
        let dataBuffer = fs.readFileSync(pdfPath);
        const data = await pdf(dataBuffer);
        fs.writeFileSync(outputPath, data.text, 'utf-8');
        console.log(`Successfully extracted text to ${outputPath}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

const args = process.argv.slice(2);
if (args.length < 2) {
    console.log("Usage: node extract_pdf.js <pdf_path> <output_path>");
} else {
    extractText(args[0], args[1]);
}
