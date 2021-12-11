const express = require('express');
const app = express();
const port = 3080;

import { rotas } from "./routes.js";

rotas.configurarRotas(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});