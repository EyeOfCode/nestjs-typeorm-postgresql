import { JwtGuard } from 'src/middleware/guard/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import dbConfig, { dbFactory } from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'path';
import { I18nModule, I18nJsonParser, HeaderResolver } from 'nestjs-i18n';

// import ConfigDB from 'src/database/ormconfig';

import { UserModule } from './module/user/user.module';
import { BlogModule } from './module/blog/blog.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      expandVariables: true,
      isGlobal: true,
    }),

    // not validate
    // TypeOrmModule.forRoot(ConfigDB),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(dbConfig)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => dbFactory(configService),
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parserOptions: {
        path: path.join(__dirname, '/locales'),
        watch: true,
      },
      parser: I18nJsonParser,
      resolvers: [new HeaderResolver(['x-localization'])],
    }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      playground: true,
      autoSchemaFile: './src/schema.graphql',
      introspection: true,
      installSubscriptionHandlers: true,
      debug: true,
    }),
    UserModule,
    BlogModule,
    AuthModule,
  ],
})
export class AppModule {}
