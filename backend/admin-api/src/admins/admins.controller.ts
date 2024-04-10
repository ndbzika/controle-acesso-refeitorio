import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

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

  @MessagePattern('createAdmin')
  create(@Payload() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @MessagePattern('findOneAdmin')
  findOne(@Payload() id: string) {
    return this.adminsService.findOne(id);
  }

  @MessagePattern('updateAdmin')
  update(@Payload() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(updateAdminDto.id, updateAdminDto);
  }
}
