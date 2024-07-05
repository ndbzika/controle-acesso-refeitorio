import { Injectable } from '@nestjs/common';
import { diasAlmoco } from '@prisma/client';
import * as Excel from 'exceljs';
import { PresencasService } from 'src/presencas/presencas.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EditaisService {
  constructor(
    private readonly prisma: PrismaService,
    private presencaService: PresencasService,
  ) {}

  uploadEdital(file: Express.Multer.File) {
    return this.handleLoadEdital(file);
  }

  private async handleLoadEdital(edital: Express.Multer.File) {
    const workbook = new Excel.Workbook();

    const worksheet = await workbook.csv.readFile(edital.path);
    worksheet.eachRow(async (row, rowNumber) => {
      if (rowNumber === 1) return;
      const [, email, matricula, curso, turma, diasAlmocoC] =
        row.values as Excel.CellValue[];
      const haveAccount = await this.prisma.user.findFirst({
        where: {
          email: email.toString(),
        },
      });

      const diasAlmocoArray = diasAlmocoC.toString().split(',');
      const diasAlmocoEn: diasAlmoco[] = diasAlmocoArray.map((dia) => {
        return diasAlmoco[dia as keyof typeof diasAlmoco];
      });

      if (haveAccount) {
        await this.prisma.user.update({
          where: {
            email: email.toString(),
          },
          data: {
            matricula: matricula.toString(),
            curso: curso.toString(),
            turma: turma.toString(),
            diasAlmoco: diasAlmocoEn,
          },
        });

        return {
          message: 'Usuário atualizado com sucesso',
          error: false,
        };
      } else {
        const user = await this.prisma.user.create({
          data: {
            email: email.toString(),
            matricula: matricula.toString(),
            curso: curso.toString(),
            turma: turma.toString(),
            diasAlmoco: diasAlmocoEn,
          },
        });

        await this.presencaService.create({
          alunoEmail: email.toString(),
          alunoId: user.id,
          diasAlmoco: diasAlmocoEn,
        });

        return {
          message: 'Usuário cadastrado com sucesso',
          user,
          error: false,
        };
      }
    });
  }
}
