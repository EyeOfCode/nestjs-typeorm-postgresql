import { configDb, env } from './../config/db.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const root = __dirname.includes('dist') ? 'dist' : 'src';

const configDB = {
  type: configDb.dataBaseType,
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DATABASE,
  entities: [configDb.entityDir],
  migrations: [`${configDb.migrationsDir}/*{.ts,.js}`],
  cli: {
    entitiesDir: `${root}/entity`,
    migrationsDir: `${configDb.migrationsDir}`,
  },
  seeds: [`${configDb.seedsDir}/*{.ts,.js}`],
} as TypeOrmModuleOptions;

export default configDB;
