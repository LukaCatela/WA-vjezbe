const express = require('express'); //jer smo stavili u package.json type:module umisto commonjs
const app = express();

const router = express.Router();

const PORT = 3000;
app.listen(PORT);

app.get("/", (req, res)=>{
    res.send("HELLO WORLD!")
})