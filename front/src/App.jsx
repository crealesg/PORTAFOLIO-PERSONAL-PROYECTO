// front/src/App.jsx
// Versión inicial, sin reutilización: cada sección repite su propia estructura.

function App() {
  return (
    <>
      <h1>Carlos Reales</h1>
      <p>Estudiante de Ingeniería de Sistemas</p>

      <section id="sobre-mi">
        <h2>Sobre mí</h2>
        <p>
          Soy Carlos, estudiante de Ingeniería de Sistemas. Me gusta la programación
          porque me hace llevar mis conocimientos a otro nivel de una manera impensable.
          Actualmente estoy aprendiendo control de versiones con Git y GitHub, y cómo
          publicar proyectos en la web.
        </p>
      </section>
    </>
  );
}

export default App;