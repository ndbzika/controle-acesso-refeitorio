// export const diasAlmoco: {
//   SEGUNDA: 'SEGUNDA';
//   TERCA: 'TERCA';
//   QUARTA: 'QUARTA';
//   QUINTA: 'QUINTA';
//   SEXTA: 'SEXTA';
//   SABADO: 'SABADO';
//   DOMINGO: 'DOMINGO';
// };

// export type diasAlmoco = (typeof diasAlmoco)[keyof typeof diasAlmoco];

export class CreateUserDto {
  email: string;
  nome: string;
  matricula: string;
  foto: string;
  curso: string;
  turma: string;
  //diasAlmoco: diasAlmoco[];
}
