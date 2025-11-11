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

// GET uzmi sve User-e
router.get('/', (req, res) => {
  res.status(200).json(users);
});
// GET User po id-u
router.get('/:id', (req, res) => {
  const id_user = req.params.id;
  const trazeni_user_id = users.find(user => user.id == id_user);
   if(!trazeni_user_id){
        return res.status(404).json({
            greska: 'User s trazenim id-om ne postoji!'
        });
    }
    return res.status(200).json(trazeni_user_id);
});
//POST novi user
router.post('/post', (req, res) => {
  const novi_user = req.body; // kod POSTA uvijek stavljamo body
  const naziv_user = novi_user.ime;
  const prezime_user = novi_user.prezime;
  const JMBG_user = novi_user.jmbag;

  const dozvoljeni_kljucevi_user = ["ime", "prezime", "jmbag"];
  const novi_user_keys = Object.keys(novi_user);

  const nedozvoljeni_kljucevi = novi_user_keys.find(kljuc => !dozvoljeni_kljucevi_user.includes(kljuc));

  if(nedozvoljeni_kljucevi){
    return res.status(400).json({greska: `Nedozvoljeni kljuc: ${nedozvoljeni_kljucevi}`});
  };

  let postoji_jmbg = users.find(user => user.jmbag == JMBG_user);

  if(postoji_jmbg){
    return res.status(400).json({ Greska: `User s tim JMBG-om ${JMBG_user} već postoji...`});
  };
  let novi_id_user = users.at(-1)["id"]+1; // mozemo i users.length()+1
  let novi_zapis = {
    "id" : novi_id_user,
    "ime" : naziv_user,
    "prezime" : prezime_user,
    "jmbag" : JMBG_user,
  };
  users.push(novi_zapis);
  return res.status(201).json(users);
});
// DELETE user po JMBG-u

//PATCH djelomicna dopuna usera
export default router;