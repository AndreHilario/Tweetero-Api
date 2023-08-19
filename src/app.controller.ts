import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateTweetDto } from './dtos/create-tweet.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post("sign-up")
  @HttpCode(HttpStatus.OK)
  signUp(@Body() body: CreateUserDto): number {
    try {
      return this.appService.singup(body);
    } catch (error) {
      throw new HttpException("All fields are required!", HttpStatus.BAD_REQUEST);
    }

  }

  @Post('tweets')
  @HttpCode(HttpStatus.OK)
  postTweet(@Body() body: CreateTweetDto) {
    try {
      return this.appService.postTweet(body);
    } catch (error) {
      if (error.message === 'User not authorized') {
        throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
      } else if (error.message === 'All fields are required!') {
        throw new HttpException('All fields are required!', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('An error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }


  }
}
