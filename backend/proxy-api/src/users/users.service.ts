import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  findOne(id: string) {
    const user = this.userClient.send('findUser', id);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
