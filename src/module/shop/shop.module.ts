import { Shop } from './entities/shop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopResolver } from './shop.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Shop])],
  providers: [ShopResolver, ShopService],
  exports: [ShopService],
})
export class ShopModule {}
