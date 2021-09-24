import { registerAs } from '@nestjs/config';
import * as yup from 'yup';
import { validationOptions } from './validation.options';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface AppConfig {
  NODE_ENV: string;
  PORT: number;
  JWT_SECRET_KEY: string;
  JWT_EXPIRES_IN: string;
}

const SCHEMA = yup.object({
  NODE_ENV: yup
    .string()
    .oneOf(['development', 'production', 'staging', 'test'])
    .default('development'),
  PORT: yup.number().default(8000),
  JWT_SECRET_KEY: yup.string().required(),
  JWT_EXPIRES_IN: yup.string().default('60s'),
  SALT_ROUND: yup.number().default(8),
});

export default registerAs('app', async (): Promise<AppConfig> => {
  const env = await SCHEMA.validate(process.env);

  let value: AppConfig;
  try {
    value = SCHEMA.validateSync(env, validationOptions);
  } catch (error) {
    throw Error('ENV validation failed – APP: ' + error.message);
  }
  return value;
});
