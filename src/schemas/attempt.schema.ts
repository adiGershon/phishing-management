import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AttemptDocument = Attempt & Document;

@Schema({ timestamps: true })
export class Attempt {
  @Prop({ required: true })
  email: string;

  @Prop({ default: 'sent' })
  status: string;

  @Prop()
  content: string;
}

export const AttemptSchema = SchemaFactory.createForClass(Attempt);