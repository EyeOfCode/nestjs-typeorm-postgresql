import { UserUpdateInput } from './dto/update-user-input-dto';
import { UserCreateInput } from './dto/create-user-input.dto';
import { UserService } from './user.service';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { Roles } from '../../middleware/decorator/roles.decorator';
import { RolesGuard } from '../../middleware/guard/roles.guard';
import { JwtGuard } from '../../middleware/guard/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { Role } from '../../common-types/enum/role';
import { I18nService, I18nLang } from 'nestjs-i18n';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly i18n: I18nService,
  ) {}

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Query(() => [User])
  async getI18n(@I18nLang() lang: string): Promise<User[]> {
    return this.i18n.t('message.profile', { lang: lang, args: { id: 'test' } });
  }

  @UseGuards(new JwtGuard(), RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Query(() => User)
  async getUser(@Args('id') id: string): Promise<User> {
    return this.userService.getById(id);
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: UserCreateInput): Promise<User> {
    return this.userService.create(data);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('data') data: UserUpdateInput,
  ): Promise<User | null> {
    const res = await this.userService.update(id, data);
    if (res) {
      return this.userService.getById(id);
    } else {
      return null;
    }
  }
}
