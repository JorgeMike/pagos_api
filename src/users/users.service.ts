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
import { UpdateUserDto } from './dto/update-user.dto';

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

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user)
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    Object.assign(user, dto);
    return this.userRepo.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    await this.userRepo.remove(user);
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
