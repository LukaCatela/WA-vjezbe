const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// dodao sam path jer sendFile prima samo jedan argument, odnosno putanju do file-a

app.get('/about',(req, res) => {
    res.sendFile(__dirname + '/public/about.html')
});

// ovo je drugi nacin prikaza
app.listen(PORT, error => {
    if (error) {
        console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
    } else {
        console.log(`Server je pokrenut na http://localhost:${PORT}`);
    }
});