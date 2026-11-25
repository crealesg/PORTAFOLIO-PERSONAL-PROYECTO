// src/rutas/portafolio.js
// Solo recibe la petición y responde. Las reglas viven en logica/.

const express = require('express');
const { validarMensaje, resumirProyectos } = require('../logica/reglas-portafolio');
const { obtenerProyectos, guardarMensaje } = require('../datos/repositorio');

const router = express.Router();

router.get('/proyectos', (req, res) => {
  res.json(obtenerProyectos());
});

router.get('/proyectos/resumen', (req, res) => {
  res.json(resumirProyectos(obtenerProyectos()));
});

router.post('/mensajes', (req, res) => {
  const resultado = validarMensaje(req.body);
  if (!resultado.valido) {
    return res.status(400).json({ error: resultado.error });
  }
  const { nombre, correo, texto } = req.body;
  const nuevo = guardarMensaje({ nombre: nombre.trim(), correo: correo.trim(), texto: texto.trim() });
  res.status(201).json(nuevo);
});

module.exports = router;