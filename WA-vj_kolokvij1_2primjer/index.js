import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.json());

let relativna_putanja_data = path.join("data", "data.json");
let apsolutna_putanja_data = path.resolve(relativna_putanja_data);

app.get("/", (req, res) => {
    return res.status(200).send("Pozdrav, Luka Catela!");
});

app.get("/korisnici", (req, res) => {
    return res.status(200).sendFile(apsolutna_putanja_data);
})

app.listen(PORT, error => {
    if(error){
        console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
    }else{
        console.log(`Aplikacoija sluša na portu http://localhost:${PORT}`);
    }
});