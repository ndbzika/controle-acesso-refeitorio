import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { Role } from '@prisma/client';

const RoleGuard = (role: Role) => {
  class RolesGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      if (!role) {
        return false;
      }
      const reqRole = context.switchToHttp().getRequest().req.role;
      return role === reqRole;
    }
  }
  return mixin(RolesGuardMixin);
};

export default RoleGuard;
