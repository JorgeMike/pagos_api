import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';

export function ApiCreateUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new user',
      description:
        'This endpoint allows you to create a new user by providing an email and password. The password will be hashed before storing it in the database.',
    }),
    ApiBody({
      description: 'Datos para crear un usuario',
      type: CreateUserDto,
      examples: {
        usuarioValido: {
          summary: 'Usuario válido',
          value: {
            email: 'usuario1@example.com',
            password: 'contrasena123',
          },
        },
        emailInvalido: {
          summary: 'Email inválido',
          value: {
            email: 'no-es-un-email',
            password: '12345678',
          },
        },
      },
    }),
  );
}
