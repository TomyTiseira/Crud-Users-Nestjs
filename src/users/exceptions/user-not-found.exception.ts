import { HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends Error {
  status: number;

  constructor() {
    super('User not found');
    this.name = 'UserNotFoundException';
    this.status = HttpStatus.NOT_FOUND;
  }
}
