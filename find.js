const fs = require('fs');
const sax = require('sax');

const inputFile = 'fake.xml';
const check_numbers = [];
const targetNumber = '0309471'; // The specific number you are looking for
// Function to process XML data
function processData(chunk) {
    // Example processing: Log the chunk data
    console.log('Processing chunk:');
    console.log(chunk);
    console.log('----------------------');
}

// Function to parse and process XML data in chunks
function parseXMLInChunks(inputFile, chunkSize, targetNumber) {
    let saxStream = sax.createStream(true, { lowercase: true });
    let currentChunk = '';
    let numberFound = false;

    saxStream.on('opentag', function (node) {
        if (numberFound) return;
        // console.log(node);
        if (node.name === 'ph' && node.attributes && node.attributes.val) {
            console.log(node.attributes.val);
            check_numbers.push(node.attributes.val);
            
        }
    });

    saxStream.on('text', function (text) {
        if (numberFound) return;
        // Accumulate text content until chunkSize is reached
        currentChunk += text;
        if (Buffer.byteLength(currentChunk, 'utf8') >= chunkSize) {
            // Process the accumulated chunk
            processData(currentChunk);

            // Reset current chunk data
            currentChunk = '';
        }
    });

    saxStream.on('closetag', function (tagName) {
        if (numberFound) return;
        // Handle closing tag (if needed)
    });

    saxStream.on('end', function () {
        if (numberFound) return;
        // Process any remaining data in the last chunk
        if (currentChunk.length > 0) {
            processData(currentChunk);
        }
        console.log('XML parsing completed.');
        console.log('check_numbers',check_numbers);
        readFilesInDirectory(outputDir);

    });

    saxStream.on('error', function (error) {
        console.error('Error occurred:', error);
    });

    // Create a readable stream to read the input XML file
    const readStream = fs.createReadStream(inputFile);
    readStream.pipe(saxStream);
}

// Usage: Parse XML in chunks of 1 MB (adjust chunk size as needed)
const chunkSize = 1024 * 1024; // 1 MB in bytes
parseXMLInChunks(inputFile, chunkSize, targetNumber);



// Start the search
searchNumberInXML(inputFile, targetNumber);

const path = require('path');

const outputDir = 'output';


// Function to search for a number globally in the entire XML content
function searchNumberInXML(inputFile, targetNumber) {
    
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${inputFile}:`, err);
            return;
        }

        // Create a regular expression to search for the target number
        const regex = new RegExp(`\\b${targetNumber}\\b`);

        // Search for the target number in the XML content
        const found = regex.test(data);

        if (found) {
            console.log(`Found target number ${targetNumber} in file:`, inputFile);
        } else {
            console.log(`Target number ${targetNumber} not found in file:`, inputFile);
        }
    });
        
}

// Function to read each file in the directory
function readFilesInDirectory(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directory, file);
            searchNumberInXML(filePath, targetNumber);
        });
    });
}

// Start reading files in the output directory

// Start reading files in the output directory