import { boats } from "../data/data_boats.js";
import express from 'express';


const router = express.Router();

router.get('/', (req, res) => {
    if(!boats){
        return res.status(404).json({greska: "Nema brodica"});
    }else{
        return res.status(200).json(boats);
    }
});

router.get('/:naziv', (req, res) => {
    const naziv_broda = req.params.naziv;
    const brod = boats.find(b=>b.naziv.toLowerCase() == naziv_broda.toLowerCase());

    if(!brod){
        return res.status(404).json({greska: "Nema broda"});
    }else{
        return res.status(200).json(brod);
    }
});

router.post('/', (req, res) => {
    const novi_id = boats.length + 1;
    const body_brod = req.body;

    //Validacija kljuceva

    const dozvoljeni_kljucevi = ["naziv", "tip", "duljina", "cijenaPoDanu", "motor_hp"];

    const novi_brod_kljucevi = Object.keys(body_brod);

    const nedozvoljeni_klucevi = novi_brod_kljucevi.find(kljuc => !dozvoljeni_kljucevi.includes(kljuc));

    if(nedozvoljeni_klucevi){
        return res.status(400).json({greska: `Nedozvoljeni kljuc: ${nedozvoljeni_klucevi}`})
    }

    const postoji_brod = boats.find(b => body_brod.naziv == b.naziv );
    if(postoji_brod){
        return res.status(400).send("Brod s istim nazivom postoji");
    }
/*
    const novi_brod = {
        "id": novi_id,
        "naziv": body_brod.naziv,
        "tip": body_brod.tip,
        "duljina": body_brod.duljina,
        "cijenaPoDanu": body_brod.cijenaPoDanu,
        "motor_hp": body_brod.motor_hp
    }
        */
    boats.push({id: novi_id, ...body_brod});
    return res.status(200).json(boats);
});

export default router;