import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { AdminsGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('me')
  async findUser(@Req() req: Request & { user: { email: string } }) {
    const { user } = req;
    console.log(user);

    if (user) {
      const userObs = this.usersService.findOne(user.email);
      const userRes = await firstValueFrom(userObs);
      console.log(userObs, userRes);

      return { user: { ...userRes }, error: null };
    }
    return { user: null, error: 'User not found' };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AdminsGuard)
  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }
}
