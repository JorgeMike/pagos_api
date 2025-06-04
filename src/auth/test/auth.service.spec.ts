import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { User } from 'src/users/entity/user.entity';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  const mockUser: User = {
    transactions: [],
    id: 1,
    email: 'usuario1@example.com',
    password: 'hashedPassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            findByEmailOrFail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  describe('validateUser', () => {
    it('debería devolver el usuario sin contraseña si la contraseña es correcta', async () => {
      usersService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('test@example.com', '1234');
      expect(result).toEqual({ id: mockUser.id, email: mockUser.email, transactions: [] });
    });

    it('debería devolver null si el usuario no existe o la contraseña es incorrecta', async () => {
      usersService.findByEmail.mockResolvedValue(null);
      const result = await service.validateUser('nope@example.com', '1234');
      expect(result).toBeNull();

      usersService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      const result2 = await service.validateUser('test@example.com', 'wrong');
      expect(result2).toBeNull();
    });
  });

  describe('login', () => {
    it('debería devolver un token si el login es exitoso', async () => {
      usersService.findByEmailOrFail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jwtService.sign.mockReturnValue('mockToken');

      const result = await service.login('test@example.com', '1234');
      expect(result).toEqual({ token: 'mockToken' });
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
      });
    });

    it('debería lanzar UnauthorizedException si la contraseña es incorrecta', async () => {
      usersService.findByEmailOrFail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login('test@example.com', 'wrong')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
