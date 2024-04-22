import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EditaisService } from './editais.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AdminsGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('editais')
export class EditaisController {
  constructor(private readonly editaisService: EditaisService) {}

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
  uploadEdital(
    @UploadedFile() edital: Express.Multer.File,
    @Req() req: Request,
  ) {
    return this.editaisService.uploadEdital(edital, req);
  }
}
