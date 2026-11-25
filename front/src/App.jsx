// front/src/App.jsx
import Seccion from './components/Seccion';
import Proyectos from './components/Proyectos';
import Formacion from './components/Formacion';
import Contacto from './components/Contacto';

function App() {
  return (
    <>
      <h1>Carlos Reales</h1>
      <p>Estudiante de Ingeniería de Sistemas</p>

      <Seccion id="sobre-mi" titulo="Sobre mí">
        <p>
          Soy Carlos, estudiante de Ingeniería de Sistemas. Me gusta la programación
          porque me hace llevar mis conocimientos a otro nivel de una manera impensable.
          Actualmente estoy aprendiendo control de versiones con Git y GitHub, y cómo
          publicar proyectos en la web.
        </p>
      </Seccion>
      <Proyectos />
      <Formacion />
      <Contacto />
    </>
  );
}

export default App;
