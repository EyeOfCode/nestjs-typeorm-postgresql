import { User } from './../user/entities/user.entity';
import { StatusShop } from './../../common-types/enum/status';
import { Shop } from './entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateShopInput } from './dto/create-shop.input';
import { Repository } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) {}

  async create(data: CreateShopInput, user: User): Promise<Shop> {
    const payload = this.shopRepository.create({
      ...data,
      user,
      status: StatusShop.PENDING,
    });
    return this.shopRepository.save(payload);
  }

  async findAll(): Promise<Shop[]> {
    return this.shopRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} shop`;
  // }

  // update(id: number, updateShopInput: UpdateShopInput) {
  //   return `This action updates a #${id} shop`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} shop`;
  // }
}
