<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">Prueba Técnica para Casa Benetti</h1>

Este proyecto es una API REST desarrollada en **NestJS** que implementa un sistema básico de pagos. Se incluyen funcionalidades para:

- Registrar nuevos usuarios.
- Iniciar una transacción de pago.
- Consultar historial de transacciones de un usuario.
- Validar que una transacción esté autorizada antes de procesarla.

La API está documentada con **Swagger** y se puede ejecutar en contenedores Docker mediante **Dockerfile** y **docker-compose**.

## Estructura del Proyecto

El proyecto sigue una arquitectura modular utilizando los principios de NestJS. Cada módulo contiene:

- `module.ts`: configuración del módulo.
- `controller.ts`: definición de endpoints.
- `service.ts`: lógica de negocio.

Además, cada módulo puede incluir las siguientes carpetas:

| Carpeta    | Propósito                                         |
|------------|---------------------------------------------------|
| `dto/`     | Definición de los Data Transfer Objects.          |
| `entity/`  | Definición de entidades (si aplica).              |
| `docs/`    | Documentación Swagger específica del módulo.      |
| `test/`    | Pruebas unitarias del módulo.                     |

---

## Tabla de Contenidos

- [Descripción](#prueba-técnica-para-casa-benetti)
- [Instalación y Ejecución (Local)](#instalación-y-ejecución-local)
- [Documentación Swagger](#documentación-swagger)
- [Endpoints](#-endpoints)
- [Cobertura de la Prueba Técnica](#puntos-de-la-prueba)
- [Pruebas Unitarias](#pruebas-unitarias)
- [CI/CD](#cicd)

---

## Instalación y Ejecución (Local)

1. **Clonar el repositorio**

```bash
git clone https://github.com/JorgeMike/pagos_api.git
cd pagos_api
```

2. **Construir y levantar contenedores con Docker Compose**

```bash
docker-compose up -d --build
```

> Las credenciales para entorno local están definidas en el archivo `docker-compose.yml`

---

## Documentación Swagger

Una vez levantada la API, accede a la documentación interactiva:

[http://localhost:3000/docs](http://localhost:3000/docs)

---

## Endpoints

> **Nota:** Todos los endpoints, excepto `/auth/login` y `/users/register`, requieren enviar el token JWT en el header `Authorization: Bearer <token>`.

### 1. Autenticación

| Método | Ruta          | Descripción                           |
| ------ | ------------- | ------------------------------------- |
| POST   | `/auth/login` | Inicia sesión y obtiene un JWT token. |

### 2. Usuarios

| Método | Ruta              | Descripción                      |
| ------ | ----------------- | -------------------------------- |
| POST   | `/users/register` | Registrar un nuevo usuario.      |
| GET    | `/users`          | Obtener todos los usuarios.      |
| GET    | `/users/{id}`     | Obtener usuario por ID.          |
| PUT    | `/users/{id}`     | Actualizar un usuario existente. |
| DELETE | `/users/{id}`     | Eliminar un usuario.             |

### 3. Transacciones

| Método | Ruta                                     | Descripción                                                          |
| ------ | ---------------------------------------- | -------------------------------------------------------------------- |
| POST   | `/transactions`                          | Iniciar una nueva transacción.                                       |
| GET    | `/transactions/history`                  | Obtener historial de transacciones del usuario autenticado.          |
| GET    | `/transactions/history/{userId}`         | Obtener historial de transacciones de un usuario por ID.             |
| POST   | `/transactions/complete/{transactionId}` | Marcar la transacción como "completed" tras validación.             |

---

## Puntos de la Prueba

- Registrar nuevos usuarios - `POST /users/register`
- Iniciar una transacción de pago - `POST /transactions`
- Consultar el historial de transacciones:
  - Por ID de usuario: `GET /transactions/history/{userId}`
  - Por usuario autenticado: `GET /transactions/history`
- Validar que una transacción esté autorizada antes de procesarla: `POST /transactions/complete/{transactionId}`

---

## Pruebas Unitarias

Se implementaron pruebas unitarias para los módulos de autenticación y usuarios.

Ejecutar pruebas:

```bash
npm run test
```

---

## CI/CD

Se utilizó **Docker** para contenerización y **GitHub Actions** para automatizar el pipeline de integración y despliegue continuo:

- Rama `main`: despliegue a producción.

El pipeline realiza:

- Instalación de dependencias.
- Ejecución de pruebas.
- Build de imagen Docker.

---