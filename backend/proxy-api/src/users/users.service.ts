import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
// import { CreateUserEvent } from './create-user.event';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  create(createUserDto: CreateUserDto) {
    const res = this.userClient.emit('createUser', createUserDto);
    return res;
  }

  findOne(email: string) {
    const user = this.userClient.send('findUser', email);
    return user;
  }

  findAll() {
    return this.userClient.send('findAllUsers', '');
  }
}
