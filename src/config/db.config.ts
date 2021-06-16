import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const root = __dirname.includes('dist') ? 'dist' : 'src';

const configDB = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [`${root}/**/*.entity{.ts,.js}`],
  synchronize: process.env.POSTGRES_SYNC || false,
  migrations: [`${root}/database/migrations/*{.ts,.js}`],
  cli: {
    entitiesDir: `${root}/entity`,
    migrationsDir: `${root}/database/migrations`,
  },
  migrationsRun: process.env.POSTGRES_MIGRATION_RUN || false,
  logging: true,
  logger: 'file',
  seeds: [`${root}/database/seeds/*{.ts,.js}`],
  factories: [`${root}/database/factories/*{.ts,.js}`],
} as TypeOrmModuleOptions;

export default configDB;
