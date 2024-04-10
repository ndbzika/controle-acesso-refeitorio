import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDetails } from 'src/utils/types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('ADMIN_SERVICE') private readonly adminClient: ClientProxy,
    private jwtService: JwtService,
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

  createUser(id: string, details: UserDetails) {
    return this.userClient.emit('createUser', {
      id,
      email: details.email,
      nome: details.displayName,
      foto: details.picture,
    });
  }

  async loginAdmin({ login, password }: { login: string; password: string }) {
    const adminExists = await this.prisma.admin.findUnique({
      where: {
        login,
      },
    });
    if (!adminExists) {
      return null;
    }
    const resObs = this.adminClient.send('loginAdmin', {
      login,
      password,
    });

    const res = await firstValueFrom(resObs);

    if (res.errors?.length > 0) {
      return {
        errors: res.errors,
      };
    }

    return {
      token: await this.jwtService.signAsync(res.data),
    };
  }
}
