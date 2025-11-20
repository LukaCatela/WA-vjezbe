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
    jmbag: "00071857889",
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
router.post('/user', (req, res) => {
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
router.delete("/:jmbag", (req, res) =>{
  const JMBG_user = req.params.jmbag;
  const trazeni_korisnik = users.findIndex(user => user.jmbag == JMBG_user);
  if(!trazeni_korisnik){
    return res.status(404).json({greska: `Korisnik sa ${JMBG_user} ne postoji`});
  }
  users.splice(trazeni_korisnik, 1);
});

//PATCH djelomicna dopuna usera
router.patch("/:id", (req, res) => {
  const user_id = req.params.id;
  const index = users.findIndex(u => u.id == user_id);
  if (index === -1) {
    return res.status(404).json({ greska: "Korisnik ne postoji!" });
  }

  const user = users[index];

  const dozvoljena_polja = ["ime", "prezime", "rola", "jmbag", "email", "fakultet"];
  const poslani_kljuc = Object.keys(req.body);

  const nedozvoljeni_kljuc = poslani_kljuc.find(k => !dozvoljena_polja.includes(k));
   

  if(nedozvoljeni_kljuc){
    return res.status(400).json({greska: `Polje s ${nedozvoljeni_kljuc} nije dozvoljeno!`});
  }

  if(req.body.jmbag && req.body.jmbag.length != 11){
    return res.status(400).json({ greska: "JMBG mora imati 11 znakova!" })
  }

  poslani_kljuc.forEach(key =>{
    user[key] = req.body[key]
  });


  return res.status(200).json(user);
})
//PUT potpuna zamjena usera
router.put("/:id", (req, res) =>{
  // pronadi index
  const user_id = req.params.id;
  const index = users.findIndex(u => u.id == user_id);

  if (index === -1) {
    return res.status(404).json({ greska: "Korisnik ne postoji!" });
  }
  const {ime, prezime, rola, jmbag, email, fakultet} = req.body;
  // jednostavna validacija
  if(!ime || !prezime || !rola || !jmbag || !email || !fakultet){
    return res.status(400).json({greska: "Nisu poslana sva polja!"})
  }
  // validacija duljine JMBAG-a
if (jmbag.length !== 11) {
  return res.status(400).json({ greska: "JMBAG mora imati točno 11 znakova." });
}

// provjera postoji li već isti JMBAG
const jmbg_user = users.find(u => u.jmbag == jmbag);

if (jmbg_user) {
  return res.status(400).json({ greska: "Korisnik s tim JMBAG-om već postoji." });
}

  users[index] = {
    id: Number(user_id),
    ime,
    prezime,
    rola,
    jmbag,
    email,
    fakultet,
  };

  return res.status(200).json(users[index]);
});
export default router;