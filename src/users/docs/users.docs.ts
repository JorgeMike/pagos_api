import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update-user.dto';
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

export function ApiGetAllUsers() {
  return applyDecorators(
    ApiBearerAuth('jwt'),
    ApiOperation({
      summary: 'Obtener todos los usuarios',
      description: 'Devuelve una lista con todos los usuarios registrados.',
    }),
  );
}

export function ApiGetUserById() {
  return applyDecorators(
    ApiBearerAuth('jwt'),
    ApiOperation({
      summary: 'Obtener usuario por ID',
      description: 'Devuelve un usuario específico por su ID.',
    }),
    ApiParam({
      name: 'id',
      type: Number,
      description: 'ID del usuario a consultar',
    }),
  );
}

export function ApiUpdateUser() {
  return applyDecorators(
    ApiBearerAuth('jwt'),
    ApiOperation({
      summary: 'Actualizar un usuario',
      description:
        'Actualiza los datos de un usuario por ID. Se puede actualizar el email o la contraseña.',
    }),
    ApiParam({
      name: 'id',
      type: Number,
      description: 'ID del usuario a actualizar',
    }),
    ApiBody({
      type: UpdateUserDto,
      description: 'Datos a actualizar',
      examples: {
        cambiarEmail: {
          summary: 'Cambiar solo el email',
          value: {
            email: 'nuevo@email.com',
          },
        },
        cambiarPassword: {
          summary: 'Cambiar solo la contraseña',
          value: {
            password: 'nuevacontrasena123',
          },
        },
        ambos: {
          summary: 'Cambiar email y contraseña',
          value: {
            email: 'otro@email.com',
            password: 'otraClave456',
          },
        },
      },
    }),
  );
}

export function ApiDeleteUser() {
  return applyDecorators(
    ApiBearerAuth('jwt'),
    ApiOperation({
      summary: 'Eliminar un usuario',
      description: 'Elimina un usuario por su ID.',
    }),
    ApiParam({
      name: 'id',
      type: Number,
      description: 'ID del usuario a eliminar',
    }),
  );
}
