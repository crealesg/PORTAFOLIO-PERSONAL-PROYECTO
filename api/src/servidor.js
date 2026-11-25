// src/servidor.js
const express = require('express');
const cors = require('cors');
const rutasPortafolio = require('./rutas/portafolio');

const app = express();
app.use(cors());          // abierto solo para desarrollar; se restringe en el despliegue
app.use(express.json());
app.use('/', rutasPortafolio);

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => console.log('API escuchando en el puerto ' + PUERTO));