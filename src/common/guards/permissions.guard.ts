import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRequest } from '../interfaces/user-request.interface';
import { METADATA } from '../constants';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<string[]>(
      METADATA.PERMISSIONS,
      context.getHandler(),
    );

    if (!permissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest<UserRequest>();
    const user = request.user;

    if (!user || !user.permissions) {
      throw new ForbiddenException(
        `User is not authenticated or does not have permissions`,
      );
    }

    const hasPermission = permissions.every((permission) =>
      user.permissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        ` You don't have permission to access this resource`,
      );
    }

    return true;
  }
}
