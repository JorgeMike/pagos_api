import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from '../dto/login-user.dto';

export function ApiLoginUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Iniciar sesión',
      description: `Este endpoint permite autenticar a un usuario existente mediante correo y contraseña. 
Devuelve un token JWT válido para acceder a rutas protegidas.`,
    }),
    ApiBody({
      type: LoginDto,
      description: 'Credenciales del usuario',
      examples: {
        loginCorrecto: {
          summary: 'Login exitoso',
          value: {
            email: 'usuario1@example.com',
            password: 'contrasena123',
          },
        },
        emailIncorrecto: {
          summary: 'Correo no registrado',
          value: {
            email: 'noexiste@example.com',
            password: 'cualquier123',
          },
        },
        passwordIncorrecta: {
          summary: 'Contraseña incorrecta',
          value: {
            email: 'usuario1@example.com',
            password: 'incorrecta',
          },
        },
      },
    }),
  );
}
