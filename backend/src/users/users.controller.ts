import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AdminsGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

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

    if (user) {
      let userObj = null;
      try {
        userObj = await this.usersService.findOne(user.email);
      } catch (error) {
        return { user: null, error: error.message };
      }

      return { user: { ...userObj }, error: null };
    }

    return { user: null, error: 'User not found' };
  }

  @UseGuards(AdminsGuard)
  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AdminsGuard)
  @Get(':email')
  findOne(@Req() req: Request) {
    return this.usersService.findOne(req.params.email);
  }

  @UseGuards(AdminsGuard)
  @Patch()
  update(@Req() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.email, updateUserDto);
  }
}
