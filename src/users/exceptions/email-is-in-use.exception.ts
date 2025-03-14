import { HttpStatus } from '@nestjs/common';

export class EmailIsInUseException extends Error {
  status: number;

  constructor() {
    super('Email is in use');
    this.name = 'EmailIsInUseException';
    this.status = HttpStatus.CONFLICT;
  }
}
