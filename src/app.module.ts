import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      expandVariables: true,
    }),
    TypeOrmModule.forRoot(dbConfig),
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
