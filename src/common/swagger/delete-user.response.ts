import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const DeleteUserResponse = () =>
  ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuario eliminado',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Juan Pérez',
        email: 'juan@example.com',
        isActive: false,
        age: 30,
        profile: {
          code: 'EMP-123',
          name: 'Empleado',
        },
        role: 'user',
        permissions: ['read-user'],
      },
    },
  });
