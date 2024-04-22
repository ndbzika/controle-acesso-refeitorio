import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { diasAlmoco } from '@prisma/client';
import * as Excel from 'exceljs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EditaisService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('PRESENCA_SERVICE') private readonly presencaClient: ClientProxy,
    private readonly prisma: PrismaService,
  ) {}
  async handleLoadEdital(edital: Express.Multer.File) {
    console.log('handleLoadEdital');

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
      const diasAlmocoEn = diasAlmocoArray.map((dia) => {
        return diasAlmoco[dia as keyof typeof diasAlmoco];
      });

      if (haveAccount) {
        console.log('update');

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

        const updateUser = this.userClient.send('updateUser', {
          email: email.toString(),
          matricula: matricula.toString(),
          curso: curso.toString(),
          turma: turma.toString(),
          diasAlmoco: diasAlmocoEn,
        });

        return {
          message: 'Usuário atualizado com sucesso',
          user: updateUser,
          error: false,
        };
      } else {
        console.log('create');

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
        this.presencaClient.emit('createPresenca', {
          alunoId: user.id,
          alunoEmail: user.email,
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
