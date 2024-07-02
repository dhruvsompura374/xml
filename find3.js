// const express = require('express');
// const app = express();
// const port = 3000;
// const cors = require('cors');
// const fs = require('fs').promises;
// const path = require('path');
// const sax = require('sax');

// app.use(cors());

// // Endpoint to handle the request
// app.get('/data', async (req, res) => {
//     const outputDir = 'output';
//     const targetNumber = req.query.number;

//     try {
//         // Read files from the directory
//         const files = await fs.readdir(outputDir);

//         // Array to store results
//         const results = false;

//         // Function to search for a number globally in the entire XML content
//         async function searchNumberInXML(inputFile, targetNumber) {
//             try {
//                 const data = await fs.readFile(inputFile, 'utf8');
//                 const regex = new RegExp(`\\b${targetNumber}\\b`);
//                 const found = regex.test(data);

//                 if (found) {
//                     console.log(`Found target number ${targetNumber} in file:`, inputFile);
//                     return true;
//                 } else {
//                     console.log(`Target number ${targetNumber} not found in file:`, inputFile);
//                     return false;
//                 }
//             } catch (error) {
//                 console.error(`Error reading file ${inputFile}:`, error);
//                 return false;
//             }
//         }

//         // Process each file in the directory
//         for (const file of files) {
//             const filePath = path.join(outputDir, file);
//             const found = await searchNumberInXML(filePath, targetNumber);
//             if(found == true)
//             {
//                 res.json({found:true});
//                 return true;
//             }
//             // results.push({ file: filePath, found });
//         }
//         res.json({found:false});
//         return true;
//         // Send response with results
        

//     } catch (error) {
//         console.error('Error reading directory:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });


const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const sax = require('sax');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Endpoint to handle the request
app.get('/data', async (req, res) => {
    const outputDir = 'output';
    const targetNumber = req.query.number;

    try {
        // Read files from the directory
        const files = await fs.readdir(outputDir);

        // Array to store results
        const results = false;

        // Function to search for a number globally in the entire XML content
        async function searchNumberInXML(inputFile, targetNumber) {
            try {
                const data = await fs.readFile(inputFile, 'utf8');
                const regex = new RegExp(`\\b${targetNumber}\\b`);
                const found = regex.test(data);

                if (found) {
                    console.log(`Found target number ${targetNumber} in file:`, inputFile);
                    return true;
                } else {
                    console.log(`Target number ${targetNumber} not found in file:`, inputFile);
                    return false;
                }
            } catch (error) {
                console.error(`Error reading file ${inputFile}:`, error);
                return false;
            }
        }

        // Process each file in the directory
        for (const file of files) {
            const filePath = path.join(outputDir, file);
            const found = await searchNumberInXML(filePath, targetNumber);
            if(found == true)
            {
                res.json({found:true});
                return true;
            }
            // results.push({ file: filePath, found });
        }
        res.json({found:false});
        return true;
        // Send response with results
        

    } catch (error) {
        console.error('Error reading directory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})