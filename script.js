const CLAVE_MENSAJES = "portafolio-mensajes";

const proyectos = [
  {
    titulo: "PORTAFOLIO PERSONAL",
    descripcion: "Sitio hecho con HTML, CSS y JavaScript subido a GitHub con ramas y Pull Requests y desplegado en Netlify",
  },
];

const formacionAcademica = [
  {
    institucion: "UNIVERSIDAD DE LA COSTA ",
    detalle: "(Ingeniería de Sistemas · en curso)",
  },
];

const listaProyectos = document.getElementById("listaProyectos");
const listaFormacion = document.getElementById("listaFormacion");
const formContacto = document.getElementById("formContacto");
const inputNombre = document.getElementById("inputNombre");
const inputCorreo = document.getElementById("inputCorreo");
const inputMensaje = document.getElementById("inputMensaje");
const confirmacionEnvio = document.getElementById("confirmacionEnvio");

function renderizarProyectos() {
  listaProyectos.innerHTML = "";

  proyectos.forEach((proyecto) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-proyecto";

    const titulo = document.createElement("h3");
    titulo.textContent = proyecto.titulo;

    const descripcion = document.createElement("p");
    descripcion.textContent = proyecto.descripcion;

    tarjeta.append(titulo, descripcion);
    listaProyectos.appendChild(tarjeta);
  });
}

function renderizarFormacion() {
  listaFormacion.innerHTML = "";

  formacionAcademica.forEach((estudio) => {
    const item = document.createElement("li");

    const institucion = document.createElement("strong");
    institucion.textContent = estudio.institucion;

    const detalle = document.createElement("span");
    detalle.textContent = estudio.detalle;

    item.append(institucion, detalle);
    listaFormacion.appendChild(item);
  });
}

function guardarMensajeContacto(mensaje) {
  const mensajesGuardados = localStorage.getItem(CLAVE_MENSAJES);
  const mensajes = mensajesGuardados ? JSON.parse(mensajesGuardados) : [];
  mensajes.push(mensaje);
  localStorage.setItem(CLAVE_MENSAJES, JSON.stringify(mensajes));
}

formContacto.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const mensaje = {
    nombre: inputNombre.value.trim(),
    correo: inputCorreo.value.trim(),
    texto: inputMensaje.value.trim(),
    fecha: new Date().toISOString(),
  };

  guardarMensajeContacto(mensaje);

  formContacto.reset();
  confirmacionEnvio.style.display = "block";

  setTimeout(() => {
    confirmacionEnvio.style.display = "none";
  }, 4000);
});

renderizarProyectos();
renderizarFormacion();
