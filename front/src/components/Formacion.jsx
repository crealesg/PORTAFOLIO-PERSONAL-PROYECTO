// front/src/components/Formacion.jsx

const formacion = [
  { id: 1, institucion: 'UNIVERSIDAD DE LA COSTA', detalle: '(Ingeniería de Sistemas · en curso)' },
  { id: 2, institucion: 'COLEGIO MILITAR ACOOLSURE', detalle: '(Bachillerato)' }
];

function Formacion() {
  return (
    <section id="formacion">
      <h2>Formación</h2>
      <ul>
        {formacion.map((estudio) => (
          <li key={estudio.id}>
            <strong>{estudio.institucion}</strong> <span>{estudio.detalle}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Formacion;
