import { BadRequestException, Injectable } from '@nestjs/common';
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

  getHealth(): string {
    return "I'm okay!";
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
        avatar: userFromServer.avatar,
        tweet: tweet,
      };
      this.tweets.push(tweetObject);

      return this.tweets;
    } else {
      throw new Error('User not authorized');
    }
  }

  getLastTweets(page?: number): Tweet[] {

    if (page !== undefined && (isNaN(page) || page < 1)) {
      throw new Error('Informe uma página válida!');
    } 
    const tweetsPerPage = 15;
    const totalTweets = this.tweets.length;

    const firstTweetIndex = (page ? page - 1 : 0) * tweetsPerPage;
    const lastTweetIndex = Math.min(firstTweetIndex + tweetsPerPage - 1, totalTweets - 1);

    return this.tweets.slice(firstTweetIndex, lastTweetIndex + 1);
  }


  getTweetsByUsername(username: string): Tweet[] {
    const userTweets = this.tweets.filter((name) => name.username === username);
    return userTweets;
  }
}


