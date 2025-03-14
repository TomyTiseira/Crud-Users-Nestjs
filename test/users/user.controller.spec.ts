import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto';
import { UserNotFoundException } from 'src/users/exceptions';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
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

    const result = controller.create(createUserDto);
    expect(result).toBeDefined();
    expect(result.name).toBe('Juan Pérez');
    expect(result.email).toBe('juan@example.com');
    expect(result.age).toBe(30);
    expect(result.profile.code).toBe('EMP-123');
  });

  it('debería obtener todos los usuarios', () => {
    const createUserDto: CreateUserDto = {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      age: 30,
      profile: {
        code: 'EMP-123',
        name: 'Empleado',
      },
    };

    controller.create(createUserDto);
    const users = controller.findAll();
    expect(users).toHaveLength(1);
    expect(users[0].name).toBe('Juan Pérez');
  });

  it('debería obtener un usuario por ID', () => {
    const createUserDto: CreateUserDto = {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      age: 30,
      profile: {
        code: 'EMP-123',
        name: 'Empleado',
      },
    };

    const user = controller.create(createUserDto);
    const foundUser = controller.findOne(user.id);
    expect(foundUser).toBeDefined();
    expect(foundUser.name).toBe('Juan Pérez');
  });

  it('debería lanzar un error si el usuario no existe al buscar por ID', () => {
    expect(() => controller.findOne('invalid-id')).toThrowError(
      UserNotFoundException,
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

    const user = controller.create(createUserDto);

    const updateUserDto: UpdateUserDto = {
      age: 31,
    };

    const updatedUser = controller.update(user.id, updateUserDto);
    expect(updatedUser.age).toBe(31);
  });

  it('debería lanzar un error si el usuario no existe al actualizar', () => {
    const updateUserDto: UpdateUserDto = {
      age: 31,
    };

    expect(() => controller.update('invalid-id', updateUserDto)).toThrowError(
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

    const user = controller.create(createUserDto);
    controller.remove(user.id);

    expect(() => controller.findOne(user.id)).toThrowError(
      UserNotFoundException,
    );
  });

  it('debería lanzar un error si el usuario no existe al eliminar', () => {
    expect(() => controller.remove('invalid-id')).toThrowError(
      UserNotFoundException,
    );
  });
});
