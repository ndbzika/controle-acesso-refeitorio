import { Controller, UseGuards } from '@nestjs/common';
import { EditaisService } from './editais.service';
import { MessagePattern } from '@nestjs/microservices';
import RolesGuard from 'src/admins/roles.guard';
import { Role } from '@prisma/client';

@Controller()
export class EditaisController {
  constructor(private readonly editaisService: EditaisService) {}

  @UseGuards(RolesGuard(Role.CAEST))
  @MessagePattern('uploadEdital')
  uploadEdital({ edital }: { edital: Express.Multer.File; req: Request }) {
    return this.editaisService.handleLoadEdital(edital);
  }
}
