import { UserService } from './../user/user.service';
import { AuthResponse } from './response/auth.response';
import { Inject, Injectable } from '@nestjs/common';
import { LoginInput } from './dto/login-auth.input';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

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
      iss: this.config.get('auth.jwtSecret'),
      sub: id,
      role,
    });
  }

  async login(data: LoginInput): Promise<AuthResponse> {
    const user = await this.userService.getEmail(data.email);
    if (!user) {
      throw new Error('email not found');
    }

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    if (!isPasswordMatch) {
      throw new Error('password not math');
    }

    const accessToken = this.generateToken(user.id, user.roles);
    return { token: accessToken };
  }

  async validateToken(data: any): Promise<boolean> {
    return true;
  }
}
