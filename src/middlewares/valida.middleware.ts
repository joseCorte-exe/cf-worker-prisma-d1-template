import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { createMiddleware } from 'hono/factory';

export const validateMiddleware = (
  schema: any,
  source: 'body' | 'params' | 'query',
) => {
  return createMiddleware(async (c, next) => {
    let data;

    switch (source) {
      case 'body':
        data = await c.req.json();
        break;
      case 'params':
        data = c.req.param();
        break;
      case 'query':
        data = c.req.query();
        break;
    }

    const instance = plainToInstance(schema, data);

    const errors = await validate(instance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const formatErrors = (errors: any) => {
        return errors.map((err: any) => {
          const formattedError: any = {
            field: err.property,
            errors: Object.values(err.constraints || {}),
          };

          if (err.children && err.children.length > 0) {
            formattedError.children = formatErrors(err.children);
          }

          return formattedError;
        });
      };

      const formattedErrors = formatErrors(errors);

      return c.json(
        {
          message: formattedErrors,
        },
        { status: 400 },
      );
    }

    await next();
  });
};