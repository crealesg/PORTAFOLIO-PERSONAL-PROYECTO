# Portafolio Personal

Sitio web personal para presentar formación académica, listado dinámico de proyectos y formulario de contacto conectado a una API REST. Desarrollado como proyecto final de la asignatura Buenas Prácticas de Desarrollo de Software (CUC).

## Integrantes

- **Carlos Esteban Reales Gámez:** Frontend en React (componentes reutilizables y consumo de API), backend en Node.js/Express con arquitectura en capas, refactorización DRY, pruebas unitarias con Vitest, seguridad, documentación y despliegue en AWS.

## Tecnologías

- **Front-end:** React, Vite, CSS3
- **Back-end:** Node.js, Express, CORS
- **Pruebas:** Vitest
- **Infraestructura y despliegue:** AWS S3 (sitio estático y bucket privado) y AWS EC2
- **Control de versiones:** Git y GitHub (ramas `main`, `pruebas`, `dev` y `feature/`)

## Cómo levantarlo en local

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd PORTAFOLIO-PERSONAL-PROYECTO
   ```
2. Configurar la variable de entorno del frontend copiando `front/.env.example` como `front/.env.development`:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
   *(Para desarrollo local, si pruebas desde `http://localhost:5173`, ajusta temporalmente `ORIGEN_FRONT` en `api/src/servidor.js`; para producción se mantiene restringido al bucket S3).*
3. Instalar dependencias y levantar el back-end (puerto `3000`):
   ```bash
   cd api && npm install && npm run dev
   ```
4. En otra terminal, instalar dependencias y levantar el front-end (puerto `5173`):
   ```bash
   cd front && npm install && npm run dev
   ```

## Endpoints de la API

| Método | Ruta | Qué hace | Respuesta |
| :--- | :--- | :--- | :--- |
| `GET` | `/proyectos` | Lista todos los proyectos registrados en el repositorio | `200` arreglo JSON |
| `GET` | `/proyectos/resumen` | Devuelve el total de proyectos y tecnologías únicas | `200` objeto JSON |
| `POST` | `/mensajes` | Valida y registra un mensaje de contacto (`nombre`, `correo`, `texto`) | `201` objeto creado / `400` error de validación |

## Cómo correr las pruebas

Desde la raíz del repositorio:

```bash
npm --prefix api test
```

O entrando a la carpeta `api`:

```bash
cd api
npm test
```

## Despliegue

El sitio estático se publica en Amazon S3 y la API en una instancia Amazon EC2.

| Integrante | URL del sitio | Bucket público | Bucket privado |
| :--- | :--- | :--- | :--- |
| Carlos Reales | http://cuc-bp-eq08-reales-sitio-2026.s3-website-us-east-1.amazonaws.com | `cuc-bp-eq08-reales-sitio-2026` | `cuc-bp-eq08-reales-privado-2026` |

**Pasos para volver a desplegar:**
1. Levantar la instancia EC2 con el Security Group abierto únicamente en el puerto de la API (`3000`) y SSH cerrado al finalizar la configuración.
2. Subir la carpeta `api/`, instalar dependencias (`npm install`) y ejecutar `npm start`.
3. Crear `front/.env.production` con `VITE_API_URL=http://<IP-PUBLICA-EC2>:3000` y compilar con `cd front && npm run build`.
4. Subir el contenido de `front/dist/` a la raíz del bucket público en S3 (`index.html` en la raíz).

### Seguridad y auditoría de dependencias (`npm audit`)

- Validación de datos ejecutada en el servidor (`api/src/logica/reglas-portafolio.js`) con respuesta `400` descriptiva.
- Archivos `.env` y `node_modules` excluidos en `.gitignore`; se incluye `front/.env.example`.
- CORS restringido exclusivamente al origen del bucket S3 de producción.
- **Resultado de `npm audit` (24/11/2026):** `npm --prefix api audit` y `npm --prefix front audit` reportaron **0 vulnerabilidades** (`found 0 vulnerabilities`).
