import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  const mockToken = { token: 'mocked-jwt-token' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue(mockToken),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  describe('login', () => {
    it('debería devolver un token cuando las credenciales son válidas', async () => {
      const dto: LoginDto = {
        email: 'test@example.com',
        password: '1234',
      };

      const result = await controller.login(dto);
      expect(authService.login).toHaveBeenCalledWith(dto.email, dto.password);
      expect(result).toEqual(mockToken);
    });
  });
});
