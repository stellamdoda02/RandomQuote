const express = require('express');//create the server
const fs = require('fs');// this File system module to read the JSON file.
const path = require('path');

const app = express();
const PORT = 3008; // Port number 



app.use(express.static(__dirname));

// read the quotes.json file
function readQuotesFile() {
    try {
        const data = fs.readFileSync('quotes.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading the file', err);
        return [];
    }
}

// Function to get a random quote
function getRandomQuote() {
    const quotes = readQuotesFile();
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

//  to get a random quote
app.get('/random-quote', (req, res) => {
        const quote = getRandomQuote();
        res.json(quote);
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    //this is my local host server 
    console.log(`Server is running on http://localhost:${PORT}`);

    // Display Random quote on the terminal
    const randomQuote = getRandomQuote();
    console.log(`Random Quote: "${randomQuote.quote}" - ${randomQuote.author}`);
     // End the process after displaying the random quote
     console.log("End");
});
