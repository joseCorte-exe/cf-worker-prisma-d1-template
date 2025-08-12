import { BaseError } from './base-error';

export class EmailAlreadyExistsError extends BaseError {
  constructor({
    email,
    cause,
  }: {
    email: string;
    cause?: any;
  }) {
    super({
      name: 'Email Already Exists',
      message: `Email '${email}' already exists in the system`,
      statusCode: 409,
      cause,
    });
  }
}