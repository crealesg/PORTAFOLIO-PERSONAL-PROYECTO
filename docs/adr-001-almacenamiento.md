# ADR-001: Diseño del almacenamiento del proyecto en Amazon S3

- Fecha: 2026-10-20
- Autor: Carlos Reales (Equipo 08)
- Estado: Aceptada

## Contexto

El sitio del proyecto estaba alojado en Netlify y se migró a Amazon S3, en el bucket `cuc-bp-eq08-reales-sitio-2026`, Existe además un bucket privado (`cuc-bp-eq08-reales-privado-2026`) que solo contenía un archivo de prueba sin significado,
El problema principal es que el sitio no tiene protección frente a errores, sin versionado, si alguien borra o sobrescribe `index.html` por equivocación, el sitio cae con un 404 y el archivo no se puede recuperar.
Además, el proyecto va a manejar datos que no deben ser públicos (mensajes de contacto de los usuarios, configuración y respaldos de la base de datos), y no hay un lugar definido para guardarlos ni un criterio para decidir qué va en cada bucket.
Activar el versionado resuelve el primer problema pero crea otro, el bucket conserva todas las versiones de cada archivo y, sin una política de retención, el almacenamiento y el costo crecen indefinidamente.
Hay que decidir, entonces, cómo hacer reversibles los errores, cómo separar los datos públicos de los privados y cómo mantener el costo bajo control.

## Decisión

**Buckets.** Se usan dos buckets con propósitos distintos:

- `cuc-bp-eq08-reales-sitio-2026`: acceso público de lectura, solo para los archivos estáticos del sitio (`index.html`, `script.js`, `style.css`, `README.md`). Nada sensible se guarda aquí, porque cualquier persona con la URL puede leerlo.
- `cuc-bp-eq08-reales-privado-2026`: sin acceso público, solo lo leen las identidades autorizadas del proyecto. Aquí va todo lo que no debe ser visible desde internet.

**Prefijos del bucket privado.** Se separan los datos por tipo con cuatro prefijos:

- `configuracion/`: archivos de configuración del proyecto.
- `mensajes-contacto/`: mensajes que los usuarios envían desde el formulario del sitio (contienen datos personales).
- `respaldos-bd/`: copias de seguridad de la base de datos.
- `respaldos-sitio/`: copias de seguridad del código y contenido del sitio.

**Versionado.** Activado en el bucket del sitio, porque ahí está el riesgo demostrado en el laboratorio (borrar `index.html` tumba el sitio) y los archivos son pequeños, así que guardar versiones cuesta muy poco.

**Ciclo de vida.** Regla `retencion-sitio`, habilitada, aplicada a todo el bucket del sitio:

- Versiones vigentes: a los 30 días pasan a Standard-IA y a los 90 días a Glacier Instant Retrieval.
- Versiones no vigentes: a los 60 días de dejar de ser la versión actual se eliminan permanentemente (se conservan 0 versiones no vigentes más recientes).

Los plazos van en orden creciente (30 < 60 < 90) 
## Alternativas consideradas

1. **Dejar el sitio en Netlify.** Descartada porque necesitamos controlar directamente el almacenamiento (versionado, ciclo de vida, permisos por bucket y por prefijo), y Netlify oculta esas decisiones. Además, el sitio ya está migrado y funcionando en S3, y mantenerlo en dos plataformas duplicaría el trabajo.
2. **Usar un solo bucket para todo.** Descartada porque mezclaría archivos públicos con datos privados en el mismo contenedor. Un solo error en la política de acceso (por ejemplo, abrir el bucket para que el sitio se vea) dejaría expuestos los mensajes de contacto y los respaldos de la base de datos, con datos personales de los usuarios. Con dos buckets, un error en uno no compromete al otro.
3. **No activar el versionado.** Descartada porque, sin versionado, un borrado accidental de `index.html` es irreversible: el sitio cae y el archivo se pierde. El costo de las versiones en un sitio de archivos de pocos KB es insignificante frente al riesgo.
4. **Usar versionado sin regla de ciclo de vida.** Descartada porque cada versión se acumula para siempre: el almacenamiento y el costo crecen sin límite aunque nadie vaya a necesitar versiones de hace meses. La regla pone un tope (60 días) a ese crecimiento.

## Consecuencias
### Positivas
### Costos o desventajas que aceptamos
### Qué habría que revisar más adelante