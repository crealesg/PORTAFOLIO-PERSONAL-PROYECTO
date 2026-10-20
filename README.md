# PORTAFOLIO-PERSONAL-PROYECTO by CARLOS REALES
Sitio web personal para mostrar información académica, proyectos y una forma de contacto, desarrollado como proyecto final de la asignatura Buenas Prácticas de Desarrollo de Software.

Funcionalidades:
Sección "Sobre mí" con información personal
Listado de proyectos generado dinámicamente con JavaScript
Listado de formación académica generado dinámicamente con JavaScript
Formulario de contacto que guarda los mensajes enviados en el navegador
Sitio desplegado automáticamente en Netlify desde la rama main

Tecnologías
HTML, CSS y JavaScript

Flujo de trabajo
El proyecto sigue un flujo de ramas main / dev / pruebas, con Pull Requests revisados antes de fusionar cambios

## Despliegue en AWS
| Integrante | URL del sitio | Bucket publico | Bucket privado |
|---|---|---|---|
| Carlos Reales | http://cuc-bp-eq08-reales-sitio-2026.s3-website-us-east-1.amazonaws.com | cuc-bp-eq08-reales-sitio-2026 | cuc-bp-eq08-reales-privado-2026 |

El sitio pasó de Netlify a Amazon S3 como primera fase de la migración del proyecto a AWS. Con S3 manejamos nosotros mismos cómo se publica el sitio y quién puede verlo, y queda listo para conectarlo después con el servidor y la base de datos. Cada integrante creó dos buckets. El bucket público guarda los archivos del sitio para que cualquier persona pueda abrir la página. El bucket privado guarda archivos internos que nadie puede abrir desde internet, por eso muestra un error 403.
