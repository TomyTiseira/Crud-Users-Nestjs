import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { randomUUID } from 'crypto';
import { CreateUserDto, UpdateUserDto } from './dto';
import {
  EmailIsInUseException,
  UserAlreadyInactiveException,
  UserNotFoundException,
} from './exceptions';
import { ROLE_PERMISSIONS, ROLES } from 'src/common/constants';

@Injectable()
export class UsersService {
  private users: User[] = [];

  /**
   * Verificar si el email ya está en uso.
   * @param email email a evaluar.
   * @returns true si no está en uso, false en caso contrario.
   */
  private isEmailUnique = (email: string) => {
    return !this.users.some((user) => user.email === email);
  };

  /**
   * Crear un nuevo usuario en el array.
   * @param createUserDto Dto con los datos del usuario a crear.
   */
  create(createUserDto: CreateUserDto): User {
    if (!this.isEmailUnique(createUserDto.email)) {
      throw new EmailIsInUseException(); // email ya está en uso
    }

    const newUser: User = {
      // Se crea el id como un random uuid.
      id: randomUUID(),
      isActive: true, // Se crea por defecto isActive en true
      ...createUserDto,
      role: ROLES.USER,
      permissions: ROLE_PERMISSIONS[ROLES.USER],
      profile: {
        // Se crea el id como un random uuid.
        id: randomUUID(),
        ...createUserDto.profile,
      },
    };

    this.users.push(newUser);

    return newUser;
  }

  /**
   * Obtener una lista de usuarios.
   */
  findAll(search?: string): User[] {
    return this.users.filter((user) => {
      // Solo se muestran usuarios activos
      if (!user.isActive) return false;

      // Si no hay búsqueda, se muestran todos los usuarios activos
      if (!search) return true;

      // Si hay búsqueda, se muestra el usuario si el nombre o el email coinciden con la
      return (
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  /**
   * Buscar un usuario por su id.
   * @param id id del usuario a buscar.
   */
  findOne(id: string): User {
    const user = this.users.find(
      (user) => user.id === id && user.isActive === true,
    );

    if (!user) throw new UserNotFoundException(); // No existe el usuario o está inactivo

    return user;
  }

  /**
   * Actualizar un usuario por su id
   * @param id id del usuario a actualizar
   * @param updateUserDto dto con los datos a actualizar del usuario.
   */
  update(id: string, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex(
      (user) => user.id === id && user.isActive === true,
    );

    if (userIndex === -1) throw new UserNotFoundException(); // Usuario no encontrado

    const user = this.users[userIndex];

    if (
      updateUserDto.email &&
      updateUserDto.email !== user.email &&
      !this.isEmailUnique(updateUserDto.email)
    ) {
      throw new EmailIsInUseException(); // email ya está en uso
    }

    this.users[userIndex] = {
      ...user,
      ...updateUserDto,
      profile: {
        ...user.profile,
        ...updateUserDto.profile,
      },
    };

    return this.users[userIndex];
  }

  /**
   * Eliminar un usuario por su id
   * @param id id del usuario a eliminar
   */
  remove(id: string): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new UserNotFoundException(); // Usuario no encontrado

    const user = this.users[userIndex];

    if (!user.isActive) throw new UserAlreadyInactiveException(); // Si el usuario ya está inactivo no se puede eliminar.

    user.isActive = false; // Borrado lógico del usuario

    return user;
  }
}
