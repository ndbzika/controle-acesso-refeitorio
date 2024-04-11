import { Module } from '@nestjs/common';
import { EditaisService } from './editais.service';
import { EditaisController } from './editais.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ADMIN_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3000,
        },
      },
    ]),
  ],
  controllers: [EditaisController],
  providers: [EditaisService],
})
export class EditaisModule {}
