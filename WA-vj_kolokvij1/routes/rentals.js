import express from 'express';
import { rentals } from '../data/data_rentals.js'
import { boats } from '../data/data_boats.js';
import { izracunajDane } from '../utils/funkcije.js';


const router = express.Router();

router.post('/', (req, res) => {
    const rent = req.body
    const novi_id = rent.boatId;
    // osim id-ja i totalPrice
    let brod = boats.find(boat => boat.id == novi_id);

    if(!brod){
        return res.status(404).json({greska: `Brod sa trazenim ${novi_id} ne postoji!`})
    }

    if(rent.rentalStartDate > rent.rentalEndDate){
        return res.status(400).json({greska: "Datum pocetka ne moze biti poslije datuma zavrsetka"})
    }
    const brojDana = izracunajDane(rent.rentalStartDate, rent.rentalEndDate);

    const totalPrice = brojDana * brod.cijenaPoDanu;

    const novi_id_rent = rentals.length + 1;
    
    const noviNajam = {
        id: novi_id_rent,
        ...rent,
        totalPrice
    };

    rentals.push(noviNajam);

    return res.status(201).json(noviNajam);

});

router.patch("/:id", (req, res) => {
    const rent = req.body;
    const startDate = rent.rentalStartDate;
    const endDate = rent.rentalEndDate;

    if(endDate < startDate){
        return res.status(400).json({greska: "Datum pocetka ne moze biti poslije datuma zavrsetka"});
    }

    
});

export default router;