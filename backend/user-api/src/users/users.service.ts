import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { DateUTCBR } from 'src/utils/DateUTCBR';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    console.log(user);

    if (user) {
      return this.prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          ...createUserDto,
        },
      });
    }
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    const today = new Date().getDay();
    const todayDateBr = DateUTCBR[today];
    return this.prisma.user.findMany({
      select: {
        matricula: true,
        nome: true,
        curso: true,
        turma: true,
      },
      where: {
        diasAlmoco: {
          has: todayDateBr,
        },
      },
    });
  }

  findOne(email: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        email: email,
      },
    });
  }

  update(email: string, updateUserDto: UpdateUserDto) {
    console.log('dando update');

    return this.prisma.user.update({
      where: {
        email: email,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
