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
      this.updateUser(details);

      return user;
    }

    const createdUser = await this.prisma.user.create({
      data: details,
    });
    this.createUser(details);

    return createdUser;
  }

  async findUser(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  private createUser(details: UserDetails) {
    return this.userClient.emit('createUser', {
      email: details.email,
      nome: details.displayName,
      foto: details.picture,
    });
  }

  private updateUser(details: UserDetails) {
    return this.userClient.emit('updateUser', {
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
