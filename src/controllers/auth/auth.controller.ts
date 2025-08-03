import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../services/auths/auth.service';
import { AuthResponse } from '../../types/auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body('email') email: string, @Body('password') password: string): Promise<AuthResponse> {
    return this.authService.register(email, password);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string): Promise<{ access_token: string }> {
    return this.authService.login(email, password);
  }
}