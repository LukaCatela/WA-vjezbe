const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

const users = [
        { id: 1, ime: 'Luka', prezime: 'Catela' },
        { id: 2, ime: 'Ana', prezime: 'Kovač' },
        { id: 3, ime: 'Marko', prezime: 'Marić' }
    ];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// dodao sam path jer sendFile prima samo jedan argument, odnosno putanju do file-a

app.get('/about',(req, res) => {
    res.sendFile(__dirname + '/public/about.html');
});

// ovo je drugi nacin prikaza

app.get('/users', (req, res) => {
    res.json(users);
});
app.listen(PORT, error => {
    if (error) {
        console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
    } else {
        console.log(`Server je pokrenut na http://localhost:${PORT}`);
    }
});