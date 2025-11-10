import express from 'express';
const router = express.Router();
const users = [
  {
    id: 1,
    ime: "Luka",
    prezime: "Kovačević",
    rola: "student",
    jmbag: "0248041234",
    email: "luka.kovacevic@fer.unizg.hr",
    fakultet: "FER"
  },
  {
    id: 2,
    ime: "Ana",
    prezime: "Barić",
    rola: "student",
    jmbag: "0248049281",
    email: "ana.baric@tvz.hr",
    fakultet: "TVZ"
  },
  {
    id: 3,
    ime: "Filip",
    prezime: "Horvat",
    rola: "prof",
    jmbag: '0248041111',
    email: "filip.horvat@fer.unizg.hr",
    fakultet: "FER"
  },
  {
    id: 4,
    ime: "Nina",
    prezime: "Cindrić",
    rola: "student",
    jmbag: "0248047888",
    email: "nina.cindric@tvz.hr",
    fakultet: "TVZ"
  },
  {
    id: 5,
    ime: "Marko",
    prezime: "Novosel",
    rola: "student",
    jmbag: "0248050200",
    email: "marko.novosel@foi.hr",
    fakultet: "FOI"
  },
  {
    id: 6,
    ime: "Katarina",
    prezime: "Tolić",
    rola: "student",
    jmbag: "0248053001",
    email: "katarina.tolic@fer.unizg.hr",
    fakultet: "FER"
  },
  {
    id: 7,
    ime: "Ivan",
    prezime: "Rukavina",
    rola: "prof",
    jmbag: '1234567890',
    email: "ivan.rukavina@tvz.hr",
    fakultet: "FIPU"
  },
  {
    id: 8,
    ime: "Ema",
    prezime: "Leko",
    rola: "student",
    jmbag: "0248060000",
    email: "ema.leko@foi.hr",
    fakultet: "FOI"
  },
  {
    id: 9,
    ime: "Josip",
    prezime: "Bosak",
    rola: "student",
    jmbag: "0248081111",
    email: "josip.bosak@fer.unizg.hr",
    fakultet: "FER"
  },
  {
    id: 10,
    ime: "Paula",
    prezime: "Dabro",
    rola: "student",
    jmbag: "0248043999",
    email: "paula.dabro@tvz.hr",
    fakultet: "TVZ"
  },
  {
    id: 11,
    ime: "Luka",
    prezime: "Catela",
    rola: "student",
    jmbag: "0007185788",
    email: "luka.catela@fipu.hr",
    fakultet: "FIPU"
  }
];


export default router;