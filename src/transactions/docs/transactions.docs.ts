import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

export function ApiCreateUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new transaction',
      description:
        'This endpoint allows you to create a new user by providing an email and password. The password will be hashed before storing it in the database.',
    }),
    ApiBody({
      description: 'Datos para crear un usuario',
      type: CreateTransactionDto,
      examples: {},
    }),
  );
}
