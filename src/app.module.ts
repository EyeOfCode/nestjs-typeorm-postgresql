import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import dbConfig, { dbFactory } from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
// import ConfigDB from 'src/database/ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      expandVariables: true,
    }),
    // not validate
    // TypeOrmModule.forRoot(ConfigDB),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(dbConfig)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => dbFactory(configService),
    }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      playground: true,
      autoSchemaFile: './src/schema.graphql',
      introspection: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
