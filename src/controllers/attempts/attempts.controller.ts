import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AttemptsService } from '../../services/attempts/attempts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('attempts')
@UseGuards(AuthGuard('jwt'))
export class AttemptsController {
  constructor(private readonly attemptsService: AttemptsService) {
  }

  @Get()
  getAllAttempts() {
    return this.attemptsService.getAll();
  }

  @Post('send')
  sendPhishing(@Body('email') email: string) {
    return this.attemptsService.sendAttempt(email);
  }
}