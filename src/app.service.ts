import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class AppService {

  private users: User[];
  
  constructor() {
    this.users = [];
  }

  singup(body: CreateUserDto) {
    const { username, avatar } = body;
    return this.users.push(new User(username, avatar));
  }
}
