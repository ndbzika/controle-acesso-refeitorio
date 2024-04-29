import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AdminsService } from './admins.service';

@Controller()
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @MessagePattern('loginAdmin')
  async login(@Payload() loginAdminDto: { login: string; password: string }) {
    const res = await this.adminsService.login(loginAdminDto);
    if (res.status === 'error') {
      return { message: 'Invalid credentials', errors: res.error };
    }
    return this.adminsService.login(loginAdminDto);
  }
}
