import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PresencasModule } from 'src/presencas/presencas.module';
import { PresencasService } from 'src/presencas/presencas.service';
import { EditaisController } from './editais.controller';
import { EditaisService } from './editais.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    PresencasModule,
  ],
  controllers: [EditaisController],
  providers: [EditaisService, PresencasService],
})
export class EditaisModule {}
