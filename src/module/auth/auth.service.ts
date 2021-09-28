import { User } from './../user/entities/user.entity';
import { UserService } from './../user/user.service';
import { AuthResponse } from './response/auth.response';
import { Inject, Injectable } from '@nestjs/common';
import { LoginInput } from './dto/login-auth.input';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Hash } from '../../helper/auth';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,

    private readonly jwtService: JwtService,

    private config: ConfigService,
  ) {}

  generateToken(id: string, role: string[]): string {
    return this.jwtService.sign({
      iss: this.config.get('app.JWT_SECRET_KEY'),
      sub: id,
      role,
    });
  }

  async login(data: LoginInput): Promise<AuthResponse> {
    const user = await this.userService.getByEmail(data.email);
    if (!user) {
      throw new Error('email not found');
    }

    const isPasswordMatch = await Hash.verifyPassword(
      data.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new Error('password not math');
    }

    const accessToken = this.generateToken(user.id, user.roles);
    return { token: accessToken };
  }

  async validateToken(id: string): Promise<User> {
    return this.userService.getById(id);
  }
}
