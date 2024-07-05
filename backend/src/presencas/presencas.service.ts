import { Injectable } from '@nestjs/common';
import moment from 'moment';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePresencaDto } from './dto/create-presenca.dto';

@Injectable()
export class PresencasService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllToday() {
    const today = moment().format('YYYY-MM-DDT00:00:00.000+00:00');
    return await this.prisma.presenca.findMany({
      where: {
        data: today,
      },
    });
  }

  async create(data: CreatePresencaDto) {
    for (const dia of data.diasAlmoco) {
      const dates = this.generateDatesForNextSixMonths(dia);

      for (const date of dates) {
        await this.prisma.presenca.create({
          data: {
            alunoEmail: data.alunoEmail,
            alunoId: data.alunoId,
            data: date,
          },
        });
      }
    }
  }

  private generateDatesForNextSixMonths(weekDay: string): Date[] {
    const dates = [];
    const weekDays = {
      SEGUNDA: 1,
      TERCA: 2,
      QUARTA: 3,
      QUINTA: 4,
      SEXTA: 5,
    };
    const date = moment().day(weekDays[weekDay]);

    // Se a data calculada for antes do dia atual, move para a próxima semana
    if (date.isBefore(moment(), 'day')) {
      date.add(1, 'weeks');
    }

    const endDate = moment().add(6, 'months');
    while (date.isBefore(endDate)) {
      if (!this.isHoliday(date)) {
        dates.push(new Date(date.format('YYYY-MM-DD')));
      }
      date.add(1, 'weeks'); // Próxima ocorrência semanal
    }
    return dates;
  }

  private isHoliday(date: moment.Moment): boolean {
    const itIsHolday = false;
    // this.holidaysService
    //   .isHoliday(date.toDate())
    //   .then((isHoliday) => {
    //     itIsHolday = isHoliday;
    //   })
    //   .catch(() => {
    //     itIsHolday = false;
    //   });

    return itIsHolday;
  }

  async findAll(alunoEmail: string) {
    return await this.prisma.presenca.findMany({
      where: {
        alunoEmail,
      },
    });
  }

  async confirmPresence(alunoEmail: string) {
    const today = new Date(moment().format('YYYY-MM-DD'));

    return await this.prisma.presenca.updateMany({
      where: {
        alunoEmail,
        data: {
          equals: today,
        },
      },
      data: {
        isPresente: true,
      },
    });
  }
}
