import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

export function ApiCreateTransaction() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new transaction',
      description:
        'This endpoint allows you to create a new transaction by providing the necessary details.',
    }),
    ApiBearerAuth('jwt'),
    ApiBody({
      description: 'Datos para crear una transacción',
      type: CreateTransactionDto,
      examples: {
        example: {
          summary: 'Ejemplo de creación de transacción',
          value: {
            amount: 1000,
            currency: 'USD',
          },
        },
      },
    }),
  );
}

export function ApiGetTransactionHistoryByUserId() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get transaction history by user ID',
      description:
        'This endpoint allows you to retrieve the transaction history for a specific user by their ID.',
    }),
    ApiBearerAuth('jwt'),
    ApiParam({
      name: 'userId',
      description: 'ID of the user whose transaction history is to be retrieved',
      type: Number,
    }),
  );
}

export function ApiGetTransactionHistory() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get transaction history',
      description: 'Retrieve the transaction history for the authenticated user.',
    }),
    ApiBearerAuth('jwt'),
  );
}