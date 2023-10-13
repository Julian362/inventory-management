import { RolesUserEnum } from '@enums';
import { RoleProtected } from '@infrastructure-command/utils/decorators/role.decorator';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRolGuard } from '../guard/user-role.guard';

export function Auth(...roles: RolesUserEnum[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRolGuard),
  );
}
