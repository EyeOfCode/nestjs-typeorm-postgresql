import { LoginInput } from './dto/login-auth.input';
import { AuthResponse } from './response/auth.response';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('data') data: LoginInput): Promise<AuthResponse> {
    return this.authService.login(data);
  }
}
