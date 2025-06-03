import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existing = await this.findByEmail(createUserDto.email);

    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepo.create({
      email: createUserDto.email,
      password: hashedPassword,
    });

    return this.userRepo.save(user);
  }

  async findByEmail(
    email: string,
    useValidation: boolean = false,
  ): Promise<User | null> {
    const user = await this.userRepo.findOne({ where: { email } });

    if (useValidation && !user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }
}
