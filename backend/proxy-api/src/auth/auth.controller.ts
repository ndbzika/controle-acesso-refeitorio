import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from './utils/Guards';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { message: 'This route will handle Google login' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return { message: 'OK' };
  }

  @Get('google/logout')
  @UseGuards(GoogleAuthGuard)
  handleLogout(@Req() req: Request) {
    req.logout({ keepSessionInfo: false }, () => {});
    return { message: 'OK' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('admin/login')
  async handleAdminLogin(@Body() body: { login: string; password: string }) {
    const user = await this.authService.loginAdmin(body);

    if (user?.errors?.length > 0) {
      throw new UnauthorizedException({
        message: 'Invalid credentials',
        errors: user.errors,
      });
    }

    return { ...user, error: null };
  }
}
