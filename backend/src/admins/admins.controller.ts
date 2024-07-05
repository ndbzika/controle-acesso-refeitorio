import { Controller, Post, Req } from '@nestjs/common';
import { AdminsService } from './admins.service';

@Controller('admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post('login')
  async login(@Req() loginAdminDto: { login: string; password: string }) {
    const res = await this.adminsService.login(loginAdminDto);
    if (res.status === 'error') {
      return { message: 'Invalid credentials', errors: res.error };
    }
    return this.adminsService.login(loginAdminDto);
  }
}
