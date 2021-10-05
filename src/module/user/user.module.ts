import { ShopModule } from './../shop/shop.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ShopModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
