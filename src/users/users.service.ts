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
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Crear un nuevo usuario en el array.
   * @param createUserDto Dto con los datos del usuario a crear.
   */
  create(createUserDto: CreateUserDto): User {
    // Verificar si el correo electrónico ya está en uso.
    if (this.userRepository.isEmailInUse(createUserDto.email)) {
      throw new EmailIsInUseException();
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

    // this.users.push(newUser);
    this.userRepository.save(newUser);

    return newUser;
  }

  /**
   * Obtener una lista de usuarios.
   * @param search texto a buscar
   */
  findAll(search?: string): User[] {
    return this.userRepository.findAll(search);
  }

  /**
   * Buscar un usuario por su id.
   * @param id id del usuario a buscar.
   */
  findOne(id: string): User {
    const user = this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException(); // No existe el usuario o está inactivo

    return user;
  }

  /**
   * Actualizar un usuario por su id
   * @param id id del usuario a actualizar
   * @param updateUserDto dto con los datos a actualizar del usuario.
   */
  update(id: string, updateUserDto: UpdateUserDto): User {
    const user = this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException(); // No existe el usuario o está inactivo

    // Validar que el email sea único
    if (
      updateUserDto.email &&
      this.userRepository.isEmailInUse(updateUserDto.email, id)
    ) {
      throw new EmailIsInUseException();
    }

    const updatedUserData = {
      ...user,
      ...updateUserDto,
      profile: {
        ...user.profile,
        ...updateUserDto.profile,
      },
    };

    this.userRepository.update(updatedUserData, id);

    return updatedUserData;
  }

  /**
   * Eliminar un usuario por su id
   * @param id id del usuario a eliminar
   */
  remove(id: string): User {
    const user = this.userRepository.findById(id);
    if (!user) throw new UserNotFoundException(); // No existe el usuario o está inactivo

    if (!user.isActive) throw new UserAlreadyInactiveException(); // Si el usuario ya está inactivo no se puede eliminar.

    this.userRepository.remove(id);

    return user;
  }
}
