// const fs = require('fs');

// const readStream = fs.createReadStream('myxml.xml');

// readStream.on('data', chunk => {
//     // process the data chunk
//     console.log(chunk.toString());
// });

// readStream.on('end', () => {
//     console.log('file has been read completely');
// });

// const fs = require('fs');
// const sax = require('sax');

// const inputFile = 'myxml.xml';
// const targetNumber = '3210224'; // The specific number you are looking for

// // Function to process XML data
// function processData(chunk) {
//     // Example processing: Log the chunk data
//     console.log('Processing chunk:');
//     console.log(chunk);
//     console.log('----------------------');
// }

// // Function to parse and process XML data in chunks
// function parseXMLInChunks(inputFile, chunkSize, targetNumber) {
//     let saxStream = sax.createStream(true, { lowercase: true });
//     let currentChunk = '';
//     let numberFound = false;

//     saxStream.on('opentag', function (node) {
//         if (numberFound) return;
//         console.log(node);
//         if (node.name === 'ph' && node.attributes && node.attributes.val) {
//             if (node.attributes.val === targetNumber) {
//                 console.log('Found target number:', node.attributes.val);
//                 numberFound = true;
//                 this.close(); // Stop the parser
//             }
//         }
//     });

//     saxStream.on('text', function (text) {
//         if (numberFound) return;
//         // Accumulate text content until chunkSize is reached
//         currentChunk += text;
//         if (Buffer.byteLength(currentChunk, 'utf8') >= chunkSize) {
//             // Process the accumulated chunk
//             processData(currentChunk);

//             // Reset current chunk data
//             currentChunk = '';
//         }
//     });

//     saxStream.on('closetag', function (tagName) {
//         if (numberFound) return;
//         // Handle closing tag (if needed)
//     });

//     saxStream.on('end', function () {
//         if (numberFound) return;
//         // Process any remaining data in the last chunk
//         if (currentChunk.length > 0) {
//             processData(currentChunk);
//         }
//         console.log('XML parsing completed.');
//     });

//     saxStream.on('error', function (error) {
//         console.error('Error occurred:', error);
//     });

//     // Create a readable stream to read the input XML file
//     const readStream = fs.createReadStream(inputFile);
//     readStream.pipe(saxStream);
// }

// // Usage: Parse XML in chunks of 1 MB (adjust chunk size as needed)
// const chunkSize = 1024 * 1024; // 1 MB in bytes
// parseXMLInChunks(inputFile, chunkSize, targetNumber);


// -- start

// const fs = require('fs');

// const inputFile = 'output/chunk-1.xml';
// const targetNumber = 7882457; // The specific number you are looking for

// // Function to search for a number globally in the entire XML content
// function searchNumberInXML(inputFile, targetNumber) {
//     fs.readFile(inputFile, 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error reading the file:', err);
//             return;
//         }

//         // Create a regular expression to search for the target number
//         const regex = new RegExp(`\\b${targetNumber}\\b`);
        
//         // Search for the target number in the XML content
//         const found = regex.test(data);

//         if (found) {
//             console.log('Found target number:', targetNumber);
//         } else {
//             console.log('Target number not found in the XML.');
//         }
//     });
// }

// // Start the search
// searchNumberInXML(inputFile, targetNumber);

// const fs = require('fs');
// const path = require('path');

// const outputDir = 'output';
// const targetNumber = 1914794; // The specific number you are looking for

// // Function to search for a number globally in the entire XML content
// function searchNumberInXML(inputFile, targetNumber) {
//     fs.readFile(inputFile, 'utf8', (err, data) => {
//         if (err) {
//             console.error(`Error reading file ${inputFile}:`, err);
//             return;
//         }

//         // Create a regular expression to search for the target number
//         const regex = new RegExp(`\\b${targetNumber}\\b`);

//         // Search for the target number in the XML content
//         const found = regex.test(data);

//         if (found) {
//             console.log(`Found target number ${targetNumber} in file:`, inputFile);
//         } else {
//             console.log(`Target number ${targetNumber} not found in file:`, inputFile);
//         }
//     });
// }

// // Function to read each file in the directory
// function readFilesInDirectory(directory) {
//     fs.readdir(directory, (err, files) => {
//         if (err) {
//             console.error('Error reading directory:', err);
//             return;
//         }

//         files.forEach(file => {
//             const filePath = path.join(directory, file);
//             searchNumberInXML(filePath, targetNumber);
//         });
//     });
// }

// // Start reading files in the output directory
// readFilesInDirectory(outputDir);

const fs = require('fs').promises;
const path = require('path');

const outputDir = 'output';
const targetNumber = 7882457; // The specific number you are looking for

// Function to search for a number and remove the row containing it in the XML content
async function searchAndRemoveNumberInXML(inputFile, targetNumber) {
    try {
        const data = await fs.readFile(inputFile, 'utf8');

        // Split the content into lines
        const lines = data.split('\n');
        // Create a regular expression to search for the target number
        const regex = new RegExp(`\\b${targetNumber}\\b`);

        // Filter out the lines that contain the target number
        const filteredLines = lines.filter(line => !regex.test(line));

        // Join the filtered lines back into a single string
        const updatedContent = filteredLines.join('\n');

        // Write the updated content back to the file
        await fs.writeFile(inputFile, updatedContent, 'utf8');
        console.log(`Updated file ${inputFile}, removed rows containing target number ${targetNumber}`);
    } catch (err) {
        console.error(`Error processing file ${inputFile}:`, err);
    }
}

// Function to read each file in the directory and process them concurrently
async function readFilesInDirectory(directory) {
    try {
        const files = await fs.readdir(directory);
        const tasks = files.map(file => {
            const filePath = path.join(directory, file);
            return searchAndRemoveNumberInXML(filePath, targetNumber);
        });
        await Promise.all(tasks);
        console.log('Processing completed for all files.');
    } catch (err) {
        console.error('Error reading directory:', err);
    }
}

// Start reading files in the output directory
readFilesInDirectory(outputDir);



// End-----------

// const fs = require('fs');

// const readStream = fs.createReadStream('myxml.xml');
// let data = '';

// readStream.on('data', chunk => {
//     // console.log(chunk);
//     data += chunk;
//     // Process each chunk as needed
// });

// readStream.on('end', () => {
//     // Process complete data after all chunks are read
//     console.log('File read successfully.');
// });

// readStream.on('error', err => {
//     console.error('Error reading file:', err);
// });


// const fs = require('fs');
// const sax = require('sax');

// const inputFile = 'myxml.xml'; // Replace with your XML file path
// const maxFileSizeBytes = 1024 * 1024; // 2 GB in bytes
// let currentFileSize = 0;
// let currentChunkNumber = 1;
// let currentWriteStream = null;

// // Create a SAX stream to parse XML
// const saxStream = sax.createStream(true, { lowercase: true });

// // Event handler for opening tags
// saxStream.on('opentag', function(node) {
//     // Open a new file chunk if current file size limit is reached
//     if (currentFileSize >= maxFileSizeBytes) {
//         currentWriteStream.end(); // End the current stream
//         currentChunkNumber++;
//         currentFileSize = 0;
//     }

//     // Start writing to a new file chunk
//     if (!currentWriteStream) {
//         const outputFileName = `output_chunk_${currentChunkNumber}.xml`;
//         currentWriteStream = fs.createWriteStream(outputFileName);
//     }

//     // Write the opening tag to the current stream
//     currentWriteStream.write(`<${node.name}>`);
//     currentFileSize += Buffer.byteLength(`<${node.name}>`, 'utf8');
// });

// // Event handler for closing tags
// saxStream.on('closetag', function(tagName) {
//     // Write the closing tag to the current stream
//     currentWriteStream.write(`</${tagName}>`);
//     currentFileSize += Buffer.byteLength(`</${tagName}>`, 'utf8');
// });

// // Event handler for text nodes
// saxStream.on('text', function(text) {
//     // Write the text content to the current stream
//     currentWriteStream.write(text);
//     currentFileSize += Buffer.byteLength(text, 'utf8');
// });

// // Handle errors
// saxStream.on('error', function(err) {
//     console.error('Parsing error', err);
// });

// // Handle end of XML file
// saxStream.on('end', function() {
//     // Close the last stream
//     if (currentWriteStream) {
//         currentWriteStream.end();
//     }
//     console.log('XML splitting completed.');
// });

// // Start reading the input XML file
// const readStream = fs.createReadStream(inputFile);
// readStream.pipe(saxStream);



