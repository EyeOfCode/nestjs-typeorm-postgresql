import { UserModule } from './../user/user.module';
import { Shop } from './entities/shop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopResolver } from './shop.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Shop]), forwardRef(() => UserModule)],
  providers: [ShopResolver, ShopService],
  exports: [ShopService],
})
export class ShopModule {}
