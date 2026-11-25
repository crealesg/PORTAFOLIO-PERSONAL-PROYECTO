// front/src/components/Seccion.jsx
function Seccion({ id, titulo, children }) {
  return (
    <section id={id}>
      <h2>{titulo}</h2>
      {children}
    </section>
  );
}

export default Seccion;
