const express = require('express');
const app = express();
const port = 3080;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use((req, res, next) => {
    res.status(404).send("Sinto muito, mas essa sinapse ainda não existe :)");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});