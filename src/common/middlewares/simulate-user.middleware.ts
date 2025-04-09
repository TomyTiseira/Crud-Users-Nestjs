import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ROLE_PERMISSIONS, ROLES } from 'src/common/constants';

// Request customizada para incluir al usuario
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
    age: number;
    profile: {
      code: string;
      name: string;
    };
    role: string;
    permissions: string[];
  };
}

@Injectable()
export class SimulateUserMiddleware implements NestMiddleware {
  use(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    // Simula un usuario autenticado con permisos de ADMIN
    req.user = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      isActive: false,
      age: 30,
      profile: {
        code: 'EMP-123',
        name: 'Empleado',
      },
      role: ROLES.ADMIN,
      permissions: ROLE_PERMISSIONS[ROLES.ADMIN],
    };

    next();
  }
}
