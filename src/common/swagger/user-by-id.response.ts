import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const UserByIdResponse = () =>
  ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuario encontrado por el id',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Juan Pérez',
        email: 'juan@example.com',
        isActive: true,
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
