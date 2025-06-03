import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../entity/user.entity';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repo: jest.Mocked<Repository<User>>;

  const mockUser: User = {
    id: 1,
    email: 'usuario1@example.com',
    password: 'hashedPassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(getRepositoryToken(User));
  });

  describe('create', () => {
    it('debería crear un usuario nuevo si el email no existe', async () => {
      repo.findOne.mockResolvedValue(null); // no existe
      repo.create.mockReturnValue(mockUser);
      repo.save.mockResolvedValue(mockUser);

      const result = await service.create({
        email: mockUser.email,
        password: 'simplePassword',
      });

      expect(bcrypt.hash).toBeDefined();
      expect(repo.create).toHaveBeenCalledWith(
        expect.objectContaining({ email: mockUser.email }),
      );
      expect(repo.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });

    it('debería lanzar ConflictException si el email ya existe', async () => {
      repo.findOne.mockResolvedValue(mockUser);

      await expect(
        service.create({ email: mockUser.email, password: 'pass' }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('debería retornar todos los usuarios', async () => {
      repo.find.mockResolvedValue([mockUser]);
      const result = await service.findAll();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findByEmailOrFail', () => {
    it('debería retornar el usuario si existe', async () => {
      repo.findOne.mockResolvedValue(mockUser);
      const result = await service.findByEmailOrFail(mockUser.email);
      expect(result).toEqual(mockUser);
    });

    it('debería lanzar NotFoundException si no existe', async () => {
      repo.findOne.mockResolvedValue(null);
      await expect(service.findByEmailOrFail(mockUser.email)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('debería actualizar el usuario', async () => {
      const updatedUser = { ...mockUser, email: 'updated@example.com' };
      repo.findOne.mockResolvedValue(mockUser);
      repo.save.mockResolvedValue(updatedUser);

      const result = await service.update(mockUser.id, {
        email: 'updated@example.com',
        password: 'newPassword',
      });

      expect(result.email).toEqual('updated@example.com');
    });

    it('debería lanzar NotFoundException si no encuentra al usuario', async () => {
      repo.findOne.mockResolvedValue(null);
      await expect(service.update(99, { email: 'test' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('debería eliminar el usuario', async () => {
      repo.findOne.mockResolvedValue(mockUser);
      repo.remove.mockResolvedValue(mockUser);

      await expect(service.remove(mockUser.id)).resolves.toBeUndefined();
    });

    it('debería lanzar NotFoundException si no existe', async () => {
      repo.findOne.mockResolvedValue(null);
      await expect(service.remove(mockUser.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
