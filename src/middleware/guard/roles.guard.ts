import { ROLES_KEY } from './../decorator/roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../common-types/enum/role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;
    return requiredRoles.some((role) => {
      if (user.roles.includes(Role.ADMIN)) {
        return true;
      }
      return user.roles.includes(role);
    });
  }
}
