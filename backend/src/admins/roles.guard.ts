import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Request } from 'express';

const RoleGuard = (role: Role) => {
  class RolesGuardMixin implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      if (!role) {
        return false;
      }

      const req: Request = context.switchToHttp().getRequest();

      const reqRole = req['admin'].role;

      return role === reqRole;
    }
  }

  return mixin(RolesGuardMixin);
};

export default RoleGuard;
