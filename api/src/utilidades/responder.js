// api/src/utilidades/responder.js
// Función compartida para centralizar todas las respuestas HTTP.
function responder(res, codigo, datos) {
  return res.status(codigo).json(datos);
}

module.exports = { responder };
