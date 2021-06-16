import { UserService } from './user.service';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async getUsers(): Promise<string> {
    return '';
  }
}
