import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HttpModule } from '@nestjs/axios';
import { Attempt, AttemptSchema } from '../schemas/attempt.schema';
import { AttemptsController } from '../controllers/attempts/attempts.controller';
import { AttemptsService } from '../services/attempts/attempts.service';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Attempt.name, schema: AttemptSchema }]),
    HttpModule
  ],
  controllers: [AttemptsController],
  providers: [AttemptsService, JwtStrategy]
})
export class AttemptsModule {}