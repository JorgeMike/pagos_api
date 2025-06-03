import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';

@ApiTags('Transacciones')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt')
  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Request() req,
  ) {
    return this.transactionsService.create(createTransactionDto);
  }
}
