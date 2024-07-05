import { diasAlmoco } from '@prisma/client';
export class CreateUserDto {
  email: string;
  displayName?: string;
  matricula?: string;
  picture?: string;
  curso?: string;
  turma?: string;
  diasAlmoco?: diasAlmoco[];
}
