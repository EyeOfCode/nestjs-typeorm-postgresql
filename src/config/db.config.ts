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
  POSTGRES_LOGS: boolean;
}

const SCHEMA = yup.object({
  POSTGRES_HOST: yup.string(),
  POSTGRES_PORT: yup.number().default(5432),
  POSTGRES_SYNC: yup.boolean().default(false),
  POSTGRES_MIGRATION_RUN: yup.boolean().default(false),
  POSTGRES_USER: yup.string(),
  POSTGRES_PASSWORD: yup.string(),
  POSTGRES_DATABASE: yup.string(),
  POSTGRES_LOGS: yup.boolean().default(true),
});

export const configDb = {
  dataBaseType: 'postgres',
  entityDir: `${root}/**/*.entity{.ts,.js}`,
  migrationsDir: `${root}/database/migration`,
  seedsDir: `${root}/database/seed`,
};

export const env = {
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT, 10),
  POSTGRES_SYNC: process.env.POSTGRES_SYNC,
  POSTGRES_MIGRATION_RUN: process.env.POSTGRES_MIGRATION_RUN,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
  POSTGRES_LOGS: process.env.POSTGRES_LOGS,
};

export const dbFactory = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const setting = {
    type: configDb.dataBaseType,
    host: configService.get<string>('db.POSTGRES_HOST'),
    port: configService.get<number>('db.POSTGRES_PORT'),
    username: configService.get<string>('db.POSTGRES_USER'),
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [configDb.entityDir],
    synchronize: configService.get<boolean>('db.POSTGRES_SYNC'),
    migrations: [`${configDb.migrationsDir}/*{.ts,.js}`],
    cli: {
      entitiesDir: `${root}/entity`,
      migrationsDir: `${configDb.migrationsDir}`,
    },
    migrationsRun: configService.get<boolean>('db.POSTGRES_MIGRATION_RUN'),
    logging: process.env.POSTGRES_LOGS || true,
    logger: 'file',
    seeds: [`${configDb.seedsDir}/*{.ts,.js}`],
  } as TypeOrmModuleOptions;
  return setting;
};

export default registerAs('db', (): DbConfig => {
  let value: DbConfig;
  try {
    value = SCHEMA.validateSync(env, validationOptions);
  } catch (error) {
    throw Error('ENV validation falied – DB: ' + error.message);
  }
  return value;
});
