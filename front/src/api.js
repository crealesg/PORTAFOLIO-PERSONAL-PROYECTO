// front/src/api.js
// Único lugar que conoce la dirección de la API y cómo se le habla.
const BASE = import.meta.env.VITE_API_URL;

export async function obtenerProyectos() {
  const respuesta = await fetch(`${BASE}/proyectos`);
  if (!respuesta.ok) throw new Error('No se pudo cargar la lista de proyectos');
  return respuesta.json();
}

export async function enviarMensaje(datos) {
  const respuesta = await fetch(`${BASE}/mensajes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  const cuerpo = await respuesta.json();
  // El front no repite las reglas: muestra el error que devuelve el back.
  if (!respuesta.ok) throw new Error(cuerpo.error || 'No se pudo enviar el mensaje');
  return cuerpo;
}
