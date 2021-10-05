import { User } from './../../module/user/entities/user.entity';
import { AuthService } from './../../module/auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('app.JWT_SECRET_KEY'),
    });
  }

  async validate(payload: any): Promise<User> {
    try {
      const isAuthorized = await this.authService.validateToken(payload.sub);
      return isAuthorized;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
