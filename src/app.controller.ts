import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Body, Param, Post } from '@nestjs/common/decorators';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/signup')
  async signUp(
    @Body('username') username: string,
    @Body('fullname') fullname: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    await this.appService.signUp(username, fullname, email, password);
  }

  @Post('/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    await this.appService.logIn(username, password);
  }
  @Post('/newimage')
  async newImage(@Body('username') username: string, @Body('url') url: string) {
    await this.appService.newImage(username, url);
  }
  @Post('deleteimage')
  async deleteImage(
    @Body('username') username: string,
    @Body('url') url: string,
  ) {
    try {
      await this.appService.deleteImage(username, url);
    } catch (e) {
      return e;
    }
  }
}
