// src/users/users.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto, UpdateUserDto } from '../../src/users/dto';
import {
  EmailIsInUseException,
  UserNotFoundException,
} from '../../src/users/exceptions';
import { UsersService } from '../../src/users/users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería crear un usuario', () => {
    const createUserDto: CreateUserDto = {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      age: 30,
      profile: {
        code: 'EMP-123',
        name: 'Empleado',
      },
    };

    const user = service.create(createUserDto);
    expect(user).toBeDefined();
    expect(user.name).toBe('Juan Pérez');
    expect(user.email).toBe('juan@example.com');
    expect(user.age).toBe(30);
    expect(user.profile.code).toBe('EMP-123');
  });

  it('debería lanzar un error si el correo electrónico ya está en uso', () => {
    const createUserDto: CreateUserDto = {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      age: 30,
      profile: {
        code: 'EMP-123',
        name: 'Empleado',
      },
    };

    service.create(createUserDto); // Crea el primer usuario
    expect(() => service.create(createUserDto)).toThrowError(
      EmailIsInUseException,
    );
  });

  it('debería actualizar un usuario', () => {
    const createUserDto: CreateUserDto = {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      age: 30,
      profile: {
        code: 'EMP-123',
        name: 'Empleado',
      },
    };

    const user = service.create(createUserDto);

    const updateUserDto: UpdateUserDto = {
      age: 31,
    };

    const updatedUser = service.update(user.id, updateUserDto);
    expect(updatedUser.age).toBe(31);
  });

  it('debería lanzar un error si el usuario no existe al actualizar', () => {
    const updateUserDto: UpdateUserDto = {
      age: 31,
    };

    expect(() => service.update('invalid-id', updateUserDto)).toThrowError(
      UserNotFoundException,
    );
  });

  it('debería eliminar un usuario', () => {
    const createUserDto: CreateUserDto = {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      age: 30,
      profile: {
        code: 'EMP-123',
        name: 'Empleado',
      },
    };

    const user = service.create(createUserDto);
    service.remove(user.id);

    expect(() => service.findOne(user.id)).toThrowError(UserNotFoundException);
  });

  it('debería lanzar un error si el usuario no existe al eliminar', () => {
    expect(() => service.remove('invalid-id')).toThrowError(
      UserNotFoundException,
    );
  });
});
