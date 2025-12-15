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


app.get('/pizze', (req, res) => {
    //res.send("Ovo su sve dostupne pizze: ");
    res.json(pizze).status(200);
});

// Paziti na redoslijed ruta npr. tu nije delalo jer je :naziv bija prije :id
app.get('/pizze/:id', (req, res, next) =>{
    if (isNaN(req.params.id)) return next();
    const id_pizza = req.params.id;
    const trazena_pizza_id = pizze.find(pizza => pizza.id == id_pizza);
    if(!trazena_pizza_id){
        return res.status(404).json({
            greska: 'Pizza s trazenim id-om ne postoji!'
        });
    }
    return res.status(200).json(trazena_pizza_id);
})
app.get('/pizze/:naziv', (req, res) => {
    const naziv_pizza = req.params.naziv; // Putanja do parametra

    //trazimo pizzu
    const trazena_pizza = pizze.find(pizza => pizza.naziv == naziv_pizza);

    if(!trazena_pizza){
        return res.json({
            greska: 'Pizza ne postoji!'
        }).status(404);
    }
    return res.json(trazena_pizza).status(200);
})

app.get('/pizze/:parametar', (req, res) => {
    const parametar = req.params.parametar;
    if(parametar == String){
        const trazena_pizza_naziv = pizze.find(pizza => pizza.naziv == parametar);
        if(!trazena_pizza_naziv){
        return res.json({
            greska: 'Pizza ne postoji!'
        }).status(404);
    }
    return res.json(trazena_pizza_naziv).status(200);
    } elif (parametar == Number) {
        const trazena_pizza_id = pizze.find(pizza => pizza.id == parametar);
        if(!trazena_pizza_id){
        return res.json({
            greska: 'Pizza ne postoji!'
        }).status(404);
    }
    return res.json(trazena_pizza_id).status(200);
    } else{
        res.send("Trazena pizza ne postoji");
    }
});


app.post('/pizze', (req, res) => {
    const nova_pizza = req.body;

    const naziv_nove_pizze = req.body.naziv;;

    const dozvoljeni_kljucevi = ["naziv", "cijena"];
    const nova_pizza_kljucevi = Object.keys(nova_pizza);

    const nedozvoljeni_kljucevi = nova_pizza_kljucevi.find(kljuc => !dozvoljeni_kljucevi.includes(kljuc));

    if(nedozvoljeni_kljucevi){
        return res.status(400).json({greska:`Nedozvoljeno polje: ${nedozvoljeni_kljucevi}`});
    }

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

app.post('/naruci', (req, res) => {
    const narudzba = req.body;
    const kljucevi = Object.keys(narudzba);
    console.log(narudzba);
    console.log(kljucevi);

    if(!(kljucevi.includes('pizza') && kljucevi.includes('velicina'))){
        res.send('Niste poslali sve potreben podatke za narudzbu!');
        return;
    }
    console.log('Primljeni podaci:', narudzba);
    res.send('Vaša narudžba je uspješno zaprimljena!');
});

app.listen(PORT, error =>{
    if (error){
        console.error('Greska pri pokretanju..');
    }
    console.log(`Poslužitelj radi na Portu ${PORT}`);
})