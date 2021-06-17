import { UserCreateInput } from './../../dto/user/create-user-input.dto';
import { UserService } from './user.service';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { User } from '../../entity/user/user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Query(() => User)
  async getUser(@Args('id') id: string): Promise<User> {
    return this.userService.getById(id);
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: UserCreateInput): Promise<User> {
    return this.userService.create(data);
  }
}
