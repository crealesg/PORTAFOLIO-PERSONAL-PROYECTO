// src/datos/repositorio.js
// Único lugar de donde salen y donde se guardan los datos.
// Hoy viven en memoria; si luego se pasa a una base de datos, solo cambia este archivo.

const proyectos = [
  { id: 1, titulo: 'PORTAFOLIO PERSONAL', descripcion: 'Sitio con HTML, CSS y JavaScript, con ramas y Pull Requests', tecnologias: ['HTML', 'CSS', 'JavaScript'] },
  { id: 2, titulo: 'CALCULADORA SIMPLE', descripcion: 'Recibe dos números y muestra el resultado de una operación básica', tecnologias: ['HTML', 'JavaScript'] },
  { id: 3, titulo: 'QUIZ DE PREGUNTAS', descripcion: 'Preguntas de opción múltiple con respuesta al hacer clic', tecnologias: ['HTML', 'CSS', 'JavaScript'] },
  { id: 4, titulo: 'GENERADOR DE FRASES', descripcion: 'Muestra una frase aleatoria de una lista en cada clic', tecnologias: ['HTML', 'JavaScript'] }
];

const mensajes = [];

function obtenerProyectos() {
  return proyectos;
}

function guardarMensaje(datos) {
  const nuevo = { id: Date.now(), ...datos, fecha: new Date().toISOString() };
  mensajes.push(nuevo);
  return nuevo;
}

module.exports = { obtenerProyectos, guardarMensaje };