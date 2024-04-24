import { Module } from '@nestjs/common';
import { PresencesService } from './presences.service';
import { PresencesController } from './presences.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRESENCE_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3003,
        },
      },
    ]),
  ],
  controllers: [PresencesController],
  providers: [PresencesService],
})
export class PresencesModule {}
