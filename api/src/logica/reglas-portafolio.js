// src/logica/reglas-portafolio.js
// Reglas del negocio del portafolio. Esta capa NO conoce HTTP:
// no usa req ni res, y por eso se puede probar sin levantar el servidor.

const NOMBRE_MINIMO = 2;
const MENSAJE_MINIMO = 10;
const MENSAJE_MAXIMO = 500;
const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validarMensaje(datos) {
  const { nombre, correo, texto } = datos || {};

  if (typeof nombre !== 'string' || typeof correo !== 'string' || typeof texto !== 'string') {
    return { valido: false, error: 'Faltan nombre, correo o texto' };
  }
  if (nombre.trim().length < NOMBRE_MINIMO) {
    return { valido: false, error: `El nombre debe tener al menos ${NOMBRE_MINIMO} caracteres` };
  }
  if (!PATRON_CORREO.test(correo.trim())) {
    return { valido: false, error: 'El correo no tiene un formato válido' };
  }
  if (texto.trim().length < MENSAJE_MINIMO) {
    return { valido: false, error: `El mensaje debe tener al menos ${MENSAJE_MINIMO} caracteres` };
  }
  if (texto.trim().length > MENSAJE_MAXIMO) {
    return { valido: false, error: `El mensaje no puede superar ${MENSAJE_MAXIMO} caracteres` };
  }
  return { valido: true, error: null };
}

function resumirProyectos(proyectos) {
  const tecnologias = new Set();
  proyectos.forEach((p) => (p.tecnologias || []).forEach((t) => tecnologias.add(t)));
  return { total: proyectos.length, tecnologias: [...tecnologias] };
}

module.exports = {
  NOMBRE_MINIMO,
  MENSAJE_MINIMO,
  MENSAJE_MAXIMO,
  validarMensaje,
  resumirProyectos,
};