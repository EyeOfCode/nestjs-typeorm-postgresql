import { I18nService } from 'nestjs-i18n';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    const req = exception.getResponse() as {
      key: string;
      fieldError?: ValidationError[];
      args: Record<string, any>;
    };

    const message = await this.i18n.t(req.key, {
      lang: ctx.getRequest().i18nLang,
      args: req.args,
    });

    if (req.fieldError) {
      const field = await this.translateErrors(
        req.fieldError,
        ctx.getRequest().i18nLang,
      );
      response.status(statusCode).json({ statusCode, message, field });
    } else {
      response.status(statusCode).json({ statusCode, message });
    }
  }

  async translateErrors(errors: ValidationError[], lang: string) {
    const data = [];
    for (const error of errors) {
      const message = await Promise.all(
        Object.keys(error.constraints).map(async (key: string) =>
          this.i18n.t(`validation.${key}`, {
            lang,
            args: {
              property: error.property,
            },
          }),
        ),
      );
      data.push({ field: error.property, message });
    }
    return data;
  }
}
