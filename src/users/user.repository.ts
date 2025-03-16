import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  private users: User[] = [];

  /**
   * Obtener una lista de usuarios.
   * @param search texto a buscar
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
  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id && user.isActive === true);
  }

  /**
   * Crear un nuevo usuario en el array.
   * @param user usuario a crear.
   */
  save(user: User): void {
    this.users.push(user);
  }

  /**
   * Actualizar un usuario por su id
   * @param user usuario con los datos a actualizar
   * @param id id del usuario a actualizar
   */
  update(user: User, id: string): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = user;
    }
  }

  /**
   * Eliminar un usuario por su id
   * @param id id del usuario a eliminar
   */
  remove(id: string): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index].isActive = false;
    }
  }

  /**
   * Verificar si un email ya está en uso.
   * @param email email a evaluar.
   * @param excludeId id del usuario a excluir en la búsqueda (para update).
   * @returns true si el email está en uso, false en caso contrario.
   */
  isEmailInUse(email: string, excludeId?: string): boolean {
    return this.users.some(
      (user) => user.email === email && user.id !== excludeId,
    );
  }
}
