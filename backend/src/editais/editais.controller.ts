import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from '@prisma/client';
import { diskStorage } from 'multer';
import RolesGuard from 'src/admins/roles.guard';
import { AdminsGuard } from 'src/auth/auth.guard';
import { EditaisService } from './editais.service';

@Controller('editais')
export class EditaisController {
  constructor(private readonly editaisService: EditaisService) {}

  @UseGuards(RolesGuard(Role.CAEST))
  @UseGuards(AdminsGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('edital', {
      storage: diskStorage({
        destination: '/tmp',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(csv)$/)) {
          return callback(
            new BadRequestException('Only PDF and DOCX files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  @HttpCode(200)
  uploadEdital(@UploadedFile() edital: Express.Multer.File) {
    return this.editaisService.uploadEdital(edital);
  }
}
