type BaseErrorType = {
  name: string,
  message: string,
  cause?: any,
  statusCode?: number
};

export class BaseError extends Error {
  public statusCode: number;

  constructor({ name, message, cause, statusCode = 500 }: BaseErrorType) {
    super()

    this.name = name
    this.message = message
    this.statusCode = statusCode
    this.cause = cause
  }
}