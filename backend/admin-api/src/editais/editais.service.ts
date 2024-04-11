import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { diasAlmoco } from '@prisma/client';
import * as Excel from 'exceljs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EditaisService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private readonly prisma: PrismaService,
  ) {}
  async handleLoadEdital(edital: Express.Multer.File) {
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
      if (haveAccount) {
        return { message: 'Usuário já cadastrado', error: true };
      }
      const diasAlmocoArray = diasAlmocoC.toString().split(',');
      const diasAlmocoEn = diasAlmocoArray.map((dia) => {
        return diasAlmoco[dia as keyof typeof diasAlmoco];
      });

      const user = await this.prisma.user.create({
        data: {
          email: email.toString(),
          matricula: matricula.toString(),
          curso: curso.toString(),
          turma: turma.toString(),
          diasAlmoco: diasAlmocoEn,
        },
      });
      this.userClient.emit('createUser', user);
      return { message: 'Usuário cadastrado com sucesso', user, error: false };
    });
  }
}
