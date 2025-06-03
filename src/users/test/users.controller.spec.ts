import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser = { id: 1, email: 'test@example.com' };

  const mockUsersService = {
    create: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findById: jest.fn().mockResolvedValue(mockUser),
    update: jest
      .fn()
      .mockResolvedValue({ ...mockUser, email: 'updated@example.com' }),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  // Fake AuthGuard to bypass real JWT validation
  const mockAuthGuard = {
    canActivate: (context: ExecutionContext) => true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('register', () => {
    it('debería registrar un usuario', async () => {
      const dto: CreateUserDto = {
        email: 'test@example.com',
        password: '1234',
      };
      const result = await controller.register(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id: 1, email: 'test@example.com' });
    });
  });

  describe('findAll', () => {
    it('debería devolver todos los usuarios', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('debería devolver un usuario por ID', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('debería actualizar un usuario', async () => {
      const dto: UpdateUserDto = { email: 'updated@example.com' };
      const result = await controller.update(1, dto);
      expect(result.email).toEqual('updated@example.com');
    });
  });

  describe('remove', () => {
    it('debería eliminar un usuario', async () => {
      await expect(controller.remove(1)).resolves.toBeUndefined();
    });
  });
});
