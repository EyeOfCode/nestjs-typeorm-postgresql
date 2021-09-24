import { AuthService } from './../../module/auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('auth.JWT_SECRET_KEY'),
    });
  }

  async validate(payload: any): Promise<any> {
    console.log('=>', payload);
    const isAuthorized = this.authService.validateToken(payload);
    if (!isAuthorized) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
