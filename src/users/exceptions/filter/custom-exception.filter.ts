import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(Error) // Captura todas las excepciones de tipo Error
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Excepción de los dtos
    if (exception instanceof BadRequestException) {
      const status = HttpStatus.BAD_REQUEST;
      const resposeBody = exception.getResponse();

      return response.status(status).json(resposeBody);
    }

    // Manejo de errores personalizados
    if (
      typeof exception === 'object' &&
      'status' in exception &&
      'message' in exception
    ) {
      const status = isNaN(Number(exception.status))
        ? HttpStatus.BAD_REQUEST
        : Number(exception.status);

      return response.status(status).json({
        status,
        message: exception.message,
        name: exception.name,
      });
    }

    // Manejo de errores inesperados
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    });
  }
}
