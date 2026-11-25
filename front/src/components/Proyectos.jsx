// front/src/components/Proyectos.jsx
import { useState, useEffect } from 'react';
import { obtenerProyectos } from '../api';

function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProyectos()
      .then(setProyectos)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  return (
    <section id="proyectos">
      <h2>Proyectos</h2>
      {cargando && <p>Cargando proyectos...</p>}
      {error && <p className="mensaje-error">{error}</p>}
      {proyectos.map((proyecto) => (
        <div className="tarjeta-proyecto" key={proyecto.id}>
          <h3>{proyecto.titulo}</h3>
          <p>{proyecto.descripcion}</p>
        </div>
      ))}
    </section>
  );
}

export default Proyectos;
