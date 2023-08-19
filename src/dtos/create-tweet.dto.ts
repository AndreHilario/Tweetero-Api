import { IsNotEmpty, IsString } from "class-validator"

export class CreateTweetDto {
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    tweet: string
}