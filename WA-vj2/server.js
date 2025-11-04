import express from "express"

const app = express();
//middleware
app.use(express.json());
const PORT = 3000;

const pizze = [
{ id: 1, naziv: 'Margherita', cijena: 6.5 },
{ id: 2, naziv: 'Capricciosa', cijena: 8.0 },
{ id: 3, naziv: 'Quattro formaggi', cijena: 10.0 },
{ id: 4, naziv: 'Šunka sir', cijena: 7.0 },
{ id: 5, naziv: 'Vegetariana', cijena: 9.0 }
];

/*
app.get('/pizze', (req, res) => {
    res.json(pizze).status(200);
});
*/

app.get('/pizze/:naziv', (req, res) => {
    const naziv_pizza = req.params.naziv;

    if(!req.params.naziv){
        return res.json(pizze).status(200);
    }

    const trazena_pizza = pizze.find(pizza => pizza.naziv == naziv_pizza);

    if(!trazena_pizza){
        return res.json({
            greska: 'Pizza ne postoji!'
        }).status(404);
    }
    return res.json(trazena_pizza).status(200);
})

app.post('/pizze', (req, res) => {
    const nova_pizza = req.body;

    const naziv_nove_pizze = req.body.naziv;;

    const dozvoljeni_kljucevi = ["naziv", "cijena"];
    const nova_pizza_kljucevi = Object.keys(nova_pizza);

    let postoji = pizze.find(pizza => pizza.naziv == naziv_nove_pizze);

    if(postoji){
        return res.json.status(400)({ Greska: `Pizza s nazivom ${naziv_nove_pizze} već postoji...`})
    }
    let novi_id = pizze.at(-1)['id'] + 1;
    console.log(novi_id);

    let novi_zapis = {
        "id" : novi_id,
        "naziv" : nova_pizza.naziv,
        "cijena" : nova_pizza.cijena
    }
    pizze.push(novi_zapis);
    // pizze.push({id: novi_id, ...novi_zapis});
    return res.json(pizze).status(201);
})

app.listen(PORT, error =>{
    if (error){
        console.error('Greska pri pokretanju..');
    }
    console.log(`Poslužitelj radi na Portu ${PORT}`);
})