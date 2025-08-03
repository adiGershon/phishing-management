import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attempt, AttemptDocument } from '../../schemas/attempt.schema';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AttemptsService {
  constructor(
    @InjectModel(Attempt.name) private readonly attemptModel: Model<AttemptDocument>,
    private readonly httpService: HttpService
  ) {}

  async getAll() {
    return this.attemptModel.find().sort({ createdAt: -1 }).exec();
  }

  async sendAttempt(email: string) {
    const response = await this.httpService.axiosRef.post(
      'http://localhost:3001/phishing/send',
      { email }
    );
    return response.data;
  }
}
