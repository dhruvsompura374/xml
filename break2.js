const fs = require('fs');
const readline = require('readline');
const path = require('path');

const inputFile = 'myxml.xml';
const outputDir = 'output';
const chunkSize = 250 * 1024 * 1024; // 1GB in bytes

async function chunkFileByLines(inputFile, outputDir, chunkSize) {
    const readStream = fs.createReadStream(inputFile, { encoding: 'utf8' });
    const rl = readline.createInterface({ input: readStream });

    let currentChunkSize = 0;
    let chunkCounter = 1;
    let currentChunk = [];
    
    for await (const line of rl) {
        const lineSize = Buffer.byteLength(line, 'utf8') + Buffer.byteLength('\n', 'utf8');
        if (currentChunkSize + lineSize > chunkSize) {
            await writeChunk(currentChunk, chunkCounter);
            chunkCounter++;
            currentChunk = [];
            currentChunkSize = 0;
        }
        currentChunk.push(line);
        currentChunkSize += lineSize;
    }

    if (currentChunk.length > 0) {
        await writeChunk(currentChunk, chunkCounter);
    }
}

async function writeChunk(lines, chunkCounter) {
    const chunkFileName = path.join(outputDir, `chunk-${chunkCounter}.xml`);
    const fileContent = lines.join('\n') + '\n';
    await fs.promises.writeFile(chunkFileName, fileContent, 'utf8');
    console.log(`Chunk ${chunkCounter} written successfully.`);
}

// Start chunking the file by lines
chunkFileByLines(inputFile, outputDir, chunkSize);
