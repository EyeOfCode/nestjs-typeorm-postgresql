import { configDb } from './../config/db.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const root = __dirname.includes('dist') ? 'dist' : 'src';

const configDB = {
  type: configDb.dataBaseType,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [configDb.entityDir],
  synchronize: false,
  migrations: [`${configDb.migrationsDir}/*{.ts,.js}`],
  cli: {
    entitiesDir: `${root}/entity`,
    migrationsDir: `${configDb.migrationsDir}`,
  },
  migrationsRun: false,
  logging: true,
  logger: 'file',
  seeds: [`${configDb.seedsDir}/*{.ts,.js}`],
} as TypeOrmModuleOptions;

export default configDB;
