const fs = require('fs');
const path = require('path');

const inputFile = 'myxml.xml';
const outputDir = 'output';
const chunkSize = 250 * 1024 * 1024; // 500MB in bytes
let chunkCounter = 1;

const readStream = fs.createReadStream(inputFile, { highWaterMark: chunkSize });

readStream.on('data', (chunk) => {
    const chunkFileName = path.join(outputDir, `chunk-${chunkCounter}.xml`);
    fs.writeFile(chunkFileName, chunk, (err) => {
        if (err) {
            console.error(`Error writing chunk ${chunkCounter}:`, err);
        } else {
            console.log(`Chunk ${chunkCounter} written successfully.`);
        }
    });
    chunkCounter++;
});

readStream.on('error', (err) => {
    console.error('Error reading input file:', err);
});
