import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { Tweet } from './entities/tweet.entity';
import { CreateTweetDto } from './dtos/create-tweet.dto';

@Injectable()
export class AppService {

  private users: User[];
  private tweets: Tweet[];

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  singup(body: CreateUserDto) {
    const { username, avatar } = body;
    return this.users.push(new User(username, avatar));
  }

  postTweet(body: CreateTweetDto) {
    const { username, tweet } = body;
    const userFromServer = this.users.find((u) => u.username === username);

    if (userFromServer) {
      const tweetObject = {
        username: userFromServer.username,
        tweet: tweet,
      };
      this.tweets.push(tweetObject); 

      return this.tweets;
    } else {
      throw new HttpException('User not authorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
