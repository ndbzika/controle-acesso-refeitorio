import { diasAlmoco } from '@prisma/client';

export class CreatePresencaDto {
  alunoId: string;
  alunoEmail: string;
  diasAlmoco: diasAlmoco[];
}
