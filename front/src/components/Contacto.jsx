// front/src/components/Contacto.jsx
import { useState } from 'react';
import { enviarMensaje } from '../api';
import Seccion from './Seccion';

function Contacto() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [texto, setTexto] = useState('');
  const [error, setError] = useState(null);
  const [enviado, setEnviado] = useState(false);

  async function manejarEnvio(evento) {
    evento.preventDefault();
    setError(null);
    setEnviado(false);
    try {
      await enviarMensaje({ nombre, correo, texto });
      setNombre('');
      setCorreo('');
      setTexto('');
      setEnviado(true);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <Seccion id="contacto" titulo="Contacto">
      <form onSubmit={manejarEnvio} noValidate>
        <label htmlFor="nombre">Nombre:</label><br />
        <input id="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} /><br /><br />

        <label htmlFor="correo">Correo:</label><br />
        <input id="correo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} /><br /><br />

        <label htmlFor="mensaje">Mensaje:</label><br />
        <textarea id="mensaje" rows="4" value={texto} onChange={(e) => setTexto(e.target.value)} /><br /><br />

        <button type="submit">Enviar</button>
      </form>
      {enviado && <p className="mensaje-exito">Gracias, tu mensaje quedó registrado.</p>}
      {error && <p className="mensaje-error">{error}</p>}
    </Seccion>
  );
}

export default Contacto;
