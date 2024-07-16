import {
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AdminsGuard } from 'src/auth/auth.guard';
import { PresencasService } from './presencas.service';

@Controller('presencas')
export class PresencasController {
  constructor(private readonly presencasService: PresencasService) {}

  @UseGuards(AdminsGuard)
  @Get()
  findAllPresences() {
    let presences = null;

    try {
      this.presencasService.findAllToday().then((data) => {
        presences = data;
      });
    } catch (error) {
      console.log(error);
    }

    return presences;
  }

  @UseGuards(AdminsGuard)
  @Get(':email')
  findAll(@Param('email') email: string) {
    return this.presencasService.findAll(email);
  }

  @UseGuards(AdminsGuard)
  @Patch(':email/confirm')
  @HttpCode(204)
  confirmPresence(@Param('email') email: string) {
    return this.presencasService.confirmPresence(email);
  }
}
