import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entity/transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) {}

  async initiateTransaction(
    userId: number,
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    if (createTransactionDto.amount <= 0) {
      throw new BadRequestException('El monto debe ser mayor a cero');
    }

    const transaction = this.transactionRepo.create({
      amount: createTransactionDto.amount,
      currency: createTransactionDto.currency ?? 'MXN',
      user: { id: userId }, // Asignar el usuario
    });

    // 4) Guardar en la base de datos
    const savedTx = await this.transactionRepo.save(transaction);

    // Llamar a la pasarela de pago externa y guardar referencia

    return savedTx;
  }

  async getHistoryByUserId(userId: number) {
    console.log('Fetching transaction history for user ID:', userId);
  }

  async create(createTransactionDto: CreateTransactionDto) {
    console.log('Creating transaction:', createTransactionDto);
  }

  async getHistoryByUser(userId: number): Promise<Transaction[]> {
    const history = await this.transactionRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });

    return history;
  }
}
