import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs, ConfigService } from '@nestjs/config';
import { validationOptions } from './validation.options';
import * as yup from 'yup';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const root = __dirname.includes('dist') ? 'dist' : 'src';
export interface DbConfig {
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_SYNC: boolean;
  POSTGRES_MIGRATION_RUN: boolean;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DATABASE: string;
  POSTGRES_LOGS: string;
}

const SCHEMA = yup.object({
  POSTGRES_HOST: yup.string(),
  POSTGRES_PORT: yup.number().default(5432),
  POSTGRES_SYNC: yup.boolean().default(false),
  POSTGRES_MIGRATION_RUN: yup.boolean().default(false),
  POSTGRES_USER: yup.string(),
  POSTGRES_PASSWORD: yup.string(),
  POSTGRES_DATABASE: yup.string(),
  POSTGRES_LOGS: yup.string(),
});

export const dbFactory = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const setting = {
    type: 'postgres',
    host: configService.get<string>('db.POSTGRES_HOST'),
    port: configService.get<number>('db.POSTGRES_PORT'),
    username: configService.get<string>('db.POSTGRES_USER'),
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [`${root}/**/*.entity{.ts,.js}`],
    synchronize: configService.get<boolean>('db.POSTGRES_SYNC'),
    migrations: [`${root}/database/migrations/*{.ts,.js}`],
    cli: {
      entitiesDir: `${root}/entity`,
      migrationsDir: `${root}/database/migrations`,
    },
    migrationsRun: configService.get<boolean>('db.POSTGRES_MIGRATION_RUN'),
    logging: process.env.POSTGRES_LOGS || true,
    logger: 'file',
    seeds: [`${root}/database/seeds/*{.ts,.js}`],
    factories: [`${root}/database/factories/*{.ts,.js}`],
  } as TypeOrmModuleOptions;
  return setting;
};

export default registerAs('db', (): DbConfig => {
  const env = {
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT, 10),
    POSTGRES_SYNC: process.env.POSTGRES_SYNC,
    POSTGRES_MIGRATION_RUN: process.env.POSTGRES_MIGRATION_RUN,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    POSTGRES_LOGS: process.env.POSTGRES_LOGS,
  };

  let value: DbConfig;
  try {
    value = SCHEMA.validateSync(env, validationOptions);
  } catch (error) {
    throw Error('ENV validation falied – DB: ' + error.message);
  }
  return value;
});
