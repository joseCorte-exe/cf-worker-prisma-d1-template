import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import { BaseError } from '../errors';

export const errorHandlerMiddleware = () => {
  return createMiddleware(async (c, next) => {
    try {
      await next();
    } catch (error: any) {
      // Handle BaseError instances
      if (error instanceof BaseError) {
        return c.json(
          {
            error: {
              name: error.name,
              message: error.message,
              ...(error.cause ? { cause: error.cause } : {}),
            },
          },
          error.statusCode
        );
      }

      // Handle HTTPException (Hono built-in)
      if (error instanceof HTTPException) {
        return c.json(
          {
            error: {
              name: 'HTTP_EXCEPTION',
              message: error.message,
            },
          },
          { status: error.status }
        );
      }

      // Handle unknown errors
      console.error('Unhandled error:', error);
      
      return c.json(
        {
          error: {
            name: 'INTERNAL_SERVER_ERROR',
            message: 'An unexpected error occurred',
          },
        },
        { status: 500 }
      );
    }
  });
};