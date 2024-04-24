import { Controller, UseGuards } from '@nestjs/common';
import { PresencesService } from './presences.service';
import { MessagePattern } from '@nestjs/microservices';
import RoleGuard from 'src/admins/roles.guard';
import { Role } from '@prisma/client';

@Controller()
export class PresencesController {
  constructor(private readonly presencesService: PresencesService) {}

  @UseGuards(RoleGuard(Role.COZINHA))
  @MessagePattern('confirmPresence')
  confirmPresence(data: { alunoEmail: string }) {
    return {
      ...this.presencesService.confirmPresence(data.alunoEmail),
      error: false,
    };
  }
}
