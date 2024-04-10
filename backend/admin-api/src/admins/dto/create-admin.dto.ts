import { Role } from '@prisma/client';

export class CreateAdminDto {
  login: string;
  password: string;
  role: Role;
}
