const express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
const port = 3080;

const rotas = require("./routes.js");

//Necessário o body - parser para fazer o POST nas rotas
app.use(bodyParser.urlencoded({ extended: false })); //
app.use(bodyParser.json()); //
app.use(cors());

rotas.configurarRotas(app);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});