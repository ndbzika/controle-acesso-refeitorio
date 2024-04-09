type DiasRefeicao = {
  segunda: boolean;
  terca: boolean;
  quarta: boolean;
  quinta: boolean;
  sexta: boolean;
  sabado: boolean;
  domingo: boolean;
};

export class CreateUserDto {
  email: string;
  nome: string;
  matricula: string;
  foto: string;
  curso: string;
  turma: string;
  diasRefeicao: DiasRefeicao;
}
