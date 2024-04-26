import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AdminsModule } from './admins/admins.module';
import { EditaisModule } from './editais/editais.module';
import { MulterModule } from '@nestjs/platform-express';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PresencesModule } from './presences/presences.module';
import { RelatoriosModule } from './relatorios/relatorios.module';

@Module({
  imports: [
    PrismaModule,
    AdminsModule,
    EditaisModule,
    MulterModule.register({
      dest: '/tmp/editais',
    }),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3002,
        },
      },
    ]),
    PresencesModule,
    RelatoriosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
