import { RolesUserEnum } from '@enums';
import { SetMetadata } from '@nestjs/common';
import { META_DATA_ROLES } from '@shared/const';

export const RoleProtected = (...args: RolesUserEnum[]) => {
  return SetMetadata(META_DATA_ROLES, args);
};
