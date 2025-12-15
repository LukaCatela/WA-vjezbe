import express from 'express';
const router = express.Router();
const projekti = [
  {
    id: 1,
    naziv: "UNI Wiki",
    vrsta: "web app",
    velicina: "medium",
    ocjena: 4.7,
    githubRepo: "https://github.com/example/uni-wiki"
  },
  {
    id: 2,
    naziv: "Student Budget Planner",
    vrsta: "mobile",
    velicina: "small",
    ocjena: 4.1,
    githubRepo: "https://github.com/example/budget-planner"
  },
  {
    id: 3,
    naziv: "Exam AI Helper",
    vrsta: "backend service",
    velicina: "large",
    ocjena: 4.9,
    githubRepo: "https://github.com/example/exam-ai-helper"
  },
  {
    id: 4,
    naziv: "Smart Lab Scheduler",
    vrsta: "web app",
    velicina: "medium",
    ocjena: 4.5,
    githubRepo: "https://github.com/example/lab-scheduler"
  },
  {
    id: 5,
    naziv: "Code Review Assistant",
    vrsta: "CLI tool",
    velicina: "small",
    ocjena: 4.4,
    githubRepo: "https://github.com/example/cr-assistant"
  },
  {
    id: 6,
    naziv: "Project Peer Review Portal",
    vrsta: "web app",
    velicina: "large",
    ocjena: 4.8,
    githubRepo: "https://github.com/example/peer-review-portal"
  },
  {
    id: 7,
    naziv: "TVZ Course Archive",
    vrsta: "web app",
    velicina: "medium",
    ocjena: 3.9,
    githubRepo: "https://github.com/example/tvz-archive"
  },
  {
    id: 8,
    naziv: "AI Slides Generator",
    vrsta: "service",
    velicina: "medium",
    ocjena: 4.6,
    githubRepo: "https://github.com/example/ai-slides"
  },
  {
    id: 9,
    naziv: "GameDev Sandbox",
    vrsta: "unity game",
    velicina: "large",
    ocjena: 4.2,
    githubRepo: "https://github.com/example/gamedev-sandbox"
  },
  {
    id: 10,
    naziv: "ML Weather Predictor",
    vrsta: "ML solution",
    velicina: "medium",
    ocjena: 4.3,
    githubRepo: "https://github.com/example/weather-ml"
  }
];

router.get('/', (req, res) =>{
  res.status(200).json(projekti);
});

router.get('/:id', (req, res) => {
  const project_id = req.params.id;
  const trazeni_project = projekti.find(p=> p.id == project_id)
  if(!trazeni_project){
    res.status(418).json({greska: `Trazeni id ${project_id} ne postoji!`});
  }
  return res.status(200).json(trazeni_project);
});

router.delete('/:id', (req, res) => {
  const project_id = req.params.id;
  const trazeni_project = projekti.find(p=> p.id == project_id)
  if(!trazeni_project){
    res.status(418).json({greska: `Trazeni id ${project_id} ne postoji!`});
  }
  projekti.splice(trazeni_project, 1);
  return res.status(200).send("Korisnik je izbrisan!");
})




export default router;