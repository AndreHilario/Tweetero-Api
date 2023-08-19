import { BadRequestException, Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { GetTweetsDto } from './dtos/get-tweets.dto';
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
  signUp(@Body() body: CreateUserDto): number {
    try {
      return this.appService.singup(body);
    } catch (error) {
      throw new BadRequestException('All fields are required!', { cause: new Error(), description: 'Some error description' })
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

  @Get('tweets')
  @HttpCode(HttpStatus.OK)
  getLastFifteenTweets(@Query() query: GetTweetsDto): Tweet[] {
    return this.appService.getLastFifteenTweets(query.page);
  }

  @Get('tweets/:username')
  @HttpCode(HttpStatus.OK)
  getTweetsByUsername(@Param('username') username: string) {
    return this.appService.getTweetsByUsername(username);
  }
}
