import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth.module';
import { AttemptsModule } from './modules/attempts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://adi:LqZ1TJxfjSebxCFN@cluster0.qt0gywj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    AuthModule,
    AttemptsModule
  ]
})
export class AppModule {}
