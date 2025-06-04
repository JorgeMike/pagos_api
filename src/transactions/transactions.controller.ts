import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';
import { ApiCompleteTransaction, ApiCreateTransaction, ApiGetTransactionHistory, ApiGetTransactionHistoryByUserId } from './docs/transactions.docs';

@ApiTags('Transacciones')
@Controller('transactions')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiCreateTransaction()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Request() req,
  ) {
    return this.transactionsService.initiateTransaction(
      req.user.id,
      createTransactionDto,
    );
  }

  @Get('history')
  @ApiGetTransactionHistory()
  async getHistory(@Request() req) {
    const userId = req.user.id;
    const history = await this.transactionsService.getHistoryByUser(userId);
    return { history };
  }

  @Get('history/:userId')
  @ApiGetTransactionHistoryByUserId()
  async history(@Param('userId') userId: number) {
    const history = await this.transactionsService.getHistoryByUser(userId);
    return { history };
  }

  @Post('complete/:transactionId')
  @ApiCompleteTransaction()
  async completeTransaction(@Param('transactionId') transactionId: string) {
    return this.transactionsService.completeTransaction(transactionId);
  }
}
