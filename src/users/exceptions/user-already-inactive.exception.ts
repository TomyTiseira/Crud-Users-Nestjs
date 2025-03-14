import { HttpStatus } from '@nestjs/common';

export class UserAlreadyInactiveException extends Error {
  status: number;

  constructor() {
    super('User already inactive');
    this.name = 'UserAlreadyInactiveException';
    this.status = HttpStatus.CONFLICT;
  }
}
