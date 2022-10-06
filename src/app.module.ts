import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AppSchema } from './app.model';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://aleeizhere:tezgram123@cluster0.efh6kja.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: 'App', schema: AppSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
