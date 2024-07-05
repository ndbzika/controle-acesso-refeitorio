import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from 'src/admins/admins.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { UserDetails } from 'src/utils/types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UsersService,
    private adminService: AdminsService,
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
    return this.userService.create({
      email: details.email,
      displayName: details.displayName,
      picture: details.picture,
    });
  }

  private updateUser(details: UserDetails) {
    return this.userService.update(details.email, {
      email: details.email,
      displayName: details.displayName,
      picture: details.picture,
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
    const res = await this.adminService.login({
      login,
      password,
    });

    if (res.error?.length > 0) {
      return {
        errors: res.error,
      };
    }

    return {
      token: await this.jwtService.signAsync(res.data),
    };
  }
}
