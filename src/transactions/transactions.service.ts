import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entity/transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly userRepo: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    console.log('Creating transaction:', createTransactionDto);
  }
}
