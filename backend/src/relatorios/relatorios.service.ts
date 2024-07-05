import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RelatoriosService {
  constructor(private readonly prisma: PrismaService) {}

  async createRelatorio(data: { dataInicio: string; dataFim: string }) {
    const quantidadeAlunosConfirmados = await this.prisma.presenca.groupBy({
      by: ['alunoEmail'],
      where: {
        isConfirmed: true,
        data: {
          gte: new Date(data.dataInicio),
          lte: new Date(data.dataFim),
        },
      },
    });
    const quantidadeAlunosNaoConfirmados = await this.prisma.presenca.groupBy({
      by: ['alunoEmail'],
      where: {
        isConfirmed: false,
        data: {
          gte: new Date(data.dataInicio),
          lte: new Date(data.dataFim),
        },
      },
    });
    const quantidadeTotalAlunos =
      quantidadeAlunosConfirmados.length +
      quantidadeAlunosNaoConfirmados.length;
    const quatidadeAlunosPresentes = await this.prisma.presenca.count({
      where: {
        isPresente: true,
        data: {
          gte: new Date(data.dataInicio),
          lte: new Date(data.dataFim),
        },
      },
    });
    return {
      quantidadeAlunosConfirmados,
      quantidadeAlunosNaoConfirmados,
      quantidadeTotalAlunos,
      quatidadeAlunosPresentes,
    };
  }
}
