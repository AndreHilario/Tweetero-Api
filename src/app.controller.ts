import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { Tweet } from './entities/tweet.entity';

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
  signUp(@Body() body: CreateUserDto): number | string {
    return this.appService.singup(body);
  }

  @Post('tweets')
  postTweet(@Body() body: CreateTweetDto) {
    try {
      return this.appService.postTweet(body);
    } catch (error) {
      if (error.message === 'User not authorized') {
        throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
      }
    }
  }

  @Get('tweets')
  @HttpCode(HttpStatus.OK)
  getLastFifteenTweets(@Query('page') page?: number): Tweet[] {
    try {
      return this.appService.getLastTweets(page);
    } catch (error) {
      if (error.message === "Informe uma página válida!") {
        throw new HttpException('Informe uma página válida!', HttpStatus.BAD_REQUEST);
      }
    }

  }

  @Get('tweets/:username')
  @HttpCode(HttpStatus.OK)
  getTweetsByUsername(@Param('username') username: string) {
    return this.appService.getTweetsByUsername(username);
  }
}
