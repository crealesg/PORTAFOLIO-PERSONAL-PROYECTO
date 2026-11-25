// api/src/servidor.js
const express = require('express');
const cors = require('cors');
const rutasPortafolio = require('./rutas/portafolio');

const app = express();
const ORIGEN_FRONT = 'http://cuc-bp-eq08-reales-sitio-2026.s3-website-us-east-1.amazonaws.com';

// Middleware compartido: registra cada petición en un solo lugar.
function registrar(req, res, siguiente) {
  console.log(`${req.method} ${req.url}`);
  siguiente();
}

// CORS restringido únicamente al bucket público del frontend en S3.
app.use(cors({ origin: ORIGEN_FRONT }));
app.use(express.json());
app.use(registrar);
app.use('/', rutasPortafolio);

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => console.log('API escuchando en el puerto ' + PUERTO));
