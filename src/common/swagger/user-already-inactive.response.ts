import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const UserAlreadyInactiveResponse = () =>
  ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'El usuario ya está inactivo',
    schema: {
      example: {
        status: HttpStatus.CONFLICT,
        message: 'El usuario ya está inactivo',
        name: 'UserAlreadyInactiveException',
      },
    },
  });
