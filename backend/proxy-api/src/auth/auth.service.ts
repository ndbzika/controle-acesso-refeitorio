import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDetails } from 'src/utils/types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async validadeUser(details: UserDetails) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: details.email,
      },
    });

    if (user) {
      await this.prisma.user.update({
        where: {
          email: details.email,
        },
        data: {
          displayName: details.displayName,
          picture: details.picture,
        },
      });
      this.createUser(user.id, details);

      return user;
    }

    const createdLogin = await this.prisma.user.create({
      data: details,
    });

    await this.createUser(createdLogin.id, details);

    return user;
  }

  async findUser(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async createUser(id: string, details: UserDetails) {
    return this.userClient.emit('createUser', {
      id,
      email: details.email,
      nome: details.displayName,
      foto: details.picture,
    });
  }
}
