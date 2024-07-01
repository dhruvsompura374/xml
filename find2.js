const fs = require('fs').promises;
const path = require('path');

const outputDir = 'path/to/output/directory/';
const targetNumbers = [7882457, 1234567, 8901234]; // Array of specific numbers you are looking for

// Function to search for numbers in the XML content
async function checkNumbersInXML(inputFile, targetNumbers) {
    try {
        const data = await fs.readFile(inputFile, 'utf8');

        // Create a regular expression to search for any of the target numbers
        const regex = new RegExp(`\\b(${targetNumbers.join('|')})\\b`);

        // Check if any target number is present in the data
        const found = regex.test(data);

        if (found) {
            console.log(`Target number found in file: ${inputFile}`);
        } else {
            console.log(`Target number not found in file: ${inputFile}`);
        }
    } catch (err) {
        console.error(`Error processing file ${inputFile}:`, err);
    }
}

// Function to read each file in the directory and check them concurrently
async function checkFilesInDirectory(directory) {
    try {
        const files = await fs.readdir(directory);
        const tasks = files.map(file => {
            const filePath = path.join(directory, file);
            return checkNumbersInXML(filePath, targetNumbers);
        });
        await Promise.all(tasks);
        console.log('Checking completed for all files.');
    } catch (err) {
        console.error('Error reading directory:', err);
    }
}

// Start checking files in the output directory
checkFilesInDirectory(outputDir);
