import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admins`;
  }

  findOne(id: string) {
    return `This action returns a #${id} admin`;
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: string) {
    return `This action removes a #${id} admin`;
  }

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
