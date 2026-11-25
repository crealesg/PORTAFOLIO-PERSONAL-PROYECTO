// api/src/rutas/portafolio.js
// Solo recibe la petición y responde. Las reglas viven en logica/.
const express = require('express');
const { validarMensaje, resumirProyectos } = require('../logica/reglas-portafolio');
const { obtenerProyectos, guardarMensaje } = require('../datos/repositorio');
const { responder } = require('../utilidades/responder');

const router = express.Router();

router.get('/proyectos', (req, res) => {
  responder(res, 200, obtenerProyectos());
});

router.get('/proyectos/resumen', (req, res) => {
  responder(res, 200, resumirProyectos(obtenerProyectos()));
});

router.post('/mensajes', (req, res) => {
  const resultado = validarMensaje(req.body);
  if (!resultado.valido) {
    return responder(res, 400, { error: resultado.error });
  }
  const { nombre, correo, texto } = req.body;
  const nuevo = guardarMensaje({ nombre: nombre.trim(), correo: correo.trim(), texto: texto.trim() });
  responder(res, 201, nuevo);
});

module.exports = router;
