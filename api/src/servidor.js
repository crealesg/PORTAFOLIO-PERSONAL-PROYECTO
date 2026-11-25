// api/src/servidor.js
const express = require('express');
const cors = require('cors');
const rutasPortafolio = require('./rutas/portafolio');

const app = express();

// Middleware compartido: registra cada petición en un solo lugar.
function registrar(req, res, siguiente) {
  console.log(`${req.method} ${req.url}`);
  siguiente();
}

app.use(cors()); // se restringe al origen de S3 en el siguiente bloque
app.use(express.json());
app.use(registrar);
app.use('/', rutasPortafolio);

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => console.log('API escuchando en el puerto ' + PUERTO));
