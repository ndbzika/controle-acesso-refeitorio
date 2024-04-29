import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) {}

  async login(loginAdminDto: { login: string; password: string }) {
    const admin = await this.prisma.admin.findUnique({
      where: {
        login: loginAdminDto.login,
      },
    });

    if (!admin) {
      return {
        error: ['Admin not found'],
        status: 'error',
      };
    }

    const passwordMatch = await bcrypt.compare(
      loginAdminDto.password,
      admin.password,
    );

    if (!passwordMatch) {
      return {
        error: ['Invalid password'],
        status: 'error',
      };
    }

    const { password: _, ...adminWithoutPassword } = admin;

    return {
      status: 'success',
      data: adminWithoutPassword,
    };
  }
}
