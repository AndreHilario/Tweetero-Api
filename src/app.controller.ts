import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateTweetDto } from './dtos/create-tweet.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('')
  @HttpCode(HttpStatus.OK)
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  signUp(@Body() body: CreateUserDto): number {
    try {
      return this.appService.singup(body);
    } catch (error) {
      throw new HttpException('All fields are required!', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('tweets')
  postTweet(@Body() body: CreateTweetDto) {
    try {
      return this.appService.postTweet(body);
    } catch (error) {
      if (error.message === 'User not authorized') {
        throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
      } else {
        throw new HttpException('All fields are required!', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
