<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">Preba Tecnica para Casa Benetti</h1>


Este proyecto es una API REST desarrollada en **NestJS** que implementa un sistema básico de pagos. Se incluyen funcionalidades para:

- Registrar nuevos usuarios.
- Iniciar una transacción de pago.
- Consultar historial de transacciones de un usuario.
- Validar que una transacción esté autorizada antes de procesarla.

La API está documentada con **Swagger** y se puede ejecutar en contenedores Docker mediante **Dockerfile** y **docker-compose**.

---

## 🚀 Instalación y Ejecución (Local)

1. **Clonar el repositorio**  
   ```bash
   git clone https://github.com/JorgeMike/pagos_api.git
   cd pagos_api
   ```

2. **Construir y levantar contenedores con Docker Compose**
  ```bash
  docker-compose up -d --build
  ```

  Las credenciales para local vienen en el docker compose

  ## 🔍 Endpoints

> **Nota:** Todos los endpoints, excepto `/auth/login` y `/users/register`, requieren enviar el token JWT en el header `Authorization: Bearer <token>`.

### 1. Autenticación

| Método | Ruta         | Descripción                          |
| ------ | ------------ | ------------------------------------ |
| POST   | `/auth/login`| Inicia sesión y obtiene un JWT token. |

1. **`POST /auth/login`**  
   - **Función**: Autentica al usuario con email y password.  
   - **Request Body**:
     ```json
     {
        "email": "usuario1@example.com",
        "password": "contrasena123"
     }
     ```
   - **Respuesta (200)**:
     ```json
     {
       "token": "eyJh..."
     }
     ```

### 2. Usuarios

| Método | Ruta              | Descripción                    |
| ------ | ----------------- | ------------------------------ |
| POST   | `/users/register` | Registrar un nuevo usuario.    |
| GET    | `/users`          | Obtener todos los usuarios.    |
| GET    | `/users/{id}`     | Obtener usuario por ID.        |
| PUT    | `/users/{id}`     | Actualizar un usuario existente. |
| DELETE | `/users/{id}`     | Eliminar un usuario.           |


### 3. Transacciones

| Método | Ruta                             | Descripción                         |
| ------ | -------------------------------- | ----------------------------------- |
| POST   | `/transactions`                  | Iniciar una nueva transacción.      |
| GET    | `/transactions/history`          | Obtener historial de las transacciones del usuario del token enviado |
| GET    | `/transactions/history/{userId}` | Obtener historial de transacciones de un usuario por id. |
