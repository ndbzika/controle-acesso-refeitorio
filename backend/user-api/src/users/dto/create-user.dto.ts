// import { diasAlmoco } from '@prisma/client';

export class CreateUserDto {
  id: string;
  email: string;
  nome?: string;
  matricula?: string;
  foto?: string;
  curso?: string;
  turma?: string;
  //diasAlmoco: diasAlmoco[];
}
