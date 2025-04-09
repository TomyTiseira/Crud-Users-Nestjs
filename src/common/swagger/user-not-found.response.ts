import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const UserNotFoundResponse = () =>
  ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuario no encontrado',
    schema: {
      example: {
        status: HttpStatus.NOT_FOUND,
        message: 'Usuario no encontrado',
        name: 'UserNotFoundException',
      },
    },
  });
