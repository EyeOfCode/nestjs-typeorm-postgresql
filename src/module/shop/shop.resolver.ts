import { UserService } from './../user/user.service';
import { Roles } from './../../middleware/decorator/roles.decorator';
import { Role } from './../../common-types/enum/role';
import { RolesGuard } from './../../middleware/guard/roles.guard';
import { JwtGuard } from './../../middleware/guard/jwt.guard';
import { Inject, UseGuards, forwardRef } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShopService } from './shop.service';
import { Shop } from './entities/shop.entity';
import { CreateShopInput } from './dto/create-shop.input';
import { UpdateShopInput } from './dto/update-shop.input';

@Resolver(() => Shop)
export class ShopResolver {
  constructor(
    private readonly shopService: ShopService,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  @UseGuards(new JwtGuard(), RolesGuard)
  @Roles(Role.USER)
  @Mutation(() => Shop)
  async createShop(
    @Args('id') userId: string,
    @Args('data') createShopInput: CreateShopInput,
  ): Promise<Shop> {
    const user = await this.userService.getById(userId);
    return this.shopService.create(createShopInput, user);
  }

  @Query(() => [Shop], { name: 'shop' })
  async findAll(): Promise<Shop[]> {
    return this.shopService.findAll();
  }

  // @Query(() => Shop, { name: 'shop' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.shopService.findOne(id);
  // }

  // @Mutation(() => Shop)
  // updateShop(@Args('updateShopInput') updateShopInput: UpdateShopInput) {
  //   return this.shopService.update(updateShopInput.id, updateShopInput);
  // }

  // @Mutation(() => Shop)
  // removeShop(@Args('id', { type: () => Int }) id: number) {
  //   return this.shopService.remove(id);
  // }
}
