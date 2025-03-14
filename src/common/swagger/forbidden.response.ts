import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ForbiddenResponse = () =>
  ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Acceso denegado por falta de permisos',
    schema: {
      example: {
        status: HttpStatus.FORBIDDEN,
        message: 'Acceso denegado por falta de permisos',
        name: 'ForbiddenException',
      },
    },
  });
