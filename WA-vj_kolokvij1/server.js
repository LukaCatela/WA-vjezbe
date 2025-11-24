import express from 'express';

import path from 'path';

import BoatsRouter from './routes/boats.js';
import RentalRouter from './routes/rentals.js';


const app = express();

const PORT = 3000;

app.use(express.json());
app.use("/boats", BoatsRouter);
app.use("/rentals", RentalRouter);


//PAZITI NA OVO!!
let relativna_putanja = path.join("public", "index.html");
let apsolutna_putanja = path.resolve(relativna_putanja);

app.get('/', (req, res) => {
    res.status(200).sendFile(apsolutna_putanja);
});

app.listen(PORT, error =>{
    if(error){
        console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
    } else {
        console.log(`Server je pokrenut na http://localhost:${PORT}`);
    };
});