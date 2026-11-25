// front/src/components/Formacion.jsx
import Seccion from './Seccion';

const formacion = [
  { id: 1, institucion: 'UNIVERSIDAD DE LA COSTA', detalle: '(Ingeniería de Sistemas · en curso)' },
  { id: 2, institucion: 'COLEGIO MILITAR ACOOLSURE', detalle: '(Bachillerato)' }
];

function Formacion() {
  return (
    <Seccion id="formacion" titulo="Formación">
      <ul>
        {formacion.map((estudio) => (
          <li key={estudio.id}>
            <strong>{estudio.institucion}</strong> <span>{estudio.detalle}</span>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}

export default Formacion;
