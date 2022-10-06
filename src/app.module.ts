import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AppSchema } from './app.model';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_LINK),
    MongooseModule.forFeature([{ name: 'App', schema: AppSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
