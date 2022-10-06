import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppModel } from './app.model';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

@Injectable()
export class AppService {
  constructor(@InjectModel('App') private readonly appModel: Model<AppModel>) {}

  async getHello() {
    return 'Hello';
  }

  async signUp(
    username: string,
    fullname: string,
    email: string,
    password: string,
  ) {
    const newUser = new this.appModel({
      username,
      fullname,
      email,
      password,
      images: [],
    });

    //esa object leke aao jahan username and email yeh houn.
    //agar username match ho bhi gaya aur email match nahi hua tab bhi add krdega

    const dbObj = await this.appModel.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (dbObj) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'the username or email you entered already exists.',
        },
        HttpStatus.CONFLICT,
      );
    } else {
      const result = await newUser.save();
      throw new HttpException(
        {
          status: HttpStatus.ACCEPTED,
          message: 'User Added',
        },
        HttpStatus.ACCEPTED,
      );
    }
  }

  async logIn(username: string, password: string) {
    const userobj = await this.appModel.findOne({ username: username });
    if (!userobj) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'username or password is incorrect',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    if (userobj.password === password) {
      throw new HttpException(
        {
          user: {
            username: userobj.username,
            fullname: userobj.fullname,
            imagelist: userobj.images,
          },
          status: HttpStatus.ACCEPTED,
          message: 'user found',
        },
        HttpStatus.ACCEPTED,
      );
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        message: 'username or password is incorrect',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async newImage(username: string, url: string) {
    const reqObj = await this.appModel.find({ username }, { images: 1 });

    const newImages = [...reqObj[0].images, url];
    const updated = await this.appModel.findOneAndUpdate(
      { username },
      { images: newImages },
    );
  }

  async deleteImage(username: string, url: string) {
    const reqObj = await this.appModel.find({ username }, { images: 1 });
    const newList = reqObj[0].images.filter((x) => url !== x);
    const updated = await this.appModel.findOneAndUpdate(
      { username },
      { images: newList },
    );
  }
}
