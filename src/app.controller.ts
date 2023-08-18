import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("sign-up")
  @HttpCode(200)
  signUp(@Body() body: CreateUserDto): number {
    return this.appService.singup(body)
  }
}
