import { SetMetadata } from '@nestjs/common';
import { Role } from '../../common-types/enum/role';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
