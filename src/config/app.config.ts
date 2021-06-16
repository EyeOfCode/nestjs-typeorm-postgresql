import { registerAs } from '@nestjs/config';
import * as yup from 'yup';
import { validationOptions } from './validation.options';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface AppConfig {
  NODE_ENV: string;
  PORT: number;
}

const SCHEMA = yup.object({
  NODE_ENV: yup
    .string()
    .oneOf(['development', 'production', 'staging', 'test'])
    .default('development'),
  PORT: yup.number().default(8000),
});

export default registerAs('app', (): AppConfig => {
  const env = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? parseInt(process.env.PORT) : undefined,
  };

  let value: AppConfig;
  try {
    value = SCHEMA.validateSync(env, validationOptions);
  } catch (error) {
    throw Error('ENV validation failed – APP: ' + error.message);
  }
  return value;
});
