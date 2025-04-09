import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const EmailIsInUseResponse = () =>
  ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'El correo electrónico ya está en uso',
    schema: {
      example: {
        status: HttpStatus.CONFLICT,
        message: 'El correo electrónico ya está en uso',
        name: 'EmailIsInUseException',
      },
    },
  });
