import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../../schemas/user.schema';
import { AuthResponse } from '../../types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
  ) {}

  async register(email: string, password: string): Promise<AuthResponse> {
    const existing = await this.userModel.findOne({ email });
    if (existing) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, password: hashedPassword });
    await user.save();
    return { success: true };
  }

  async login(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email, sub: user._id };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}