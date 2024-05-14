import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
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

    if (user) {
      const userObs = this.usersService.findOne(user.email);
      const userRes = await firstValueFrom(userObs);

      return { user: { ...userRes }, error: null };
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
}
